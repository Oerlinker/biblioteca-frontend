import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CategoriaForm = () => {
    const [categorias, setCategorias] = useState([]);
    const [nombreCategoria, setNombreCategoria] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [categoriaID, setCategoriaID] = useState(null);

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
            setNombreCategoria('');
            setDescripcion('');
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
            setNombreCategoria('');
            setDescripcion('');
            setCategoriaID(null);
            fetchCategorias();
        } catch (error) {
            console.error('Error actualizando la categoría:', error);
        }
    };

    // Eliminar categoria
    const eliminarCategoria = async (id) => {
        try {
            await axios.delete(`https://backend-proyecto-production-13fc.up.railway.app/api/categorias/${id}`);
            fetchCategorias();
        } catch (error) {
            console.error('Error eliminando la categoría:', error);
        }
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
        <div className="container mx-auto p-4">
            <h2 className="text-3xl font-bold text-center mb-6">Gestionar Categorías</h2>
            <form onSubmit={handleSubmit} className="mb-4">
                <input
                    type="text"
                    value={nombreCategoria}
                    onChange={(e) => setNombreCategoria(e.target.value)}
                    placeholder="Nombre de la categoría"
                    className="border border-gray-300 rounded-md py-2 px-4 w-full mb-2"
                />
                <textarea
                    value={descripcion}
                    onChange={(e) => setDescripcion(e.target.value)}
                    placeholder="Descripción de la categoría"
                    className="border border-gray-300 rounded-md py-2 px-4 w-full mb-2"
                />
                <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600">
                    {categoriaID ? 'Actualizar Categoría' : 'Agregar Categoría'}
                </button>
            </form>
            <ul>
                {categorias.map((categoria) => (
                    <li key={categoria.categoriaid} className="border p-4 rounded-md shadow-md mb-2 flex justify-between items-center">
                        <span>{categoria.nombre_categoria}</span>
                        <div>
                            <button onClick={() => handleEdit(categoria)} className="bg-yellow-500 text-white py-1 px-2 rounded-md hover:bg-yellow-600 mr-2">
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