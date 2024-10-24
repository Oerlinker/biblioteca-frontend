import React, { useState } from 'react';
import axios from 'axios';

const EditUserName = ({ user }) => {
    const [nombre, setNombre] = useState(user.nombre);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`https://backend-proyecto-production-13fc.up.railway.app/api/users/name/${user.id}`, { nombre });
            // Optionally, add a success message or redirect the user
        } catch (error) {
            console.error('Error updating username:', error);
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