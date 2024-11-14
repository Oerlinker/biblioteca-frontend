import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../assets/logo.png';

const Sidebar = () => {

    const [isAdminOpen, setIsAdminOpen] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    const toggleAdminMenu = () => setIsAdminOpen(!isAdminOpen);


    const adminLinks = [
        { name: "CU:8 Administrar Catalogo", path: "/admin/agregar-libro" },
        { name: "CU:8 Administrar Autores", path: "/admin/gestionar-autores" },
        { name: "CU:8 Administrar Editoriales", path: "/admin/gestionar-editoriales" },
        { name: "CU:8 Administrar Categorias", path: "/admin/gestionar-categorias" },
        { name: "CU:8 Administrar Ediciones", path: "/admin/gestionar-ediciones" },
        { name: "CU:11&12 Infor/Administrar Proveedores", path: "/admin/gestionar-proveedores" },
        { name: "Reporte de Usuario", path: "/admin/administrar-usuarios/getall-usuarios" },
        { name: "CU:9 Administrar Miembros", path: "/admin/administrar-usuarios/administrar-roles" },
        { name: "CU:10 Generar Reporte De Uso", path: "/admin/administrar-usuarios/activity-log" },
        { name: "Reporte de Miembros", path: "/admin/administrar-usuarios/administrar-miembros" },
    ];

    return (
        <div
            className={`fixed top-0 left-0 h-full z-40 transition-all duration-300 ease-in-out transform ${
                isHovered ? 'w-64' : 'w-16'
            } bg-gray-900 text-white border-r border-gray-700`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className="flex items-center justify-center p-4">
                <img className="w-8 h-8" src={Logo} alt="Logo" />
            </div>

            {/* Barra de búsqueda, oculta cuando el sidebar está contraído */}
            <div className={`relative mt-6 ${isHovered ? 'block' : 'hidden'}`}>
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                    <svg className="w-5 h-5 text-gray-400" viewBox="0 0 24 24" fill="none">
                        <path d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                    </svg>
                </span>
                <input
                    type="text"
                    placeholder="Search"
                    className="w-full py-2 pl-10 pr-4 text-gray-700 bg-gray-800 border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring"
                />
            </div>

            {/* Menú principal */}
            <nav className="flex flex-col mt-6 space-y-2">
                {/* Botón de Administración */}
                <button
                    onClick={toggleAdminMenu}
                    className="flex items-center w-full px-4 py-2 text-gray-400 transition-colors duration-300 transform rounded-md hover:bg-gray-700 hover:text-white"
                >
                    <span className="mx-4 font-medium">Administración</span>
                    <svg
                        className={`w-5 h-5 ml-auto transform transition-transform duration-300 ${isAdminOpen ? 'rotate-90' : ''
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                    </svg>
                </button>

                {/* Links de Administración, solo visibles cuando isAdminOpen es true */}
                {isAdminOpen && (
                    <div className="pl-8 space-y-2">
                        {adminLinks.map((link) => (
                            <Link
                                key={link.name}
                                to={link.path}
                                className="block px-4 py-2 text-gray-400 rounded-md hover:bg-gray-700 hover:text-white"
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>
                )}
            </nav>
        </div>
    );
};

export default Sidebar;