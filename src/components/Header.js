import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../UserContext';

const Header = ({ handleLogout }) => {
    const { isLoggedIn, user } = useContext(UserContext);
    const navigate = useNavigate();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const handleLogoutAndRedirect = () => {
        handleLogout();
        navigate('/');
    };

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    return (
        <header className="bg-blue-500 text-white px-6 py-4 shadow-lg">
            <div className="container mx-auto flex justify-between items-center">
                <Link to="/" className="text-2xl font-bold tracking-wide">Biblioteca Alejandría</Link>
                {isLoggedIn ? (
                    <div className="relative">
                        <button onClick={toggleDropdown} className="text-lg font-semibold text-white focus:outline-none">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
                            </svg>
                        </button>
                        {isDropdownOpen && (
                            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-2 z-20">
                                <Link to="/" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">Home</Link>
                                <Link to="/account" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">Gestionar Cuenta</Link>
                                <Link to="/books" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">Books</Link>
                                {user.rol === 2 && (
                                    <Link to="/gestionar-prestamos" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">Gestión de Préstamos</Link>
                                )}
                                {user.rol === 1 && (
                                    <Link to="/subscription" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">Suscripción</Link>
                                )}
                                <button
                                    onClick={handleLogoutAndRedirect}
                                    className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-200"
                                >
                                    Cerrar Sesión
                                </button>
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="flex space-x-4">
                        <Link to="/login" className="text-white font-medium hover:underline">Iniciar Sesión</Link>
                        <Link to="/register" className="text-white font-medium hover:underline">Crear Cuenta</Link>
                    </div>
                )}
            </div>
        </header>
    );
};

export default Header;