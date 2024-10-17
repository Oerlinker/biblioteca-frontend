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
        <div className="p-4">
            <h2 className="text-2xl font-bold mb-4">Administrar Roles</h2>
            <table className="min-w-full border border-gray-200">
                <thead>
                <tr>
                    <th className="border border-gray-300 p-2">ID</th>
                    <th className="border border-gray-300 p-2">Nombre</th>
                    <th className="border border-gray-300 p-2">Correo</th>
                    <th className="border border-gray-300 p-2">Rol ID</th>
                    <th className="border border-gray-300 p-2">Rol</th>
                    <th className="border border-gray-300 p-2">Acciones</th>
                </tr>
                </thead>
                <tbody>
                {usuarios.map((usuario) => (
                    <tr key={usuario.usuarioid}>
                        <td className="border border-gray-300 p-2">{usuario.usuarioid}</td>
                        <td className="border border-gray-300 p-2">{usuario.nombre_usuario}</td>
                        <td className="border border-gray-300 p-2">{usuario.correo_electronico}</td>
                        <td className="border border-gray-300 p-2">{usuario.rolid}</td>
                        <td className="border border-gray-300 p-2">
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
                        <td className="border border-gray-300 p-2">
                            <button
                                onClick={() => handleUpdateRole(usuario.usuarioid, usuario.newRole || usuario.rolid)}
                                className="bg-blue-500 text-white p-1 rounded"
                            >
                                Actualizar Rol
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default AdministrarRoles;