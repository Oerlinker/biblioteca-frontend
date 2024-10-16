import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DeleteUserForm = () => {
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState('');

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/usuarios');
                setUsers(response.data);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        fetchUsers();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.delete(`http://localhost:3000/api/usuarios/${selectedUser}`);
            alert('Usuario eliminado con éxito');
        } catch (error) {
            console.error('Error eliminando el usuario:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2 className="text-2xl font-bold text-gray-700 mb-4">Eliminar Usuario</h2>
            <div>
                <label>Selecciona un Usuario:</label>
                <select value={selectedUser} onChange={(e) => setSelectedUser(e.target.value)}>
                    <option value="">Selecciona un usuario</option>
                    {users.map(user => (
                        <option key={user.usuarioid} value={user.usuarioid}>
                            {user.nombre_usuario}
                        </option>
                    ))}
                </select>
            </div>
            <button type="submit" className="bg-blue-500 text-white mt-4">Eliminar Usuario</button>
        </form>
    );
};

export default DeleteUserForm;