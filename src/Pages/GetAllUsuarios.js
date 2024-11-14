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
        <section className="container mx-auto px-4 flex flex-col items-center">
            <h2 className="text-2xl font-bold text-gray-800 text-center">Usuarios</h2>
            <p className="mt-1 text-sm text-gray-500 text-center">Estos son los usuarios actuales del sistema.</p>

            <div className="flex flex-col mt-6 w-full max-w-3xl">
                <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                        <div className="overflow-hidden border border-gray-200 md:rounded-lg">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th scope="col" className="py-3.5 px-4 text-sm font-normal text-center text-gray-500">
                                            <span>ID</span>
                                        </th>
                                        <th scope="col" className="px-4 py-3.5 text-sm font-normal text-center text-gray-500">
                                            Nombre
                                        </th>
                                        <th scope="col" className="px-4 py-3.5 text-sm font-normal text-center text-gray-500">
                                            Correo
                                        </th>
                                        <th scope="col" className="px-4 py-3.5 text-sm font-normal text-center text-gray-500">
                                            Rol ID
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {usuarios.length > 0 ? (
                                        usuarios.map((usuario) => (
                                            <tr key={usuario.usuarioid}>
                                                <td className="px-4 py-4 text-sm font-medium text-gray-800 text-center">{usuario.usuarioid}</td>
                                                <td className="px-4 py-4 text-sm font-medium text-gray-600 text-center">{usuario.nombre_usuario}</td>
                                                <td className="px-4 py-4 text-sm font-medium text-gray-600 text-center">{usuario.correo_electronico}</td>
                                                <td className="px-4 py-4 text-sm font-medium text-gray-500 text-center">{usuario.rolid}</td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="4" className="px-4 py-4 text-center text-sm text-gray-500">
                                                No se encontraron usuarios.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default GetAllUsuarios;