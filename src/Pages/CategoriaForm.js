import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CategoriaForm = () => {
    const [categorias, setCategorias] = useState([]);
    const [nombreCategoria, setNombreCategoria] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [categoriaID, setCategoriaID] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');

    // Fetch categorias
    const fetchCategorias = async () => {
        try {
            const response = await axios.get('https://backend-proyecto-production-13fc.up.railway.app/api/categorias');
            setCategorias(response.data);
        } catch (error) {
            console.error('Error obteniendo las categorías:', error);
        }
    };

    useEffect(() => {
        fetchCategorias();
    }, []);

    // Insertar categoria
    const insertarCategoria = async () => {
        try {
            await axios.post('https://backend-proyecto-production-13fc.up.railway.app/api/categorias', {
                Nombre_Categoria: nombreCategoria,
                Descripcion: descripcion
            });
            resetForm();
            setSuccessMessage('Categoría agregada exitosamente');
            fetchCategorias();
        } catch (error) {
            console.error('Error insertando la categoría:', error);
        }
    };

    // Actualizar categoria
    const actualizarCategoria = async () => {
        try {
            await axios.put(`https://backend-proyecto-production-13fc.up.railway.app/api/categorias/${categoriaID}`, {
                Nombre_Categoria: nombreCategoria,
                Descripcion: descripcion
            });
            resetForm();
            setSuccessMessage('Categoría actualizada exitosamente');
            fetchCategorias();
        } catch (error) {
            console.error('Error actualizando la categoría:', error);
        }
    };

    // Eliminar categoria con confirmación
    const eliminarCategoria = async (id) => {
        if (window.confirm('¿Estás seguro de que deseas eliminar esta categoría?')) {
            try {
                await axios.delete(`https://backend-proyecto-production-13fc.up.railway.app/api/categorias/${id}`);
                setSuccessMessage('Categoría eliminada exitosamente');
                fetchCategorias();
            } catch (error) {
                console.error('Error eliminando la categoría:', error);
            }
        }
    };

    // Reset form
    const resetForm = () => {
        setNombreCategoria('');
        setDescripcion('');
        setCategoriaID(null);
    };

    // Manejar el submit del formulario
    const handleSubmit = (e) => {
        e.preventDefault();
        if (categoriaID) {
            actualizarCategoria();
        } else {
            insertarCategoria();
        }
    };

    // Manejar la selección de una categoría para editar
    const handleEdit = (categoria) => {
        setNombreCategoria(categoria.nombre_categoria);
        setDescripcion(categoria.descripcion);
        setCategoriaID(categoria.categoriaid);
    };

    return (
        <div className="container mx-auto p-6 max-w-lg flex flex-col gap-6">
            <h2 className="text-3xl font-bold text-center mb-6">Gestionar Categorías</h2>
            {successMessage && (
                <div className="bg-green-100 text-green-800 p-3 rounded-md mb-4 text-center">
                    {successMessage}
                </div>
            )}
            <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6 mb-6">
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Nombre de la Categoría</label>
                    <input
                        type="text"
                        value={nombreCategoria}
                        onChange={(e) => setNombreCategoria(e.target.value)}
                        placeholder="Nombre de la categoría"
                        className="border border-gray-300 rounded-md py-2 px-4 w-full"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Descripción</label>
                    <textarea
                        value={descripcion}
                        onChange={(e) => setDescripcion(e.target.value)}
                        placeholder="Descripción de la categoría"
                        className="border border-gray-300 rounded-md py-2 px-4 w-full"
                    />
                </div>
                <button type="submit" className={`w-full py-2 px-4 rounded-md text-white ${categoriaID ? 'bg-yellow-500 hover:bg-yellow-600' : 'bg-blue-500 hover:bg-blue-600'}`}>
                    {categoriaID ? 'Actualizar Categoría' : 'Agregar Categoría'}
                </button>
            </form>
            <ul className="space-y-4">
                {categorias.map((categoria) => (
                    <li key={categoria.categoriaid} className="border p-4 rounded-md shadow-md flex justify-between items-center">
                        <div>
                            <h3 className="font-semibold text-lg">{categoria.nombre_categoria}</h3>
                            <p className="text-gray-500">{categoria.descripcion}</p>
                        </div>
                        <div className="flex space-x-2">
                            <button onClick={() => handleEdit(categoria)} className="bg-yellow-500 text-white py-1 px-2 rounded-md hover:bg-yellow-600">
                                Editar
                            </button>
                            <button onClick={() => eliminarCategoria(categoria.categoriaid)} className="bg-red-500 text-white py-1 px-2 rounded-md hover:bg-red-600">
                                Eliminar
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CategoriaForm;
