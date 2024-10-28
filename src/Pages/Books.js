// src/Pages/Books.js
import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Books = () => {
    const [books, setLibros] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [categorias, setCategorias] = useState([]);
    const [selectedCategoria, setSelectedCategoria] = useState("");

    const fetchCategorias = async () => {
        try {
            const response = await axios.get('https://backend-proyecto-production-13fc.up.railway.app/api/categorias');
            setCategorias(response.data);
        } catch (error) {
            console.error('Error obteniendo las categorias:', error);
        }
    };

    useEffect(() => {
        fetchCategorias();
    }, []);

    const fetchLibros = useCallback(async () => {
        try {
            const response = await axios.get(`https://backend-proyecto-production-13fc.up.railway.app/api/search`, {
                params: {
                    search: searchQuery,
                    categoriaid: selectedCategoria
                }
            });
            setLibros(response.data);
        } catch (error) {
            console.error('Error obteniendo los libros:', error);
        }
    }, [searchQuery, selectedCategoria]);

    useEffect(() => {
        fetchLibros();
    }, [fetchLibros]);

    const handleGenreChange = (e) => {
        setSelectedCategoria(e.target.value);
        fetchLibros();
    };

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-3xl font-bold text-center mb-6">Buscar Libros</h2>

            <div className="flex justify-center mb-4">
                <select
                    value={selectedCategoria}
                    onChange={handleGenreChange}
                    className="border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 w-80"
                >
                    <option value="">Todas las categorías</option>
                    {categorias.map((categoria) => (
                        <option key={categoria.categoriaid} value={categoria.categoriaid}>
                            {categoria.nombre_categoria}
                        </option>
                    ))}
                </select>
            </div>

            <div className="flex justify-center mb-6">
                <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Buscar libro..."
                    className="border border-gray-300 rounded-md py-2 px-4 w-80 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                    onClick={fetchLibros}
                    className="ml-2 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
                >
                    Buscar
                </button>
            </div>

            {books.length > 0 ? (
                <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {books.map((book) => (
                        <li key={book.libroid} className="border p-4 rounded-md shadow-md hover:shadow-lg transition-shadow duration-300">
                            <Link to={`/libro/${book.libroid}`} className="text-lg font-semibold text-blue-600 hover:underline">
                                {book.titulo}
                            </Link>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="text-center text-gray-500 mt-6">No se encontraron libros.</p>
            )}
        </div>
    );
};

export default Books;
