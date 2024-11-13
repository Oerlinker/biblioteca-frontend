import React, { useState, useEffect } from 'react';
import axiosInstance from "../components/axiosInstance";

const ProveedorForm = () => {
    const [proveedores, setProveedores] = useState([]);
    const [nombreProveedor, setNombreProveedor] = useState('');
    const [contactoProveedor, setContactoProveedor] = useState('');
    const [correoProveedor, setCorreoProveedor] = useState('');
    const [telefonoProveedor, setTelefonoProveedor] = useState('');
    const [direccionProveedor, setDireccionProveedor] = useState('');
    const [proveedorID, setProveedorID] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');

    // Fetch proveedores
    const fetchProveedores = async () => {
        try {
            const response = await axiosInstance.get('https://backend-proyecto-production-13fc.up.railway.app/api/proveedores');
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
            await axiosInstance.post('https://backend-proyecto-production-13fc.up.railway.app/api/proveedores', {
                nombre_proveedor: nombreProveedor,
                contacto_proveedor: contactoProveedor,
                correo_proveedor: correoProveedor,
                telefono_proveedor: telefonoProveedor,
                direccion_proveedor: direccionProveedor
            });
            resetForm();
            setSuccessMessage('Proveedor agregado exitosamente');
            fetchProveedores();
        } catch (error) {
            console.error('Error insertando el proveedor:', error);
        }
    };

    // Actualizar proveedor
    const actualizarProveedor = async () => {
        try {
            await axiosInstance.put(`https://backend-proyecto-production-13fc.up.railway.app/api/proveedores/${proveedorID}`, {
                nombre_proveedor: nombreProveedor,
                contacto_proveedor: contactoProveedor,
                correo_proveedor: correoProveedor,
                telefono_proveedor: telefonoProveedor,
                direccion_proveedor: direccionProveedor
            });
            resetForm();
            setSuccessMessage('Proveedor actualizado exitosamente');
            fetchProveedores();
        } catch (error) {
            console.error('Error actualizando el proveedor:', error);
        }
    };

    // Eliminar proveedor con confirmación
    const eliminarProveedor = async (id) => {
        if (window.confirm('¿Estás seguro de que deseas eliminar este proveedor?')) {
            try {
                await axiosInstance.delete(`https://backend-proyecto-production-13fc.up.railway.app/api/proveedores/${id}`);
                setSuccessMessage('Proveedor eliminado exitosamente');
                fetchProveedores();
            } catch (error) {
                console.error('Error eliminando el proveedor:', error);
            }
        }
    };

    // Reset form
    const resetForm = () => {
        setNombreProveedor('');
        setContactoProveedor('');
        setCorreoProveedor('');
        setTelefonoProveedor('');
        setDireccionProveedor('');
        setProveedorID(null);
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
        setNombreProveedor(proveedor.nombre_proveedor);
        setContactoProveedor(proveedor.contacto_proveedor);
        setCorreoProveedor(proveedor.correo_proveedor);
        setTelefonoProveedor(proveedor.telefono_proveedor);
        setDireccionProveedor(proveedor.direccion_proveedor);
        setProveedorID(proveedor.proveedorid);
    };

    return (
        <div className="container mx-auto p-6 max-w-lg flex flex-col gap-6">
            <h2 className="text-3xl font-bold text-center mb-6">Gestionar Proveedores</h2>
            {successMessage && (
                <div className="bg-green-100 text-green-800 p-3 rounded-md mb-4 text-center">
                    {successMessage}
                </div>
            )}
            <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6 mb-6">
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
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Contacto</label>
                    <input
                        type="text"
                        value={contactoProveedor}
                        onChange={(e) => setContactoProveedor(e.target.value)}
                        placeholder="Contacto del proveedor"
                        className="border border-gray-300 rounded-md py-2 px-4 w-full"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Correo</label>
                    <input
                        type="email"
                        value={correoProveedor}
                        onChange={(e) => setCorreoProveedor(e.target.value)}
                        placeholder="Correo del proveedor"
                        className="border border-gray-300 rounded-md py-2 px-4 w-full"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Teléfono</label>
                    <input
                        type="text"
                        value={telefonoProveedor}
                        onChange={(e) => setTelefonoProveedor(e.target.value)}
                        placeholder="Teléfono del proveedor"
                        className="border border-gray-300 rounded-md py-2 px-4 w-full"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Dirección</label>
                    <input
                        type="text"
                        value={direccionProveedor}
                        onChange={(e) => setDireccionProveedor(e.target.value)}
                        placeholder="Dirección del proveedor"
                        className="border border-gray-300 rounded-md py-2 px-4 w-full"
                    />
                </div>
                <button type="submit" className={`w-full py-2 px-4 rounded-md text-white ${proveedorID ? 'bg-yellow-500 hover:bg-yellow-600' : 'bg-blue-500 hover:bg-blue-600'}`}>
                    {proveedorID ? 'Actualizar Proveedor' : 'Agregar Proveedor'}
                </button>
            </form>
            <ul className="space-y-4">
                {proveedores.map((proveedor) => (
                    <li key={proveedor.proveedorid} className="border p-4 rounded-md shadow-md flex justify-between items-center">
                        <div>
                            <h3 className="font-semibold text-lg">{proveedor.nombre_proveedor}</h3>
                            <p className="text-gray-500">{proveedor.contacto_proveedor}</p>
                            <p className="text-gray-500">{proveedor.correo_proveedor}</p>
                            <p className="text-gray-500">{proveedor.telefono_proveedor}</p>
                            <p className="text-gray-500">{proveedor.direccion_proveedor}</p>
                        </div>
                        <div className="flex space-x-2">
                            <button onClick={() => handleEdit(proveedor)} className="bg-yellow-500 text-white py-1 px-2 rounded-md hover:bg-yellow-600">
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
