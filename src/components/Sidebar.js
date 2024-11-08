import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
    const [isUsersOpen, setIsUsersOpen] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleUsers = () => setIsUsersOpen(!isUsersOpen);
    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

    return (
        <div className="flex">
            <button onClick={toggleSidebar} className="p-4 bg-gray-800 text-white fixed top-0 left-0 z-50 lg:hidden">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
                </svg>
            </button>

            <div className={`fixed top-0 left-0 h-full ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 z-40 transition-transform transform w-64 px-4 py-8 overflow-y-auto bg-white border-r dark:bg-gray-900 dark:border-gray-700`}>
                <div className="flex items-center justify-between">
                    <button className="text-left">
                        <img className="w-auto h-6 sm:h-7" src="https://merakiui.com/images/logo.svg" alt="Logo" />
                    </button>
                    <button onClick={toggleSidebar} className="lg:hidden p-2 text-gray-600 dark:text-gray-300">
                        ×
                    </button>
                </div>

                <div className="relative mt-6">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                        <svg className="w-5 h-5 text-gray-400" viewBox="0 0 24 24" fill="none">
                            <path d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                        </svg>
                    </span>
                    <input type="text" className="w-full py-2 pl-10 pr-4 text-gray-700 bg-white border rounded-md dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring" placeholder="Search" />
                </div>

                <nav className="flex flex-col justify-between flex-1 mt-6 space-y-2">
                    <Link to="/admin/agregar-libro" className="flex items-center px-4 py-2 text-gray-600 transition-colors duration-300 transform rounded-md dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700">
                        <span className="mx-4 font-medium">Gestionar Catálogo</span>
                    </Link>
                    <Link to="/admin/gestionar-autores" className="flex items-center px-4 py-2 text-gray-600 transition-colors duration-300 transform rounded-md dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700">
                        <span className="mx-4 font-medium">Gestionar Autores</span>
                    </Link>
                    <Link to="/admin/gestionar-editoriales" className="flex items-center px-4 py-2 text-gray-600 transition-colors duration-300 transform rounded-md dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700">
                        <span className="mx-4 font-medium">Gestionar Editoriales</span>
                    </Link>
                    <Link to="/admin/gestionar-categorias" className="flex items-center px-4 py-2 text-gray-600 transition-colors duration-300 transform rounded-md dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700">
                        <span className="mx-4 font-medium">Gestionar Categorías</span>
                    </Link>
                    <Link to="/admin/gestionar-ediciones" className="flex items-center px-4 py-2 text-gray-600 transition-colors duration-300 transform rounded-md dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700">
                        <span className="mx-4 font-medium">Gestionar Ediciones</span>
                    </Link>
                    <Link to="/admin/gestionar-proveedores" className="flex items-center px-4 py-2 text-gray-600 transition-colors duration-300 transform rounded-md dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700">
                        <span className="mx-4 font-medium">Gestionar Proveedores</span>
                    </Link>
                    <button onClick={toggleUsers} className="flex items-center w-full px-4 py-2 text-gray-600 transition-colors duration-300 transform rounded-md dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700">
                        <span className="mx-4 font-medium">Administrar Usuarios</span>
                    </button>
                    {isUsersOpen && (
                        <div className="pl-8 space-y-2">
                            <Link to="/admin/administrar-usuarios/getall-usuarios" className="block px-4 py-2 text-gray-600 rounded-md dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-700 dark:hover:text-gray-200">Get All Usuarios</Link>
                            <Link to="/admin/administrar-usuarios/administrar-roles" className="block px-4 py-2 text-gray-600 rounded-md dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-700 dark:hover:text-gray-200">Administrar Roles</Link>
                            <Link to="/admin/administrar-usuarios/activity-log" className="block px-4 py-2 text-gray-600 rounded-md dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-700 dark:hover:text-gray-200">Activity Log</Link>
                            <Link to="/admin/administrar-usuarios/administrar-miembros" className="block px-4 py-2 text-gray-600 rounded-md dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-700 dark:hover:text-gray-200">Administrar Miembros</Link>
                        </div>
                    )}
                </nav>
            </div>
        </div>
    );
};

export default Sidebar;