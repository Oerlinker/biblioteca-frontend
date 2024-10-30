import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';

const EditPassword = () => {
    const location = useLocation();
    const { user } = location.state || {};
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!user || !user.id) {
            alert("No se ha podido obtener el usuario");
            return;
        }
        if (password.length < 6) {
            alert("La contraseña debe tener al menos 6 caracteres");
            return;
        }
        try {
            await axios.put(`https://backend-proyecto-production-13fc.up.railway.app/api/users/password/${user.id}`, { password });
            alert("Contraseña actualizada con éxito");
            navigate("/profile");
            setPassword('');
        } catch (error) {
            console.error('Error actualizando la contraseña:', error);
            alert("Hubo un problema al actualizar la contraseña");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label className="block text-sm font-medium text-gray-700">Contraseña:</label>
                <input
                    className="block w-full p-2 border border-gray-300 rounded"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Escribe tu nueva contraseña"
                />
            </div>
            <button type="submit" className="w-full bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600">Actualizar</button>
        </form>
    );
};

export default EditPassword;