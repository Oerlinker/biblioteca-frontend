import React, { useContext, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../UserContext';

const EditEmail = () => {
    const { user, setUser } = useContext(UserContext);
    const [correo, setCorreo] = useState(user.correo);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!user || !user.id) {
            alert("No se ha podido obtener el usuario");
            return;
        }
        try {
            const response = await axios.put(`https://backend-proyecto-production-13fc.up.railway.app/api/users/email/${user.id}`, { correo });
            alert("Correo actualizado con éxito");
            setUser({ ...user, correo: response.data.correo });
            navigate("/profile");
            setCorreo('');
        } catch (error) {
            console.error('Error actualizando el correo:', error);
            alert("Hubo un problema al actualizar el correo");
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
                    placeholder="Escribe tu nuevo correo"
                />
            </div>
            <button type="submit" className="w-full bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600">Actualizar</button>
        </form>
    );
};

export default EditEmail;