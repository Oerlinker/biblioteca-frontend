import React from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import BookForm from './BookForm';
import GetBooksForm from './GetBookForm';
import UpdateBookForm from './UpdateBookForms';
import DeleteBookForm from './DeleteBooksForm';
import AutorForm from "./autorForm";

const ModificarCatalogo = () => {
    return (
        <div className="max-w-xl mx-auto p-6 bg-white rounded shadow-lg space-y-6">
            <h2 className="text-2xl font-bold text-gray-700 mb-4">Modificar Catálogo</h2>
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
            </div>

            <Routes>
                <Route path="agregar-libro" element={<BookForm />} />
                <Route path="obtener-libros" element={<GetBooksForm />} />
                <Route path="actualizar-libro" element={<UpdateBookForm />} />
                <Route path="eliminar-libro" element={<DeleteBookForm />} />
                <Route path="gestionar-autores" element={<AutorForm />} />
            </Routes>
        </div>
    );
};

export default ModificarCatalogo;