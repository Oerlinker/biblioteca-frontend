import React, { useState, useEffect } from 'react';
import axiosInstance from "../components/axiosInstance";

const GetAllUsuarios = () => {
    const [usuarios, setUsuarios] = useState([]);

    useEffect(() => {
        axiosInstance.get('users')
            .then((response) => {
                setUsuarios(response.data);
            })
            .catch((error) => {
                console.error('Error al obtener usuarios:', error);
            });
    }, []);

    return (
        <div className="container mx-auto px-4 py-8 max-w-5xl">
            <h2 className="text-4xl font-bold mb-8 text-center text-gray-800">Todos los Usuarios</h2>
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-100">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Correo</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rol ID</th>
                    </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                    {usuarios.map((usuario) => (
                        <tr key={usuario.usuarioid} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{usuario.usuarioid}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{usuario.nombre_usuario}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{usuario.correo_electronico}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{usuario.rolid}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default GetAllUsuarios;
