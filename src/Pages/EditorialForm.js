import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EditorialForm = () => {
    const [editoriales, setEditoriales] = useState([]);
    const [nombreEditorial, setNombreEditorial] = useState('');
    const [direccion, setDireccion] = useState('');
    const [contacto, setContacto] = useState('');
    const [editorialID, setEditorialID] = useState(null);

    // Fetch editoriales
    const fetchEditoriales = async () => {
        try {
            const response = await axios.get('https://backend-proyecto-production-13fc.up.railway.app/api/editoriales');
            setEditoriales(response.data);
        } catch (error) {
            console.error('Error obteniendo las editoriales:', error);
        }
    };

    useEffect(() => {
        fetchEditoriales();
    }, []);

    // Insertar editorial
    const insertarEditorial = async () => {
        try {
            await axios.post('https://backend-proyecto-production-13fc.up.railway.app/api/editoriales', {
                Nombre_Editorial: nombreEditorial,
                Direccion: direccion,
                Contacto: contacto
            });
            setNombreEditorial('');
            setDireccion('');
            setContacto('');
            fetchEditoriales();
        } catch (error) {
            console.error('Error insertando la editorial:', error);
        }
    };

    // Actualizar editorial
    const actualizarEditorial = async () => {
        try {
            await axios.put(`https://backend-proyecto-production-13fc.up.railway.app/api/editoriales/${editorialID}`, {
                Nombre_Editorial: nombreEditorial,
                Direccion: direccion,
                Contacto: contacto
            });
            setNombreEditorial('');
            setDireccion('');
            setContacto('');
            setEditorialID(null);
            fetchEditoriales();
        } catch (error) {
            console.error('Error actualizando la editorial:', error);
        }
    };

    // Eliminar editorial
    const eliminarEditorial = async (id) => {
        try {
            await axios.delete(`https://backend-proyecto-production-13fc.up.railway.app/api/editoriales/${id}`);
            fetchEditoriales();
        } catch (error) {
            console.error('Error eliminando la editorial:', error);
        }
    };

    // Manejar el submit del formulario
    const handleSubmit = (e) => {
        e.preventDefault();
        if (editorialID) {
            actualizarEditorial();
        } else {
            insertarEditorial();
        }
    };

    // Manejar la selección de una editorial para editar
    const handleEdit = (editorial) => {
        setNombreEditorial(editorial.nombre_editorial);
        setDireccion(editorial.direccion);
        setContacto(editorial.contacto);
        setEditorialID(editorial.editorialid);
    };

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-3xl font-bold text-center mb-6">Gestionar Editoriales</h2>
            <form onSubmit={handleSubmit} className="mb-4">
                <input
                    type="text"
                    value={nombreEditorial}
                    onChange={(e) => setNombreEditorial(e.target.value)}
                    placeholder="Nombre de la editorial"
                    className="border border-gray-300 rounded-md py-2 px-4 w-full mb-2"
                />
                <input
                    type="text"
                    value={direccion}
                    onChange={(e) => setDireccion(e.target.value)}
                    placeholder="Dirección de la editorial"
                    className="border border-gray-300 rounded-md py-2 px-4 w-full mb-2"
                />
                <input
                    type="text"
                    value={contacto}
                    onChange={(e) => setContacto(e.target.value)}
                    placeholder="Contacto de la editorial"
                    className="border border-gray-300 rounded-md py-2 px-4 w-full mb-2"
                />
                <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600">
                    {editorialID ? 'Actualizar Editorial' : 'Agregar Editorial'}
                </button>
            </form>
            <ul>
                {editoriales.map((editorial) => (
                    <li key={editorial.editorialid} className="border p-4 rounded-md shadow-md mb-2 flex justify-between items-center">
                        <span>{editorial.nombre_editorial}</span>
                        <div>
                            <button onClick={() => handleEdit(editorial)} className="bg-yellow-500 text-white py-1 px-2 rounded-md hover:bg-yellow-600 mr-2">
                                Editar
                            </button>
                            <button onClick={() => eliminarEditorial(editorial.editorialid)} className="bg-red-500 text-white py-1 px-2 rounded-md hover:bg-red-600">
                                Eliminar
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default EditorialForm;