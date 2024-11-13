import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../UserContext';
import axiosInstance from "../components/axiosInstance";

const EditUserName = () => {
    const { user, setUser } = useContext(UserContext);
    const [nombre, setNombre] = useState(user?.nombre || '');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!user || !user.id) {
            alert("No se ha podido obtener el usuario");
            return;
        }
        try {
            await axiosInstance.put(`https://backend-proyecto-production-13fc.up.railway.app/api/users/name/${user.id}`, { nombre });
            alert("Nombre de usuario actualizado con éxito");
            setUser({ ...user, nombre }); // Update the UserContext
            navigate("/account");
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