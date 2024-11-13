import React, { useState, useEffect } from 'react';
import axiosInstance from "../components/axiosInstance";

const GetAllUsuarios = () => {
    const [usuarios, setUsuarios] = useState([]);

    useEffect(() => {
        axiosInstance.get('https://backend-proyecto-production-13fc.up.railway.app/api/users')
            .then((response) => {
                setUsuarios(response.data);
            })
            .catch((error) => {
                console.error('Error al obtener usuarios:', error);
            });
    }, []);

    return (
        <div className="container mx-auto p-6 max-w-3xl">
            <h2 className="text-3xl font-bold mb-6 text-center">Todos los Usuarios</h2>
            <div className="overflow-x-auto">
                <table className="min-w-full border border-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="border border-gray-300 p-2 text-center">ID</th>
                            <th className="border border-gray-300 p-2 text-center">Nombre</th>
                            <th className="border border-gray-300 p-2 text-center">Correo</th>
                            <th className="border border-gray-300 p-2 text-center">Rol ID</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {usuarios.map((usuario) => (
                            <tr key={usuario.usuarioid}>
                                <td className="border border-gray-300 p-2 text-center">{usuario.usuarioid}</td>
                                <td className="border border-gray-300 p-2 text-center">{usuario.nombre_usuario}</td>
                                <td className="border border-gray-300 p-2 text-center">{usuario.correo_electronico}</td>
                                <td className="border border-gray-300 p-2 text-center">{usuario.rolid}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default GetAllUsuarios;