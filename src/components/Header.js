import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Header = ({ isLoggedIn, user, handleLogout }) => {
    const navigate = useNavigate();

    const handleLogoutAndRedirect = () => {
        handleLogout();
        navigate('/');
    };

    console.log("Rol del usuario:", user.rol);

    return (
        <header className="bg-blue-500 text-white px-6 py-4 shadow-lg">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold tracking-wide">Biblioteca Alejandría</h1>
                <nav className="flex items-center space-x-6">
                    {isLoggedIn ? (
                        <>
                            {user.rol !== 4 && (
                                <Link to="/books" className="text-white font-medium hover:underline">
                                    Libros
                                </Link>
                            )}
                            <span className="text-lg font-semibold text-white">
                                Bienvenido, {user.nombre}
                            </span>
                            <Link to="/account" className="text-white font-medium hover:underline">
                                Gestionar Cuenta
                            </Link>
                            {user.rol === 4 && (
                                <Link to="/admin" className="text-white font-medium hover:underline">
                                    Administrar
                                </Link>
                            )}
                            <button
                                onClick={handleLogoutAndRedirect}
                                className="ml-4 px-4 py-2 border border-white rounded-md text-white font-semibold bg-transparent hover:bg-gray-200 hover:text-blue-500 transition duration-300"
                            >
                                Cerrar Sesión
                            </button>
                        </>
                    ) : (
                        <div className="flex space-x-6">
                            <Link
                                to="/login"
                                className="text-white font-medium hover:underline"
                            >
                                Iniciar Sesión
                            </Link>
                            <Link
                                to="/register"
                                className="text-white font-medium hover:underline"
                            >
                                Crear Cuenta
                            </Link>
                        </div>
                    )}
                </nav>
            </div>
        </header>
    );
};

export default Header;
