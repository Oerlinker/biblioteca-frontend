import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ListUsers = () => {
    const [users, setUsers] = useState([]);

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

    return (
        <div>
            <h2 className="text-2xl font-bold text-gray-700 mb-4">Lista de Usuarios</h2>
            <ul>
                {users.map(user => (
                    <li key={user.usuarioid}>{user.nombre_usuario}</li>
                ))}
            </ul>
        </div>
    );
};

export default ListUsers;