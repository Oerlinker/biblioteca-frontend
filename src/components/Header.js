import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../UserContext';

const Header = () => {
    const { isLoggedIn, user, setIsLoggedIn, setUser } = useContext(UserContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        setIsLoggedIn(false);
        setUser({});
        navigate('/');
    };

    return (
        <header className="bg-blue-500 text-white px-6 py-4 shadow-lg">
            <div className="container mx-auto flex flex-wrap justify-between items-center">
                <Link to="/" className="text-2xl font-bold tracking-wide">Biblioteca Alejandría</Link>
                <nav className="flex flex-wrap items-center space-x-6 mt-4 sm:mt-0">
                    {isLoggedIn ? (
                        <>
                            <span className="text-lg font-semibold text-white">Bienvenido, {user?.nombre}</span>
                            <Link to="/account" className="text-white font-medium hover:underline">Gestionar Cuenta</Link>
                            {user?.rol === 4 && (
                                <Link to="/admin" className="text-white font-medium hover:underline">Administrar</Link>
                            )}
                            {user?.rol === 1 && (
                                <Link to="/subscription" className="text-white font-medium hover:underline">Suscripción</Link>
                            )}
                            <Link to="/" className="text-white font-medium hover:underline ml-auto">Home</Link>
                            <Link to="/books" className="text-white font-medium hover:underline">Books</Link>
                            <button
                                onClick={handleLogout}
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
        </header>
    );
};

export default Header;
