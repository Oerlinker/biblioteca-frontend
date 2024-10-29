// src/components/Header.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Header = ({ isLoggedIn, user, handleLogout }) => {
    const navigate = useNavigate();

    const handleLogoutAndRedirect = () => {
        handleLogout();
        navigate('/');
    };

    return (
        <header className="bg-blue-500 text-white px-6 py-4 shadow-lg">
            <div className="container mx-auto flex flex-wrap justify-between items-center">
                <Link to="/" className="text-2xl font-bold tracking-wide">Biblioteca Alejandría</Link>
                <nav className="flex flex-wrap items-center space-x-6 mt-4 sm:mt-0">
                    {isLoggedIn ? (
                        <>
                            <span className="text-lg font-semibold text-white">Bienvenido, {user.nombre}</span>
                            <Link to="/account" className="text-white font-medium hover:underline">Gestionar Cuenta</Link>
                            {user.rol === 4 && (
                                <Link to="/admin" className="text-white font-medium hover:underline">Administrar</Link>
                            )}
                            {user.rol !== 2 && (
                                <Link to="/subscription" className="text-white font-medium hover:underline">Suscripción</Link>
                            )}
                            <Link to="/" className="text-white font-medium hover:underline ml-auto">Home</Link>
                            <Link to="/books" className="text-white font-medium hover:underline">Books</Link>
                            <button
                                onClick={handleLogoutAndRedirect}
                                className="px-4 py-2 border border-white rounded-md text-white font-semibold bg-transparent hover:bg-gray-200 hover:text-blue-500 transition duration-300"
                            >
                                Cerrar Sesión
                            </button>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="text-white font-medium hover:underline">Iniciar Sesión</Link>
                            <Link to="/register" className="text-white font-medium hover:underline">Crear Cuenta</Link>
                            <Link to="/" className="text-white font-medium hover:underline ml-auto">Home</Link>
                            <Link to="/books" className="text-white font-medium hover:underline">Books</Link>
                        </>
                    )}
                </nav>
            </div>
            <div className="flex items-center py-4 overflow-x-auto whitespace-nowrap">
                <a href="#" className="text-gray-600 dark:text-gray-200">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                    </svg>
                </a>

                <span className="mx-5 text-gray-500 dark:text-gray-300 rtl:-scale-x-100">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    </svg>
                </span>

                <a href="#" className="flex items-center text-gray-600 -px-2 dark:text-gray-200 hover:underline">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mx-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                    </svg>

                    <span className="mx-2">Account</span>
                </a>

                <span className="mx-5 text-gray-500 dark:text-gray-300 rtl:-scale-x-100">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    </svg>
                </span>

                <a href="#" className="flex items-center text-gray-600 -px-2 dark:text-gray-200 hover:underline">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mx-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
                    </svg>

                    <span className="mx-2">Profile</span>
                </a>

                <span className="mx-5 text-gray-500 dark:text-gray-300 rtl:-scale-x-100">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    </svg>
                </span>

                <a href="#" className="flex items-center text-blue-600 -px-2 dark:text-blue-400 hover:underline">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mx-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>

                    <span className="mx-2">Settings</span>
                </a>
            </div>
        </header>
    );
};

export default Header;
