import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdministrarRoles = () => {
    const [usuarios, setUsuarios] = useState([]);

    useEffect(() => {
        axios.get('https://backend-proyecto-production-13fc.up.railway.app/api/users')
            .then((response) => {
                setUsuarios(response.data);
            })
            .catch((error) => {
                console.error('Error al obtener usuarios:', error);
            });
    }, []);

    const handleUpdateRole = (userId, newRole) => {
        if (!newRole) {
            alert('Por favor, selecciona un rol.');
            return;
        }

        axios.put('https://backend-proyecto-production-13fc.up.railway.app/api/users/update', { userId, newRole })
            .then((response) => {
                alert('Rol actualizado exitosamente');
                setUsuarios((prev) =>
                    prev.map((user) =>
                        user.usuarioid === userId ? { ...user, rolid: newRole } : user
                    )
                );
            })
            .catch((error) => {
                console.error('Error al actualizar rol:', error);
                alert('Error al actualizar el rol');
            });
    };

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4 text-center">Administrar Roles</h2>
            <div className="overflow-x-auto">
                <table className="min-w-full border border-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="border border-gray-300 p-2 text-center">ID</th>
                            <th className="border border-gray-300 p-2 text-center">Nombre</th>
                            <th className="border border-gray-300 p-2 text-center">Correo</th>
                            <th className="border border-gray-300 p-2 text-center">Rol ID</th>
                            <th className="border border-gray-300 p-2 text-center">Rol</th>
                            <th className="border border-gray-300 p-2 text-center">Acciones</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {usuarios.map((usuario) => (
                            <tr key={usuario.usuarioid}>
                                <td className="border border-gray-300 p-2 text-center">{usuario.usuarioid}</td>
                                <td className="border border-gray-300 p-2 text-center">{usuario.nombre_usuario}</td>
                                <td className="border border-gray-300 p-2 text-center">{usuario.correo_electronico}</td>
                                <td className="border border-gray-300 p-2 text-center">{usuario.rolid}</td>
                                <td className="border border-gray-300 p-2 text-center">
                                    <select
                                        value={usuario.newRole || usuario.rolid}
                                        onChange={(e) => {
                                            const updatedUsuarios = usuarios.map((u) =>
                                                u.usuarioid === usuario.usuarioid
                                                    ? { ...u, newRole: e.target.value }
                                                    : u
                                            );
                                            setUsuarios(updatedUsuarios);
                                        }}
                                        className="p-1 border border-gray-300 rounded"
                                    >
                                        <option value="">Seleccionar rol</option>
                                        <option value="1">Usuario</option>
                                        <option value="2">Miembro</option>
                                        <option value="3">Empleado</option>
                                        <option value="4">Administrador</option>
                                    </select>
                                </td>
                                <td className="border border-gray-300 p-2 text-center">
                                    <button
                                        onClick={() => handleUpdateRole(usuario.usuarioid, usuario.newRole || usuario.rolid)}
                                        className="bg-blue-500 text-white p-1 rounded hover:bg-blue-600"
                                    >
                                        Actualizar Rol
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdministrarRoles;