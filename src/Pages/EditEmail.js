import React, { useState } from 'react';
import axios from 'axios';

const EditEmail = ({ user }) => {
    const [correo, setCorreo] = useState(user.correo);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`https://backend-proyecto-production-13fc.up.railway.app/api/users/correo/${user.id}`, { correo });
            // Optionally, add a success message or redirect the user
        } catch (error) {
            console.error('Error updating email:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label className="block text-sm font-medium text-gray-700">Correo:</label>
                <input
                    className="block w-full p-2 border border-gray-300 rounded"
                    type="email"
                    value={correo}
                    onChange={(e) => setCorreo(e.target.value)}
                    placeholder="Escribe tu correo"
                />
            </div>
            <button type="submit" className="w-full bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600">Actualizar</button>
        </form>
    );
};

export default EditEmail;