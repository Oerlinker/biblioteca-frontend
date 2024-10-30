// src/components/Sidebar.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
    const [isCatalogOpen, setIsCatalogOpen] = useState(false);
    const [isUsersOpen, setIsUsersOpen] = useState(false);

    const toggleCatalog = () => setIsCatalogOpen(!isCatalogOpen);
    const toggleUsers = () => setIsUsersOpen(!isUsersOpen);

    return (
        <div className="w-64 bg-gray-800 text-white h-full fixed">
            <div className="p-4">
                <h2 className="text-2xl font-bold">Admin Panel</h2>
            </div>
            <nav className="mt-4">
                <button onClick={toggleCatalog} className="w-full text-left px-4 py-2 hover:bg-gray-700">
                    Modificar Catálogo
                </button>
                {isCatalogOpen && (
                    <div className="pl-4">
                        <Link to="/admin/modificar-catalogo/agregar-libro" className="block px-4 py-2 hover:bg-gray-700">Agregar Libro</Link>
                        <Link to="/admin/modificar-catalogo/obtener-libros" className="block px-4 py-2 hover:bg-gray-700">Obtener Libros</Link>
                        <Link to="/admin/modificar-catalogo/actualizar-libro" className="block px-4 py-2 hover:bg-gray-700">Actualizar Libro</Link>
                        <Link to="/admin/modificar-catalogo/eliminar-libro" className="block px-4 py-2 hover:bg-gray-700">Eliminar Libro</Link>
                        <Link to="/admin/modificar-catalogo/gestionar-autores" className="block px-4 py-2 hover:bg-gray-700">Gestionar Autores</Link>
                        <Link to="/admin/modificar-catalogo/gestionar-editoriales" className="block px-4 py-2 hover:bg-gray-700">Gestionar Editoriales</Link>
                        <Link to="/admin/modificar-catalogo/gestionar-categorias" className="block px-4 py-2 hover:bg-gray-700">Gestionar Categorias</Link>
                        <Link to="/admin/modificar-catalogo/gestionar-ediciones" className="block px-4 py-2 hover:bg-gray-700">Gestionar Ediciones</Link>
                        <Link to="/admin/modificar-catalogo/gestionar-proveedores" className="block px-4 py-2 hover:bg-gray-700">Gestionar Proveedores</Link>
                    </div>
                )}
                <button onClick={toggleUsers} className="w-full text-left px-4 py-2 hover:bg-gray-700">
                    Administrar Usuarios
                </button>
                {isUsersOpen && (
                    <div className="pl-4">
                        <Link to="/admin/administrar-usuarios/getall-usuarios" className="block px-4 py-2 hover:bg-gray-700">Get All Usuarios</Link>
                        <Link to="/admin/administrar-usuarios/administrar-roles" className="block px-4 py-2 hover:bg-gray-700">Administrar Roles</Link>
                        <Link to="/admin/administrar-usuarios/activity-log" className="block px-4 py-2 hover:bg-gray-700">Activity Log</Link>
                    </div>
                )}
            </nav>
        </div>
    );
};

export default Sidebar;