import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
    const [isUsersOpen, setIsUsersOpen] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleUsers = () => setIsUsersOpen(!isUsersOpen);
    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

    return (
        <div>
            <button onClick={toggleSidebar} className="p-4 bg-gray-800 text-white fixed top-0 left-0 z-50">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
                </svg>
            </button>
            <div className={`fixed top-0 left-0 h-full bg-gray-800 text-white z-40 transition-transform transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} overflow-y-auto`}>
                <div className="p-4">
                    <h2 className="text-2xl font-bold">Panel</h2>
                </div>
                <nav className="mt-4">
                    <Link to="/admin/agregar-libro" className="block px-4 py-2 hover:bg-gray-700">Agregar Libro</Link>
                    <Link to="/admin/obtener-libros" className="block px-4 py-2 hover:bg-gray-700">Obtener Libros</Link>
                    <Link to="/admin/actualizar-libro" className="block px-4 py-2 hover:bg-gray-700">Actualizar Libro</Link>
                    <Link to="/admin/eliminar-libro" className="block px-4 py-2 hover:bg-gray-700">Eliminar Libro</Link>
                    <Link to="/admin/gestionar-autores" className="block px-4 py-2 hover:bg-gray-700">Gestionar Autores</Link>
                    <Link to="/admin/gestionar-editoriales" className="block px-4 py-2 hover:bg-gray-700">Gestionar Editoriales</Link>
                    <Link to="/admin/gestionar-categorias" className="block px-4 py-2 hover:bg-gray-700">Gestionar Categorias</Link>
                    <Link to="/admin/gestionar-ediciones" className="block px-4 py-2 hover:bg-gray-700">Gestionar Ediciones</Link>
                    <Link to="/admin/gestionar-proveedores" className="block px-4 py-2 hover:bg-gray-700">Gestionar Proveedores</Link>
                    <button onClick={toggleUsers} className="w-full text-left px-4 py-2 hover:bg-gray-700">
                        Administrar Usuarios
                    </button>
                    {isUsersOpen && (
                        <div className="pl-4">
                            <Link to="/admin/administrar-usuarios/getall-usuarios" className="block px-4 py-2 hover:bg-gray-700">Get All Usuarios</Link>
                            <Link to="/admin/administrar-usuarios/administrar-roles" className="block px-4 py-2 hover:bg-gray-700">Administrar Roles</Link>
                            <Link to="/admin/administrar-usuarios/activity-log" className="block px-4 py-2 hover:bg-gray-700">Activity Log</Link>
                            <Link to="/admin/administrar-usuarios/administrar-miembros" className="block px-4 py-2 hover:bg-gray-700">Administrar Miembros</Link>
                        </div>
                    )}
                </nav>
            </div>
        </div>
    );
};

export default Sidebar;