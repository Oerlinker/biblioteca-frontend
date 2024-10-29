import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProveedorForm = () => {
    const [proveedores, setProveedores] = useState([]);
    const [nombre, setNombre] = useState('');
    const [direccion, setDireccion] = useState('');
    const [telefono, setTelefono] = useState('');
    const [proveedorID, setProveedorID] = useState(null);

    // Fetch proveedores
    const fetchProveedores = async () => {
        try {
            const response = await axios.get('https://backend-proyecto-production-13fc.up.railway.app/api/proveedores');
            setProveedores(response.data);
        } catch (error) {
            console.error('Error obteniendo los proveedores:', error);
        }
    };

    useEffect(() => {
        fetchProveedores();
    }, []);

    // Insertar proveedor
    const insertarProveedor = async () => {
        try {
            await axios.post('https://backend-proyecto-production-13fc.up.railway.app/api/proveedores', {
                nombre,
                direccion,
                telefono
            });
            setNombre('');
            setDireccion('');
            setTelefono('');
            fetchProveedores();
        } catch (error) {
            console.error('Error insertando el proveedor:', error);
        }
    };

    // Actualizar proveedor
    const actualizarProveedor = async () => {
        try {
            await axios.put(`https://backend-proyecto-production-13fc.up.railway.app/api/proveedores/${proveedorID}`, {
                nombre,
                direccion,
                telefono
            });
            setNombre('');
            setDireccion('');
            setTelefono('');
            setProveedorID(null);
            fetchProveedores();
        } catch (error) {
            console.error('Error actualizando el proveedor:', error);
        }
    };

    // Eliminar proveedor
    const eliminarProveedor = async (id) => {
        try {
            await axios.delete(`https://backend-proyecto-production-13fc.up.railway.app/api/proveedores/${id}`);
            fetchProveedores();
        } catch (error) {
            console.error('Error eliminando el proveedor:', error);
        }
    };

    // Manejar el submit del formulario
    const handleSubmit = (e) => {
        e.preventDefault();
        if (proveedorID) {
            actualizarProveedor();
        } else {
            insertarProveedor();
        }
    };

    // Manejar la selección de un proveedor para editar
    const handleEdit = (proveedor) => {
        setNombre(proveedor.nombre);
        setDireccion(proveedor.direccion);
        setTelefono(proveedor.telefono);
        setProveedorID(proveedor.proveedorid);
    };

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-3xl font-bold text-center mb-6">Gestionar Proveedores</h2>
            <form onSubmit={handleSubmit} className="mb-4">
                <input
                    type="text"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    placeholder="Nombre del proveedor"
                    className="border border-gray-300 rounded-md py-2 px-4 w-full mb-2"
                />
                <input
                    type="text"
                    value={direccion}
                    onChange={(e) => setDireccion(e.target.value)}
                    placeholder="Dirección del proveedor"
                    className="border border-gray-300 rounded-md py-2 px-4 w-full mb-2"
                />
                <input
                    type="text"
                    value={telefono}
                    onChange={(e) => setTelefono(e.target.value)}
                    placeholder="Teléfono del proveedor"
                    className="border border-gray-300 rounded-md py-2 px-4 w-full mb-2"
                />
                <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600">
                    {proveedorID ? 'Actualizar Proveedor' : 'Agregar Proveedor'}
                </button>
            </form>
            <ul>
                {proveedores.map((proveedor) => (
                    <li key={proveedor.proveedorid} className="border p-4 rounded-md shadow-md mb-2 flex justify-between items-center">
                        <span>{proveedor.nombre}</span>
                        <div>
                            <button onClick={() => handleEdit(proveedor)} className="bg-yellow-500 text-white py-1 px-2 rounded-md hover:bg-yellow-600 mr-2">
                                Editar
                            </button>
                            <button onClick={() => eliminarProveedor(proveedor.proveedorid)} className="bg-red-500 text-white py-1 px-2 rounded-md hover:bg-red-600">
                                Eliminar
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ProveedorForm;