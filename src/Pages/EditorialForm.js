import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EditorialForm = () => {
    const [editoriales, setEditoriales] = useState([]);
    const [nombreEditorial, setNombreEditorial] = useState('');
    const [direccion, setDireccion] = useState('');
    const [contacto, setContacto] = useState('');
    const [editorialID, setEditorialID] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');

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

    const insertarEditorial = async () => {
        try {
            await axios.post('https://backend-proyecto-production-13fc.up.railway.app/api/editoriales', {
                Nombre_Editorial: nombreEditorial,
                Direccion: direccion,
                Contacto: contacto
            });
            resetForm();
            setSuccessMessage('Editorial agregada exitosamente');
            fetchEditoriales();
        } catch (error) {
            console.error('Error insertando la editorial:', error);
        }
    };

    const actualizarEditorial = async () => {
        try {
            await axios.put(`https://backend-proyecto-production-13fc.up.railway.app/api/editoriales/${editorialID}`, {
                Nombre_Editorial: nombreEditorial,
                Direccion: direccion,
                Contacto: contacto
            });
            resetForm();
            setSuccessMessage('Editorial actualizada exitosamente');
            fetchEditoriales();
        } catch (error) {
            console.error('Error actualizando la editorial:', error);
        }
    };

    const eliminarEditorial = async (id) => {
        if (window.confirm('¿Estás seguro de que deseas eliminar esta editorial?')) {
            try {
                await axios.delete(`https://backend-proyecto-production-13fc.up.railway.app/api/editoriales/${id}`);
                setSuccessMessage('Editorial eliminada exitosamente');
                fetchEditoriales();
            } catch (error) {
                console.error('Error eliminando la editorial:', error);
            }
        }
    };

    const resetForm = () => {
        setNombreEditorial('');
        setDireccion('');
        setContacto('');
        setEditorialID(null);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editorialID) {
            actualizarEditorial();
        } else {
            insertarEditorial();
        }
    };

    const handleEdit = (editorial) => {
        setNombreEditorial(editorial.nombre_editorial);
        setDireccion(editorial.direccion);
        setContacto(editorial.contacto);
        setEditorialID(editorial.editorialid);
    };

    return (
        <div className="container mx-auto p-6 max-w-lg flex flex-col gap-6">
            <h2 className="text-3xl font-bold text-center mb-6">Gestionar Editoriales</h2>
            {successMessage && (
                <div className="bg-green-100 text-green-800 p-3 rounded-md mb-4 text-center">
                    {successMessage}
                </div>
            )}
            <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6 mb-6">
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Nombre de la Editorial</label>
                    <input
                        type="text"
                        value={nombreEditorial}
                        onChange={(e) => setNombreEditorial(e.target.value)}
                        placeholder="Nombre de la editorial"
                        className="border border-gray-300 rounded-md py-2 px-4 w-full"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Dirección</label>
                    <input
                        type="text"
                        value={direccion}
                        onChange={(e) => setDireccion(e.target.value)}
                        placeholder="Dirección de la editorial"
                        className="border border-gray-300 rounded-md py-2 px-4 w-full"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Contacto</label>
                    <input
                        type="text"
                        value={contacto}
                        onChange={(e) => setContacto(e.target.value)}
                        placeholder="Contacto de la editorial"
                        className="border border-gray-300 rounded-md py-2 px-4 w-full"
                    />
                </div>
                <button type="submit" className={`w-full py-2 px-4 rounded-md text-white ${editorialID ? 'bg-yellow-500 hover:bg-yellow-600' : 'bg-blue-500 hover:bg-blue-600'}`}>
                    {editorialID ? 'Actualizar Editorial' : 'Agregar Editorial'}
                </button>
            </form>
            <ul className="space-y-4">
                {editoriales.map((editorial) => (
                    <li key={editorial.editorialid} className="border p-4 rounded-md shadow-md flex justify-between items-center">
                        <div>
                            <h3 className="font-semibold text-lg">{editorial.nombre_editorial}</h3>
                            <p className="text-gray-500">{editorial.direccion}</p>
                            <p className="text-gray-500">{editorial.contacto}</p>
                        </div>
                        <div className="flex space-x-2">
                            <button onClick={() => handleEdit(editorial)} className="bg-yellow-500 text-white py-1 px-2 rounded-md hover:bg-yellow-600">
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
