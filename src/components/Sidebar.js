// Sidebar.js
import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../UserContext';
import ProtectedComponent from './protectedComponents';

const Sidebar = () => {
    const [isUsersOpen, setIsUsersOpen] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const { user } = useContext(UserContext);

    const toggleUsers = () => setIsUsersOpen(!isUsersOpen);
    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

    return (
        <ProtectedComponent user={user} requiredRole={4}>
            <div className="relative">

                {/* Botón de Menú para Pantallas Móviles */}
                <button
                    onClick={toggleSidebar}
                    className="p-4 bg-blue-600 text-white fixed top-0 left-0 z-50 md:hidden"
                >
                    {/* Icono de Menú  */}
                    <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M4 6h16M4 12h16m-7 6h7"
                        ></path>
                    </svg>
                </button>

                {/* Sidebar Desplegable */}
                <div
                    className={`fixed top-0 left-0 h-full bg-gray-800 text-white z-40 transition-transform transform ${
                        isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
                    } md:translate-x-0 md:flex md:flex-col md:w-64 overflow-y-auto`}
                >
                    {/* Encabezado del Sidebar con Botón de Cierre */}
                    <div className="p-4 flex items-center justify-between md:block">
                        <h2 className="text-2xl font-bold">Panel</h2>
                        {/* Botón de Cierre para el Sidebar en Móviles */}
                        <button
                            onClick={toggleSidebar}
                            className="md:hidden p-2 text-gray-300 hover:text-white"
                        >
                            ×
                        </button>
                    </div>

                    {/* Navegación del Sidebar */}
                    <nav className="mt-4">
                        <Link to="/admin/agregar-libro" className="block px-4 py-2 hover:bg-gray-700">
                            Gestionar Catálogo
                        </Link>
                        <Link to="/admin/gestionar-autores" className="block px-4 py-2 hover:bg-gray-700">
                            Gestionar Autores
                        </Link>
                        <Link to="/admin/gestionar-editoriales" className="block px-4 py-2 hover:bg-gray-700">
                            Gestionar Editoriales
                        </Link>
                        <Link to="/admin/gestionar-categorias" className="block px-4 py-2 hover:bg-gray-700">
                            Gestionar Categorias
                        </Link>
                        <Link to="/admin/gestionar-ediciones" className="block px-4 py-2 hover:bg-gray-700">
                            Gestionar Ediciones
                        </Link>
                        <Link to="/admin/gestionar-proveedores" className="block px-4 py-2 hover:bg-gray-700">
                            Gestionar Proveedores
                        </Link>
                        <button onClick={toggleUsers} className="w-full text-left px-4 py-2 hover:bg-gray-700">
                            Administrar Usuarios
                        </button>
                        {/* Submenú Desplegable para Administrar Usuarios */}
                        {isUsersOpen && (
                            <div className="pl-4">
                                <Link to="/admin/administrar-usuarios/getall-usuarios" className="block px-4 py-2 hover:bg-gray-700">
                                    Get All Usuarios
                                </Link>
                                <Link to="/admin/administrar-usuarios/administrar-roles" className="block px-4 py-2 hover:bg-gray-700">
                                    Administrar Roles
                                </Link>
                                <Link to="/admin/administrar-usuarios/activity-log" className="block px-4 py-2 hover:bg-gray-700">
                                    Activity Log
                                </Link>
                                <Link to="/admin/administrar-usuarios/administrar-miembros" className="block px-4 py-2 hover:bg-gray-700">
                                    Administrar Miembros
                                </Link>
                            </div>
                        )}
                    </nav>
                </div>
            </div>
        </ProtectedComponent>
    );
};

export default Sidebar;
