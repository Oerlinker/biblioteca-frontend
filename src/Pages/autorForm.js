import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AutorForm = () => {
    const [autores, setAutores] = useState([]);
    const [nombre, setNombre] = useState('');
    const [biografia, setBiografia] = useState('');
    const [nacionalidad, setNacionalidad] = useState('');
    const [autorID, setAutorID] = useState(null);

    // Fetch autores
    const fetchAutores = async () => {
        try {
            const response = await axios.get('https://backend-proyecto-production-13fc.up.railway.app/api/autores');
            setAutores(response.data);
        } catch (error) {
            console.error('Error obteniendo los autores:', error);
        }
    };

    useEffect(() => {
        fetchAutores();
    }, []);

    // Insertar autor
    const insertarAutor = async () => {
        try {
            await axios.post('https://backend-proyecto-production-13fc.up.railway.app/api/autores', {
                Nombre: nombre,
                Biografia: biografia,
                Nacionalidad: nacionalidad
            });
            setNombre('');
            setBiografia('');
            setNacionalidad('');
            fetchAutores();
        } catch (error) {
            console.error('Error insertando el autor:', error);
        }
    };

    // Actualizar autor
    const actualizarAutor = async () => {
        try {
            await axios.put(`https://backend-proyecto-production-13fc.up.railway.app/api/autores/${autorID}`, {
                Nombre: nombre,
                Biografia: biografia,
                Nacionalidad: nacionalidad
            });
            setNombre('');
            setBiografia('');
            setNacionalidad('');
            setAutorID(null);
            fetchAutores();
        } catch (error) {
            console.error('Error actualizando el autor:', error);
        }
    };

    // Eliminar autor
    const eliminarAutor = async (id) => {
        try {
            await axios.delete(`https://backend-proyecto-production-13fc.up.railway.app/api/autores/${id}`);
            fetchAutores();
        } catch (error) {
            console.error('Error eliminando el autor:', error);
        }
    };

    // Manejar el submit del formulario
    const handleSubmit = (e) => {
        e.preventDefault();
        if (autorID) {
            actualizarAutor();
        } else {
            insertarAutor();
        }
    };

    // Manejar la selección de un autor para editar
    const handleEdit = (autor) => {
        setNombre(autor.nombre);
        setBiografia(autor.biografia);
        setNacionalidad(autor.nacionalidad);
        setAutorID(autor.autorid);
    };

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-3xl font-bold text-center mb-6">Gestionar Autores</h2>
            <form onSubmit={handleSubmit} className="mb-4">
                <input
                    type="text"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    placeholder="Nombre del autor"
                    className="border border-gray-300 rounded-md py-2 px-4 w-full mb-2"
                />
                <textarea
                    value={biografia}
                    onChange={(e) => setBiografia(e.target.value)}
                    placeholder="Biografía del autor"
                    className="border border-gray-300 rounded-md py-2 px-4 w-full mb-2"
                />
                <input
                    type="text"
                    value={nacionalidad}
                    onChange={(e) => setNacionalidad(e.target.value)}
                    placeholder="Nacionalidad del autor"
                    className="border border-gray-300 rounded-md py-2 px-4 w-full mb-2"
                />
                <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600">
                    {autorID ? 'Actualizar Autor' : 'Agregar Autor'}
                </button>
            </form>
            <ul>
                {autores.map((autor) => (
                    <li key={autor.autorid} className="border p-4 rounded-md shadow-md mb-2 flex justify-between items-center">
                        <span>{autor.nombre}</span>
                        <div>
                            <button onClick={() => handleEdit(autor)} className="bg-yellow-500 text-white py-1 px-2 rounded-md hover:bg-yellow-600 mr-2">
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