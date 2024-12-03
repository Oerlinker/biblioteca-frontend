import React, { useState, useContext, useEffect } from 'react';
import axiosInstance from "../components/axiosInstance";
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../UserContext';

const EditMembersCarrera = () => {
    const { user, setUser } = useContext(UserContext);
    const [carrera, setCarrera] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            setCarrera(user.carrera || '');
        }
    }, [user]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!user || !user.id) {
            alert("No se ha podido obtener el usuario");
            return;
        }
        try {
            await axiosInstance.put(`/users/members/carrera/${user.miembroid}`, { carrera });
            alert("Carrera actualizada con éxito");
            setUser({ ...user, carrera });
            navigate("/update-members");
        } catch (error) {
            console.error('Error actualizando la carrera:', error);
            alert("Hubo un problema al actualizar los datos de la membresia");
        }
    };

    if (!user) {
        return <p>Cargando...</p>;
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label className="block text-sm font-medium text-gray-700">Carrera:</label>
                <input
                    className="block w-full p-2 border border-gray-300 rounded"
                    type="text"
                    value={carrera}
                    onChange={(e) => setCarrera(e.target.value)}
                    placeholder="Escribe nueva carrera"
                />
            </div>
            <button type="submit" className="w-full bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600">Actualizar</button>
        </form>
    );
};

export default EditMembersCarrera;