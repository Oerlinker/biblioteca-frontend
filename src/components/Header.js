import React, { useContext, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../UserContext';
import axios from 'axios';
import './header.css';

const Header = ({ handleLogout }) => {
    const { isLoggedIn, user, setUser } = useContext(UserContext);
    const navigate = useNavigate();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        if (isLoggedIn) {
            axios.get(`https://backend-proyecto-production-13fc.up.railway.app/api/users/${user.id}`)
                .then(response => {
                    setUser(response.data);
                })
                .catch(error => {
                    console.error('Error fetching user data:', error);
                });
        }
    }, [isLoggedIn, user.id, setUser]);

    const handleLogoutAndRedirect = () => {
        handleLogout();
        navigate('/');
    };

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <header className="bg-blue-600 text-white px-6 py-4 shadow-md relative">
            <div className="container mx-auto flex justify-between items-center">
                <nav className="hidden md:flex space-x-4 mx-auto">
                    <Link to="/" className="hover:text-gray-200">Home</Link>
                    <Link to="/books" className="hover:text-gray-200">Books</Link>
                    {isLoggedIn && user.rol === 4 && (
                        <Link to="/gestionar-prestamo" className="hover:text-gray-200">Gestión de Préstamos</Link>
                    )}
                    {isLoggedIn && user.rol === 2 && (
                        <Link to="/gestionar-prestamos" className="hover:text-gray-200">Gestión de Préstamos</Link>
                    )}
                    {isLoggedIn && user.rol === 1 && !user.isSubscribed && (
                        <Link to="/subscription" className="hover:text-gray-200">Suscripción</Link>
                    )}
                </nav>

                <div className="hidden md:flex items-center space-x-4 relative">
                    {isLoggedIn ? (
                        <>
                            <button onClick={toggleDropdown} className="hover:text-gray-200 font-semibold focus:outline-none flex items-center">
                                {user.nombre} <span className="ml-2 text-sm">&#9662;</span>
                            </button>
                            {isDropdownOpen && (
                                <div className="absolute right-0 mt-8 w-48 bg-white text-gray-800 rounded-md shadow-lg py-2 z-20" style={{ top: '100%' }}>
                                    <Link to="/account" className="block px-4 py-2 hover:bg-gray-100">Gestionar Cuenta</Link>
                                    <button
                                        onClick={handleLogoutAndRedirect}
                                        className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                                    >
                                        Cerrar Sesión
                                    </button>
                                </div>
                            )}
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="hover:underline">Iniciar Sesión</Link>
                            <Link to="/register" className="hover:underline">Crear Cuenta</Link>
                        </>
                    )}
                </div>

                <button onClick={toggleMenu} className="md:hidden focus:outline-none ml-auto">
                    <span className="text-xl font-semibold">Menu</span>
                </button>

                {isMenuOpen && (
                    <div className="absolute top-16 right-0 w-3/4 bg-blue-700 text-white shadow-lg md:hidden">
                        <nav className="flex flex-col p-4 space-y-4">
                            <Link to="/" onClick={toggleMenu} className="hover:text-gray-300">Home</Link>
                            <Link to="/books" onClick={toggleMenu} className="hover:text-gray-300">Books</Link>
                            {isLoggedIn && user.rol === 4 && (
                                <Link to="/gestionar-prestamo" onClick={toggleMenu} className="hover:text-gray-300">Gestión de Préstamos</Link>
                            )}
                            {isLoggedIn && user.rol === 2 && (
                                <Link to="/gestionar-prestamos" onClick={toggleMenu} className="hover:text-gray-300">Gestión de Préstamos</Link>
                            )}
                            {isLoggedIn && user.rol === 1 && !user.isSubscribed && (
                                <Link to="/subscription" onClick={toggleMenu} className="hover:text-gray-300">Suscripción</Link>
                            )}
                            {isLoggedIn ? (
                                <>
                                    <Link to="/account" onClick={toggleMenu} className="hover:text-gray-300">Gestionar Cuenta</Link>
                                    <button
                                        onClick={() => {
                                            handleLogoutAndRedirect();
                                            toggleMenu();
                                        }}
                                        className="text-left hover:text-gray-300"
                                    >
                                        Cerrar Sesión
                                    </button>
                                </>
                            ) : (
                                <>
                                    <Link to="/login" onClick={toggleMenu} className="hover:underline">Iniciar Sesión</Link>
                                    <Link to="/register" onClick={toggleMenu} className="hover:underline">Crear Cuenta</Link>
                                </>
                            )}
                        </nav>
                    </div>
                )}
            </div>
        </header>
    );
};

export default Header;