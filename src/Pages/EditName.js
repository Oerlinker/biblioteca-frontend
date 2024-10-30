import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';

const EditUserName = () => {
    const location = useLocation();
    const { user } = location.state || {};
    const [nombre, setNombre] = useState(user?.nombre || '');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!user || !user.id) {
            alert("No se ha podido obtener el usuario");
            return;
        }
        try {
            await axios.put(`https://backend-proyecto-production-13fc.up.railway.app/api/users/name/${user.id}`, { nombre });
            alert("Nombre de usuario actualizado con éxito");
            navigate("/profile");
            setNombre('');
        } catch (error) {
            console.error('Error actualizando el nombre de usuario:', error);
            alert("Hubo un problema al actualizar el nombre de usuario");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label className="block text-sm font-medium text-gray-700">Username:</label>
                <input
                    className="block w-full p-2 border border-gray-300 rounded"
                    type="text"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    placeholder="Escribe nuevo username"
                />
            </div>
            <button type="submit" className="w-full bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600">Actualizar</button>
        </form>
    );
};

export default EditUserName;