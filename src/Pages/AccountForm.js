import React, { useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../UserContext';

const AdminPanel = () => {
    const { user } = useContext(UserContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (user.rol !== 4) {
            navigate('/');
        }
    }, [user, navigate]);

    return (
        <div className="max-w-xl mx-auto p-6 bg-white rounded shadow-lg space-y-6">
            <h2 className="text-2xl font-bold text-gray-700 mb-4">Panel de Administración</h2>
            <div className="space-y-4">
                <Link to="/admin/modificar-catalogo" className="block w-full bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600 text-center">
                    Modificar Catálogo
                </Link>
                <Link to="/admin/administrar-usuarios" className="block w-full bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600 text-center">
                    Administrar Usuarios
                </Link>
            </div>
        </div>
    );
};

export default AdminPanel;
