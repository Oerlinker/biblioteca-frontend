import React from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import UserInfo from './UserInfo';
import EditName from './EditName';
import EditEmail from './EditEmail';
import EditPassword from './EditPassword';

const AccountForm = ({ user }) => {
    return (
        <div className="max-w-xl mx-auto p-6 bg-white rounded shadow-lg space-y-6">
            <h2 className="text-2xl font-bold text-gray-700 mb-4">Gestionar Cuenta</h2>
            <UserInfo user={user} />
            <div className="space-y-4">
                <Link to="edit-name" className="block w-full bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600 text-center">
                    Editar Nombre
                </Link>
                <Link to="edit-email" className="block w-full bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600 text-center">
                    Editar Correo
                </Link>
                <Link to="edit-password" className="block w-full bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600 text-center">
                    Editar Contraseña
                </Link>
            </div>

            <Routes>
                <Route path="edit-name" element={<EditName user={user} />} />
                <Route path="edit-email" element={<EditEmail user={user} />} />
                <Route path="edit-password" element={<EditPassword user={user} />} />
            </Routes>
        </div>
    );
};

export default AccountForm;