import React, { useState, useEffect, useCallback, useContext } from 'react';
import axiosInstance from "../components/axiosInstance";
import { Link } from 'react-router-dom';
import { UserContext } from '../UserContext';

const Books = () => {
    const { user } = useContext(UserContext);
    const [books, setLibros] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [categorias, setCategorias] = useState([]);
    const [selectedCategoria, setSelectedCategoria] = useState("");
    const [showAdvanced, setShowAdvanced] = useState(false);
    const [autor, setAutor] = useState("");
    const [calificacion, setCalificacion] = useState("");
    const [isbn, setIsbn] = useState("");

    const fetchCategorias = async () => {
        try {
            const response = await axiosInstance.get('https://backend-proyecto-production-13fc.up.railway.app/api/categorias');
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
            setLibros([]);
            const response = await axiosInstance.get(`https://backend-proyecto-production-13fc.up.railway.app/api/search`, {
                params: {
                    search: searchQuery,
                    categoriaid: selectedCategoria || undefined,
                    autor: autor || undefined,
                    calificacion: calificacion || undefined,
                    isbn: isbn || undefined,
                }
            });
            setLibros(response.data);
        } catch (error) {
            console.error('Error obteniendo los libros:', error);
        }
    }, [searchQuery, selectedCategoria, autor, calificacion, isbn]);

    useEffect(() => {
        fetchLibros();
    }, [fetchLibros]);

    const toggleAdvancedSearch = () => setShowAdvanced(!showAdvanced);

    const addFavorito = async (libroid) => {
        try {
            await axiosInstance.post('/users/favoritos', { usuarioid: user.id, libroid });
            alert('Libro añadido a favoritos');
        } catch (error) {
            console.error('Error añadiendo a favoritos:', error);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center px-4 py-8 min-h-screen bg-gray-50">
            <h2 className="text-2xl md:text-4xl font-semibold text-center mb-8 text-blue-700">Busca tu próximo libro</h2>

            {/* Filtros y barra de búsqueda */}
            <div className="flex flex-col items-center gap-4 w-full max-w-md">
                <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Buscar libro por título"
                    className="w-full border border-gray-300 rounded-full py-2 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
                />

                <select
                    value={selectedCategoria}
                    onChange={(e) => setSelectedCategoria(e.target.value)}
                    className="w-full border border-gray-300 rounded-full py-2 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all bg-white"
                >
                    <option value="">Todas las categorías</option>
                    {categorias.map((categoria) => (
                        <option key={categoria.categoriaid} value={categoria.categoriaid}>
                            {categoria.nombre_categoria}
                        </option>
                    ))}
                </select>

                <button
                    onClick={toggleAdvancedSearch}
                    className="w-full bg-blue-500 text-white py-2 rounded-full hover:bg-blue-600 transition-all"
                >
                    {showAdvanced ? "Ocultar Búsqueda Avanzada" : "Búsqueda Avanzada"}
                </button>

                {/* Búsqueda avanzada */}
                {showAdvanced && (
                    <div className="flex flex-col gap-4 w-full mt-4">
                        <input
                            type="text"
                            value={autor}
                            onChange={(e) => setAutor(e.target.value)}
                            placeholder="Buscar por autor"
                            className="w-full border border-gray-300 rounded-full py-2 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
                        />
                        <input
                            type="text"
                            value={isbn}
                            onChange={(e) => setIsbn(e.target.value)}
                            placeholder="Buscar por ISBN"
                            className="w-full border border-gray-300 rounded-full py-2 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
                        />
                        <input
                            type="number"
                            min="1"
                            max="5"
                            value={calificacion}
                            onChange={(e) => setCalificacion(e.target.value)}
                            placeholder="Calificación (1-5)"
                            className="w-full border border-gray-300 rounded-full py-2 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
                        />
                    </div>
                )}

                <button
                    onClick={fetchLibros}
                    className="w-full bg-blue-500 text-white py-2 rounded-full hover:bg-blue-600 transition-all mt-4"
                >
                    Buscar
                </button>
            </div>

            {/* Resultados de libros */}
            {books.length > 0 ? (
                <ul className="w-full max-w-2xl mt-8">
                    {books.map((book) => (
                        <li
                            key={book.libroid}
                            className="bg-white border border-gray-200 rounded-lg p-4 mb-4 shadow-sm hover:shadow-md transition-shadow duration-200"
                        >
                            <Link to={`/libro/${book.libroid}`} className="text-lg font-medium text-blue-600 hover:underline">
                                {book.titulo}
                            </Link>
                            <p className="text-gray-500 mt-2">
                                Calificación: {isNaN(parseFloat(book.calificacion)) || book.calificacion === null ? 'N/A' : `${parseFloat(book.calificacion).toFixed(1)} ⭐`}
                            </p>
                            <button
                                onClick={() => addFavorito(book.libroid)}
                                className="mt-2 bg-yellow-500 text-white py-1 px-3 rounded-full hover:bg-yellow-600 transition-all"
                            >
                                Añadir a Favoritos
                            </button>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="text-center text-gray-500 mt-10">No se encontraron libros.</p>
            )}
        </div>
    );
};

export default Books;