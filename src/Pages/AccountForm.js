import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../UserContext';
import UserInfo from './UserInfo';
import fondo from '../assets/fondo.jpeg';

const AccountForm = () => {
    const { user } = useContext(UserContext);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (user && Object.keys(user).length > 0) {
            setIsLoading(false);
        }
    }, [user]);

    return (
        <div className="relative min-h-screen flex items-center justify-center bg-gray-100">
            <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${fondo})` }}>
                <div className="absolute inset-0 bg-gray-900 opacity-60"></div>
            </div>

            <div className="relative flex w-full max-w-6xl mx-auto z-10 bg-white rounded-3xl shadow-2xl overflow-hidden">
                <aside className="w-1/3 bg-gray-100 p-8 flex flex-col items-center justify-center rounded-l-3xl">
                    {isLoading ? (
                        <p className="text-gray-600">Cargando información del usuario...</p>
                    ) : (
                        <UserInfo />
                    )}
                </aside>

                <section className="w-2/3 p-10 flex flex-col">
                    <h2 className="text-3xl font-bold text-gray-800 mb-6">Gestionar Cuenta</h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                        <Link
                            to="edit-name"
                            state={{ user }}
                            className="block bg-blue-500 text-white py-3 rounded-lg shadow-md text-center font-semibold text-lg hover:bg-blue-600 transition duration-300"
                        >
                            Editar Usuario
                        </Link>
                        <Link
                            to="edit-email"
                            state={{ user }}
                            className="block bg-blue-500 text-white py-3 rounded-lg shadow-md text-center font-semibold text-lg hover:bg-blue-600 transition duration-300"
                        >
                            Editar Correo
                        </Link>
                        <Link
                            to="edit-password"
                            state={{ user }}
                            className="block bg-blue-500 text-white py-3 rounded-lg shadow-md text-center font-semibold text-lg hover:bg-blue-600 transition duration-300"
                        >
                            Editar Contraseña
                        </Link>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default AccountForm;
