import React from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import UserInfo from './UserInfo';
import EditName from './EditName';
import EditEmail from './EditEmail';
import EditPassword from './EditPassword';
import fondo from '../assets/fondo.jpeg'; // Importa la imagen de fondo

const AccountForm = ({ user }) => {
    return (
        <div className="relative min-h-screen flex items-center justify-center bg-gray-900">
            {/* Imagen de fondo */}
            <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${fondo})` }}>
                <div className="absolute inset-0 bg-gray-900 opacity-60"></div> {/* Filtro oscuro */}
            </div>

            {/* Formulario */}
            <div className="relative bg-white p-12 rounded-2xl shadow-2xl w-full max-w-3xl space-y-8 z-10">
                <h2 className="text-4xl font-extrabold text-gray-800 mb-6 text-center">Gestionar Cuenta</h2>
                <UserInfo user={user} />
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Link
                        to="edit-name"
                        className="block bg-blue-500 text-white py-3 rounded-lg shadow-md text-center font-semibold text-lg hover:bg-blue-600 transition duration-300"
                    >
                        Editar Nombre
                    </Link>
                    <Link
                        to="edit-email"
                        className="block bg-blue-500 text-white py-3 rounded-lg shadow-md text-center font-semibold text-lg hover:bg-blue-600 transition duration-300"
                    >
                        Editar Correo
                    </Link>
                    <Link
                        to="edit-password"
                        className="block bg-blue-500 text-white py-3 rounded-lg shadow-md text-center font-semibold text-lg hover:bg-blue-600 transition duration-300"
                    >
                        Editar Contraseña
                    </Link>
                </div>

                <Routes>
                    <Route path="edit-name" element={<EditName user={user} />} />
                    <Route path="edit-email" element={<EditEmail user={user} />} />
                    <Route path="edit-password" element={<EditPassword user={user} />} />
                </Routes>
            </div>
        </div>
    );
};

export default AccountForm;
