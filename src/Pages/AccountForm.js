import React from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import UserInfo from './UserInfo';
import EditName from './EditName';
import EditEmail from './EditEmail';
import EditPassword from './EditPassword';
import fondo from '../assets/fondo.jpeg'; // Importa la imagen de fondo

const AccountForm = ({ user }) => {
    return (
        <div className="relative min-h-screen flex items-center justify-center bg-gray-100">
            {/* Imagen de fondo */}
            <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${fondo})` }}>
                <div className="absolute inset-0 bg-gray-900 opacity-50"></div> {/* Filtro oscuro */}
            </div>

            {/* Contenedor principal dividido en dos partes */}
            <div className="relative flex w-full max-w-6xl mx-auto z-10 bg-white rounded-3xl shadow-2xl">
                {/* Sección izquierda (perfil del usuario) */}
                <aside className="w-1/3 bg-gray-100 rounded-l-3xl p-8 flex flex-col items-center justify-center">
                    {/* Avatar en lugar de foto de perfil */}
                    <div className="w-32 h-32 bg-gray-300 rounded-full flex items-center justify-center mb-4">
                        <span className="text-4xl font-bold text-gray-700">A</span>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-700 mb-2">{user.nombre}</h2>
                    <p className="text-gray-500 mb-4">{user.rol === 4 ? 'Administrador' : 'Usuario'}</p>
                </aside>

                {/* Sección derecha (formulario de cuenta) */}
                <section className="w-2/3 p-10">
                    <h2 className="text-3xl font-bold text-gray-800 mb-6">Gestionar Cuenta</h2>

                    {/* Botones de edición */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                        <Link
                            to="edit-name"
                            className="block bg-blue-500 text-white py-3 rounded-lg shadow-md text-center font-semibold text-lg hover:bg-blue-600 transition duration-300"
                        >
                            Editar Usuario
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

                    {/* Formulario principal */}
                    <form className="grid grid-cols-1 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Usuario</label>
                            <input
                                type="text"
                                value={user.nombre}
                                readOnly
                                className="block w-full mt-1 p-3 border border-gray-300 rounded-md bg-gray-100"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Correo Electrónico</label>
                            <input
                                type="email"
                                value="tucorreo@ejemplo.com"
                                readOnly
                                className="block w-full mt-1 p-3 border border-gray-300 rounded-md bg-gray-100"
                            />
                        </div>

                        <div className="col-span-1">
                            <button
                                type="submit"
                                className="w-full py-3 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition duration-300"
                            >
                                Actualizar
                            </button>
                        </div>
                    </form>

                    {/* Rutas de edición */}
                    <Routes>
                        <Route path="edit-name" element={<EditName user={user} />} />
                        <Route path="edit-email" element={<EditEmail user={user} />} />
                        <Route path="edit-password" element={<EditPassword user={user} />} />
                    </Routes>
                </section>
            </div>
        </div>
    );
};

export default AccountForm;
