import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EdicionForm = () => {
    const [ediciones, setEdiciones] = useState([]);
    const [isbn, setIsbn] = useState('');
    const [numeroEdicion, setNumeroEdicion] = useState('');
    const [fechaPublicacion, setFechaPublicacion] = useState('');
    const [tituloLibro, setTituloLibro] = useState('');
    const [nombreProveedor, setNombreProveedor] = useState('');
    const [edicionID, setEdicionID] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');

    const fetchEdiciones = async () => {
        try {
            const response = await axios.get('https://backend-proyecto-production-13fc.up.railway.app/api/ediciones');
            setEdiciones(response.data);
        } catch (error) {
            console.error('Error obteniendo las ediciones:', error);
        }
    };

    useEffect(() => {
        fetchEdiciones();
    }, []);

    const insertarEdicion = async () => {
        try {
            await axios.post('https://backend-proyecto-production-13fc.up.railway.app/api/ediciones', {
                isbn,
                numero_edicion: numeroEdicion,
                fecha_publicacion: fechaPublicacion,
                titulo_libro: tituloLibro,
                nombre_proveedor: nombreProveedor
            });
            resetForm();
            setSuccessMessage('Edición agregada exitosamente');
            fetchEdiciones();
        } catch (error) {
            console.error('Error insertando la edición:', error);
        }
    };

    const actualizarEdicion = async () => {
        try {
            await axios.put(`https://backend-proyecto-production-13fc.up.railway.app/api/ediciones/${edicionID}`, {
                isbn,
                numero_edicion: numeroEdicion,
                fecha_publicacion: fechaPublicacion,
                titulo_libro: tituloLibro,
                nombre_proveedor: nombreProveedor
            });
            resetForm();
            setSuccessMessage('Edición actualizada exitosamente');
            fetchEdiciones();
        } catch (error) {
            console.error('Error actualizando la edición:', error);
        }
    };

    const eliminarEdicion = async (id) => {
        if (window.confirm('¿Estás seguro de que deseas eliminar esta edición?')) {
            try {
                await axios.delete(`https://backend-proyecto-production-13fc.up.railway.app/api/ediciones/${id}`);
                setSuccessMessage('Edición eliminada exitosamente');
                fetchEdiciones();
            } catch (error) {
                console.error('Error eliminando la edición:', error);
            }
        }
    };

    const resetForm = () => {
        setIsbn('');
        setNumeroEdicion('');
        setFechaPublicacion('');
        setTituloLibro('');
        setNombreProveedor('');
        setEdicionID(null);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (edicionID) {
            actualizarEdicion();
        } else {
            insertarEdicion();
        }
    };

    const handleEdit = (edicion) => {
        setIsbn(edicion.isbn);
        setNumeroEdicion(edicion.numero_edicion);
        setFechaPublicacion(edicion.fecha_publicacion);
        setTituloLibro(edicion.titulo_libro);
        setNombreProveedor(edicion.nombre_proveedor);
        setEdicionID(edicion.edicionid);
    };

    return (
        <div className="container mx-auto p-6 max-w-lg flex flex-col gap-6">
            <h2 className="text-3xl font-bold text-center mb-6">Gestionar Ediciones</h2>
            {successMessage && (
                <div className="bg-green-100 text-green-800 p-3 rounded-md mb-4 text-center">
                    {successMessage}
                </div>
            )}
            <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6 mb-6">
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">ISBN</label>
                    <input
                        type="text"
                        value={isbn}
                        onChange={(e) => setIsbn(e.target.value)}
                        placeholder="ISBN"
                        className="border border-gray-300 rounded-md py-2 px-4 w-full"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Número de Edición</label>
                    <input
                        type="text"
                        value={numeroEdicion}
                        onChange={(e) => setNumeroEdicion(e.target.value)}
                        placeholder="Número de edición"
                        className="border border-gray-300 rounded-md py-2 px-4 w-full"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Fecha de Publicación</label>
                    <input
                        type="date"
                        value={fechaPublicacion}
                        onChange={(e) => setFechaPublicacion(e.target.value)}
                        className="border border-gray-300 rounded-md py-2 px-4 w-full"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Titulo del Libro</label>
                    <input
                        type="text"
                        value={tituloLibro}
                        onChange={(e) => setTituloLibro(e.target.value)}
                        placeholder="Titulo del Libro"
                        className="border border-gray-300 rounded-md py-2 px-4 w-full"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Nombre del Proveedor</label>
                    <input
                        type="text"
                        value={nombreProveedor}
                        onChange={(e) => setNombreProveedor(e.target.value)}
                        placeholder="Nombre del proveedor"
                        className="border border-gray-300 rounded-md py-2 px-4 w-full"
                    />
                </div>
                <button type="submit" className={`w-full py-2 px-4 rounded-md text-white ${edicionID ? 'bg-yellow-500 hover:bg-yellow-600' : 'bg-blue-500 hover:bg-blue-600'}`}>
                    {edicionID ? 'Actualizar Edición' : 'Agregar Edición'}
                </button>
            </form>
            <ul className="space-y-4">
                {ediciones.map((edicion) => (
                    <li key={edicion.edicionid} className="border p-4 rounded-md shadow-md flex justify-between items-center">
                        <div>
                            <h3 className="font-semibold text-lg">ISBN: {edicion.isbn}</h3>
                            <p className="text-gray-500">Número de Edición: {edicion.numero_edicion}</p>
                            <p className="text-gray-500">Fecha de Publicación: {edicion.fecha_publicacion}</p>
                        </div>
                        <div className="flex space-x-2">
                            <button onClick={() => handleEdit(edicion)} className="bg-yellow-500 text-white py-1 px-2 rounded-md hover:bg-yellow-600">
                                Editar
                            </button>
                            <button onClick={() => eliminarEdicion(edicion.edicionid)} className="bg-red-500 text-white py-1 px-2 rounded-md hover:bg-red-600">
                                Eliminar
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default EdicionForm;