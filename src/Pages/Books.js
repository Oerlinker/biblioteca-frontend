import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Books = () => {
    const [books, setBooks] = useState([]);
    const [autores, setAutores] = useState([]);
    const [editoriales, setEditoriales] = useState([]);
    const [categorias, setCategorias] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategoria, setSelectedCategoria] = useState('');

    useEffect(() => {
        fetchCategorias();
        fetchLibros();
        fetchAutores();
        fetchEditoriales();
    }, []);

    const handleSearch = useCallback(async () => {
        try {
            const response = await axios.get('https://backend-proyecto-production-13fc.up.railway.app/api/search', {
                params: {
                    search: searchQuery,
                    categoriaid: selectedCategoria
                }
            });
            setBooks(response.data);
        } catch (error) {
            console.error('Error buscando los libros:', error);
        }
    }, [searchQuery, selectedCategoria]);

    useEffect(() => {
        handleSearch();
    }, [handleSearch]);

    const fetchCategorias = async () => {
        try {
            const response = await axios.get('https://backend-proyecto-production-13fc.up.railway.app/api/categorias');
            setCategorias(response.data);
        } catch (error) {
            console.error('Error obteniendo las categorías:', error);
        }
    };

    const fetchLibros = async () => {
        try {
            const response = await axios.get('https://backend-proyecto-production-13fc.up.railway.app/api/libros');
            setBooks(response.data);
        } catch (error) {
            console.error('Error obteniendo los libros:', error);
        }
    };

    const fetchAutores = async () => {
        try {
            const response = await axios.get('https://backend-proyecto-production-13fc.up.railway.app/api/autores');
            setAutores(response.data);
        } catch (error) {
            console.error('Error obteniendo los autores:', error);
        }
    };

    const fetchEditoriales = async () => {
        try {
            const response = await axios.get('https://backend-proyecto-production-13fc.up.railway.app/api/editoriales');
            setEditoriales(response.data);
        } catch (error) {
            console.error('Error obteniendo las editoriales:', error);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <h2 className="text-3xl font-bold text-center mb-6 text-gray-700">Catálogo de Libros</h2>

            {/* Search and Filter Controls */}
            <div className="flex flex-col md:flex-row justify-center items-center mb-6 space-y-4 md:space-y-0 md:space-x-4 w-full max-w-5xl mx-auto">
                <select
                    value={selectedCategoria}
                    onChange={(e) => setSelectedCategoria(e.target.value)}
                    className="border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full md:w-1/3"
                >
                    <option value="">Todas las categorías</option>
                    {categorias.map((categoria) => (
                        <option key={categoria.categoriaid} value={categoria.categoriaid}>
                            {categoria.nombre_categoria}
                        </option>
                    ))}
                </select>
                <div className="flex w-full md:w-2/3">
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Buscar libro por título..."
                        className="border border-gray-300 rounded-md py-2 px-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
            </div>

            {/* Display Books in a Responsive Grid */}
            {books.length > 0 ? (
                <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
                    {books.map((book) => (
                        <li key={book.libroid} className="bg-white border p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col justify-between">
                            <div>
                                <h3 className="text-xl font-semibold text-gray-700">{book.titulo}</h3>
                                <p className="text-gray-600 mt-1">
                                    <strong>Autor:</strong> {autores.find(a => a.autorid === book.autorid)?.nombre || 'Desconocido'}
                                </p>
                                <p className="text-gray-600">
                                    <strong>Editorial:</strong> {editoriales.find(e => e.editorialid === book.editorialid)?.nombre_editorial || 'Desconocida'}
                                </p>
                                <p className="text-gray-600">
                                    <strong>Categoría:</strong> {categorias.find(c => c.categoriaid === book.categoriaid)?.nombre_categoria || 'General'}
                                </p>
                            </div>
                            <Link to={`/libro/${book.libroid}`} className="text-blue-500 mt-4 block text-center hover:underline">
                                Ver detalles
                            </Link>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="text-center text-gray-500 mt-8">No se encontraron libros.</p>
            )}
        </div>
    );
};

export default Books;
