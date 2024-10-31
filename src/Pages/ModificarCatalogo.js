import React from 'react';
import { Link, Route, Routes, useNavigate } from 'react-router-dom';

import AutorForm from "./autorForm";
import EditorialForm from "./EditorialForm";
import CategoriaForm from "./CategoriaForm";
import EdicionesForm from "./EdicionesForm";
import ProveedorForm from "./ProveedorForm";
import BookCrud from '../components/BookCrud';

const ModificarCatalogo = () => {
    const navigate = useNavigate();

    return (
        <div className="max-w-xl mx-auto p-6 bg-white rounded shadow-lg space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-700 mb-4">Modificar Catálogo</h2>
                <button
                    onClick={() => navigate('/admin')}
                    className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
                >
                    &larr; Volver
                </button>
            </div>
            <div className="space-y-4">
                <Link to="agregar-libro" className="block w-full bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600 text-center">
                    Agregar Libro
                </Link>
                <Link to="obtener-libros" className="block w-full bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600 text-center">
                    Obtener Libros
                </Link>
                <Link to="actualizar-libro" className="block w-full bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600 text-center">
                    Actualizar Libro
                </Link>
                <Link to="eliminar-libro" className="block w-full bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600 text-center">
                    Eliminar Libro
                </Link>
                <Link to="gestionar-autores" className="block w-full bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600 text-center">
                    Gestionar Autores
                </Link>
                <Link to="gestionar-editoriales" className="block w-full bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600 text-center">
                    Gestionar Editoriales
                </Link>
                <Link to="gestionar-categorias" className="block w-full bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600 text-center">
                    Gestionar Categorias
                </Link>
                <Link to="gestionar-ediciones" className="block w-full bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600 text-center">
                    Gestionar Ediciones
                </Link>
                <Link to="gestionar-proveedores" className="block w-full bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600 text-center">
                    Gestionar Proveedores
                </Link>
            </div>

            <Routes>
                <Route path="agregar-libro" element={<BookCrud />} />
                <Route path="gestionar-autores" element={<AutorForm />} />
                <Route path="gestionar-editoriales" element={<EditorialForm />} />
                <Route path="gestionar-categorias" element={<CategoriaForm />} />
                <Route path="gestionar-ediciones" element={<EdicionesForm />} />
                <Route path="gestionar-proveedores" element={<ProveedorForm />} />
            </Routes>
        </div>
    );
};

export default ModificarCatalogo;