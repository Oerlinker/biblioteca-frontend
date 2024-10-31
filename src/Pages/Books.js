import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Books = () => {
    const [books, setLibros] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [categorias, setCategorias] = useState([]); // Estado para almacenar los géneros
    const [selectedCategoria, setSelectedCategoria] = useState(""); // Estado para la categoría seleccionada
    //avanzada
    const [showAdvanced, setShowAdvanced] = useState(false);

    // Filtros adicionales para búsqueda avanzada
    const [autor, setAutor] = useState("");
    const [calificacion, setCalificacion] = useState("");
    const [isbn, setIsbn] = useState("");

    //fetch para obtener todas las categorias de la caja
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

    //fetch de busqueda, ya sea por nombre o categoria
    const fetchLibros = useCallback(async () => {
        try {
            setLibros([]);
            console.log('Parámetros de búsqueda:', {
                search: searchQuery,
                categoriaid: selectedCategoria,
                autor: autor,
                calificacion: calificacion,
                isbn: isbn,
            });
    
            const response = await axios.get(`https://backend-proyecto-production-13fc.up.railway.app/api/search`, {
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

    
//full diseño
return (
    <div className="container mx-auto p-4">
        <h2 className="text-3xl font-bold text-center mb-6">Buscar Libros</h2>

        {/* Filtro de Categorías */}
        <div className="flex justify-center mb-4">
            <select
                value={selectedCategoria}
                onChange={(e) => setSelectedCategoria(e.target.value)}
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

        {/* Campo de búsqueda */}
        <div className="flex justify-center mb-4">
            <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar libro por título..."
                className="border border-gray-300 rounded-md py-2 px-4 w-80 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
        </div>

        {/* Botón para mostrar búsqueda avanzada */}
        <div className="flex justify-center mb-4">
            <button onClick={toggleAdvancedSearch} className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600">
                {showAdvanced ? "Ocultar Búsqueda Avanzada" : "Mostrar Búsqueda Avanzada"}
            </button>
        </div>

        {/* Formulario de búsqueda avanzada */}
        {showAdvanced && (
            <div className="flex flex-col items-center mb-6">
                <select
                    value={selectedCategoria}
                    onChange={(e) => setSelectedCategoria(e.target.value)}
                    className="border border-gray-300 rounded-md py-2 px-4 mb-4 w-80"
                >
                    <option value="">Todas las categorías</option>
                    {categorias.map((categoria) => (
                        <option key={categoria.categoriaid} value={categoria.categoriaid}>
                            {categoria.nombre_categoria}
                        </option>
                    ))}
                </select>
                <input
                    type="text"
                    value={autor}
                    onChange={(e) => setAutor(e.target.value)}
                    placeholder="Buscar por autor"
                    className="border border-gray-300 rounded-md py-2 px-4 mb-4 w-80"
                />
                <input
                    type="text"
                    value={isbn}
                    onChange={(e) => setIsbn(e.target.value)}
                    placeholder="Buscar por ISBN"
                    className="border border-gray-300 rounded-md py-2 px-4 mb-4 w-80"
                />
                <input
                    type="number"
                    min="1"
                    max="5"
                    value={calificacion}
                    onChange={(e) => setCalificacion(e.target.value)}
                    placeholder="Buscar por calificación (1-5)"
                    className="border border-gray-300 rounded-md py-2 px-4 mb-4 w-80"
                />
            </div>
        )}

        <button onClick={fetchLibros} className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 mb-6">
            Buscar
        </button>

        {/* Resultados de libros */}
        {books.length > 0 ? (
            <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {books.map((book) => (
                    <li key={book.libroid} className="border p-4 rounded-md shadow-md hover:shadow-lg transition-shadow duration-300">
                        <Link to={`/libro/${book.libroid}`} className="text-lg font-semibold text-blue-600 hover:underline">
                            {book.titulo}
                        </Link>
                        {/* Mostrar la calificación promedio */}
                        <p className="text-gray-500 mt-1">
                        Calificación Promedio: {isNaN(parseFloat(book.calificacion)) || book.calificacion === null ? 'N/A' : `${parseFloat(book.calificacion).toFixed(1)} ⭐`}
                        </p>
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
