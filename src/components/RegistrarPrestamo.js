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
        <header className="bg-blue-500 text-white px-4 py-2 flex justify-between items-center">
            <h1 className="text-lg font-bold">Biblioteca Alejandria</h1>
            <nav className="flex items-center space-x-4">

                {isLoggedIn ? (
                    <>
                        {user.rol !== 4 && (
                            <Link to="/books" className="text-white hover:underline">Libros</Link>
                        )}
                        <span className="mr-4">Bienvenido, {user.nombre}</span>
                        <Link to="/account" className="mr-4 text-white hover:underline">Gestionar Cuenta</Link>
                        {user.rol === 4 && (
                            <Link to="/admin" className="text-white hover:underline">Administrar</Link>
                        )}
                        <button
                            onClick={handleLogoutAndRedirect}
                            className="border border-white text-white px-4 py-2 rounded hover:bg-gray-200 hover:text-blue-500"
                        >
                            Cerrar Sesión
                        </button>
                    </>
                ) : (
                    <div className="flex space-x-4">
                        <Link to="/login">Iniciar Sesión</Link>
                        <Link to="/register">Crear Cuenta</Link>
                    </div>
                )}
            </nav>
        </header>
    );
};

export default Header;

