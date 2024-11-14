import React, { useState, useEffect } from 'react';
import axiosInstance from "../components/axiosInstance";

const AutorForm = () => {
    const [autores, setAutores] = useState([]);
    const [nombre, setNombre] = useState('');
    const [biografia, setBiografia] = useState('');
    const [nacionalidad, setNacionalidad] = useState('');
    const [autorID, setAutorID] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');

    const fetchAutores = async () => {
        try {
            const response = await axiosInstance.get('https://backend-proyecto-production-13fc.up.railway.app/api/autores');
            setAutores(response.data);
        } catch (error) {
            console.error('Error obteniendo los autores:', error);
        }
    };

    useEffect(() => {
        fetchAutores();
    }, []);

    const insertarAutor = async () => {
        try {
            await axiosInstance.post('https://backend-proyecto-production-13fc.up.railway.app/api/autores', {
                Nombre: nombre,
                Biografia: biografia,
                Nacionalidad: nacionalidad
            });
            resetForm();
            setSuccessMessage('Autor agregado exitosamente');
            fetchAutores();
        } catch (error) {
            console.error('Error insertando el autor:', error);
        }
    };

    const actualizarAutor = async () => {
        try {
            await axiosInstance.put(`https://backend-proyecto-production-13fc.up.railway.app/api/autores/${autorID}`, {
                Nombre: nombre,
                Biografia: biografia,
                Nacionalidad: nacionalidad
            });
            resetForm();
            setSuccessMessage('Autor actualizado exitosamente');
            fetchAutores();
        } catch (error) {
            console.error('Error actualizando el autor:', error);
        }
    };

    const eliminarAutor = async (id) => {
        if (window.confirm('¿Estás seguro de que deseas eliminar este autor?')) {
            try {
                await axiosInstance.delete(`https://backend-proyecto-production-13fc.up.railway.app/api/autores/${id}`);
                setSuccessMessage('Autor eliminado exitosamente');
                fetchAutores();
            } catch (error) {
                console.error('Error eliminando el autor:', error);
            }
        }
    };

    const resetForm = () => {
        setNombre('');
        setBiografia('');
        setNacionalidad('');
        setAutorID(null);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (autorID) {
            actualizarAutor();
        } else {
            insertarAutor();
        }
    };

    const handleEdit = (autor) => {
        setNombre(autor.nombre);
        setBiografia(autor.biografia);
        setNacionalidad(autor.nacionalidad);
        setAutorID(autor.autorid);
    };

    return (
        <div className="container mx-auto p-6 max-w-lg flex flex-col gap-6">
            <h2 className="text-3xl font-bold text-center mb-6">Gestionar Autores</h2>
            {successMessage && (
                <div className="bg-green-100 text-green-800 p-3 rounded-md mb-4 text-center">
                    {successMessage}
                </div>
            )}
            <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6 mb-6">
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Nombre del Autor</label>
                    <input
                        type="text"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                        placeholder="Nombre del autor"
                        className="border border-gray-300 rounded-md py-2 px-4 w-full"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Biografía</label>
                    <textarea
                        value={biografia}
                        onChange={(e) => setBiografia(e.target.value)}
                        placeholder="Biografía del autor"
                        className="border border-gray-300 rounded-md py-2 px-4 w-full"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Nacionalidad</label>
                    <input
                        type="text"
                        value={nacionalidad}
                        onChange={(e) => setNacionalidad(e.target.value)}
                        placeholder="Nacionalidad del autor"
                        className="border border-gray-300 rounded-md py-2 px-4 w-full"
                    />
                </div>
                <button type="submit" className={`w-full py-2 px-4 rounded-md text-white ${autorID ? 'bg-yellow-500 hover:bg-yellow-600' : 'bg-blue-500 hover:bg-blue-600'}`}>
                    {autorID ? 'Actualizar Autor' : 'Agregar Autor'}
                </button>
            </form>
            <ul className="space-y-4">
                {autores.map((autor) => (
                    <li key={autor.autorid} className="border p-4 rounded-md shadow-md flex justify-between items-center">
                        <div>
                            <h3 className="font-semibold text-lg">{autor.nombre}</h3>
                            <p className="text-gray-500">Nacionalidad: {autor.nacionalidad}</p>
                            <p className="text-gray-500">Biografía: {autor.biografia}</p>
                        </div>
                        <div className="flex space-x-2">
                            <button onClick={() => handleEdit(autor)} className="bg-yellow-500 text-white py-1 px-2 rounded-md hover:bg-yellow-600">
                                Editar
                            </button>
                            <button onClick={() => eliminarAutor(autor.autorid)} className="bg-red-500 text-white py-1 px-2 rounded-md hover:bg-red-600">
                                Eliminar
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AutorForm;