// UpdateUserForm.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UpdateUserForm = () => {
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [nombre, setNombre] = useState('');
    const [email, setEmail] = useState('');
    const [rol, setRol] = useState('');

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

    const handleUserChange = (e) => {
        const userId = e.target.value;
        const user = users.find(usr => usr.usuarioid === userId);
        setSelectedUser(user);
        setNombre(user.nombre_usuario);
        setEmail(user.correo_electronico);
        setRol(user.rolid);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:3000/api/usuarios/${selectedUser.usuarioid}`, {
                nombre,
                email,
                rol
            });
            alert('Usuario actualizado con éxito');
        } catch (error) {
            console.error('Error actualizando el usuario:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2 className="text-2xl font-bold text-gray-700 mb-4">Actualizar Usuario</h2>
            <div>
                <label>Selecciona un Usuario:</label>
                <select onChange={handleUserChange}>
                    <option value="">Selecciona un usuario</option>
                    {users.map(user => (
                        <option key={user.usuarioid} value={user.usuarioid}>
                            {user.nombre_usuario}
                        </option>
                    ))}
                </select>
            </div>
            {selectedUser && (
                <>
                    <div>
                        <label>Nombre:</label>
                        <input
                            type="text"
                            value={nombre}
                            onChange={(e) => setNombre(e.target.value)}
                        />
                    </div>
                    <div>
                        <label>Email:</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div>
                        <label>Rol:</label>
                        <input
                            type="text"
                            value={rol}
                            onChange={(e) => setRol(e.target.value)}
                        />
                    </div>
                    <button type="submit" className="bg-blue-500 text-white mt-4">Actualizar Usuario</button>
                </>
            )}
        </form>
    );
};

export default UpdateUserForm;