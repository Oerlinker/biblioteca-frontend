import React, { useState, useContext, useEffect } from 'react';
import axiosInstance from "../components/axiosInstance";
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../UserContext';

const EditMembersDireccion = () => {
    const { user, setUser } = useContext(UserContext);
    const [direccion, setDireccion] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            setDireccion(user.direccion || '');
        }
    }, [user]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!user || !user.id) {
            alert("No se ha podido obtener el usuario");
            return;
        }
        try {
            await axiosInstance.put(`/users/members/direccion/${user.miembroid}`, { direccion });

            alert("Dirección actualizada con éxito");
            setUser({ ...user, direccion });
            navigate("/update-members");
        } catch (error) {
            console.error('Error actualizando la dirección:', error);
            alert("Hubo un problema al actualizar los datos de la membresia");
        }
    };

    if (!user) {
        return <p>Cargando...</p>;
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label className="block text-sm font-medium text-gray-700">Dirección:</label>
                <input
                    className="block w-full p-2 border border-gray-300 rounded"
                    type="text"
                    value={direccion}
                    onChange={(e) => setDireccion(e.target.value)}
                    placeholder="Escribe nueva dirección"
                />
            </div>
            <button type="submit" className="w-full bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600">Actualizar</button>
        </form>
    );
};

export default EditMembersDireccion;