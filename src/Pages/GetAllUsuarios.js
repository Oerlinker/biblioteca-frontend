import React, { useState, useEffect } from 'react';
import axios from 'axios';

const GetAllUsuarios = () => {
    const [usuarios, setUsuarios] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3000/api/users')
            .then((response) => {
                setUsuarios(response.data);
            })
            .catch((error) => {
                console.error('Error al obtener usuarios:', error);
            });
    }, []);

    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold mb-4">Todos los Usuarios</h2>
            <table className="min-w-full border border-gray-200">
                <thead>
                <tr>
                    <th className="border border-gray-300 p-2">ID</th>
                    <th className="border border-gray-300 p-2">Nombre</th>
                    <th className="border border-gray-300 p-2">Correo</th>
                    <th className="border border-gray-300 p-2">Rol ID</th>
                </tr>
                </thead>
                <tbody>
                {usuarios.map((usuario) => (
                    <tr key={usuario.usuarioid}>
                        <td className="border border-gray-300 p-2">{usuario.usuarioid}</td>
                        <td className="border border-gray-300 p-2">{usuario.nombre_usuario}</td>
                        <td className="border border-gray-300 p-2">{usuario.correo_electronico}</td>
                        <td className="border border-gray-300 p-2">{usuario.rolid}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default GetAllUsuarios;