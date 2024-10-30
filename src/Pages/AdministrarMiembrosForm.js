import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdministrarMiembrosForm = () => {
    const [miembros, setMiembros] = useState([]);

    useEffect(() => {
        const fetchMiembros = async () => {
            try {
                const response = await axios.get('https://backend-proyecto-production-13fc.up.railway.app/api/users/members');
                setMiembros(response.data);
            } catch (error) {
                console.error('Error fetching members:', error);
            }
        };

        fetchMiembros();
    }, []);

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white rounded shadow-lg space-y-6">
            <h2 className="text-2xl font-bold text-gray-700 mb-4">Administrar Miembros</h2>
            {miembros.length > 0 ? (
                <ul className="space-y-4">
                    {miembros.map((miembro) => (
                        <li key={miembro.id} className="p-4 border rounded shadow">
                            <p><strong>Nombre:</strong> {miembro.nombre}</p>
                            <p><strong>Correo:</strong> {miembro.correo}</p>
                            <p><strong>Rol:</strong> {miembro.registro}</p>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="text-center text-gray-500">No se encontraron miembros.</p>
            )}
        </div>
    );
};

export default AdministrarMiembrosForm;