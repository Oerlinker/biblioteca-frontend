import React from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import GetAllUsuarios from './GetAllUsuarios';
import AdministrarRoles from './AdministrarRoles';
import Bitacora from './Bitacora';

const AdministrarUsuarios = () => {
    return (
        <div className="max-w-xl mx-auto p-6 bg-white rounded shadow-lg space-y-6">
            <h2 className="text-2xl font-bold text-gray-700 mb-4">Administrar Usuarios</h2>
            <div className="space-y-4">
                <Link to="getall-usuarios" className="block w-full bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600 text-center">
                    Ver Todos los Usuarios
                </Link>
                <Link to="administrar-roles" className="block w-full bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600 text-center">
                    Administrar Roles
                </Link>
                <Link to="bitacora" className="block w-full bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600 text-center">
                    Ver Bitácora
                </Link>
            </div>

            <Routes>
                <Route path="getall-usuarios" element={<GetAllUsuarios />} />
                <Route path="administrar-roles" element={<AdministrarRoles />} />
                <Route path="bitacora" element={<Bitacora />} />
            </Routes>
        </div>
    );
};

export default AdministrarUsuarios;