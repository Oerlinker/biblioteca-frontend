import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BookForm = () => {
    const [Titulo, setTitulo] = useState('');
    const [Genero, setGenero] = useState('');
    const [autores, setAutores] = useState([]);
    const [editoriales, setEditoriales] = useState([]);
    const [categorias, setCategorias] = useState([]);
    const [AutorID, setAutorID] = useState('');
    const [EditorialID, setEditorialID] = useState('');
    const [CategoriaID, setCategoriaID] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const autoresResponse = await axios.get('http://localhost:3000/api/autores');
                const editorialesResponse = await axios.get('http://localhost:3000/api/editoriales');
                const categoriasResponse = await axios.get('http://localhost:3000/api/categorias');

                setAutores(autoresResponse.data);
                setEditoriales(editorialesResponse.data);
                setCategorias(categoriasResponse.data);
                setLoading(false);
            } catch (error) {
                setError('Error al cargar los datos.');
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validación básica
        if (!Titulo || !Genero || !AutorID || !EditorialID || !CategoriaID) {
            setError('Por favor, completa todos los campos.');
            return;
        }

        try {
            const nuevoLibro = {
                Titulo,
                Genero,
                AutorID,
                EditorialID,
                CategoriaID,
            };

            await axios.post('https://backend-proyecto-production-13fc.up.railway.app/api/libros', nuevoLibro);

            setSuccessMessage('Libro agregado con éxito.');
            setError('');

            // Reset form fields
            setTitulo('');
            setGenero('');
            setAutorID('');
            setEditorialID('');
            setCategoriaID('');
        } catch (error) {
            setError('Error al agregar el libro.');
        }
    };

    return (
        <div className="max-w-xl mx-auto p-6 bg-white rounded shadow-lg space-y-6">
            <h2 className="text-2xl font-bold text-gray-700 mb-4">Agregar Libro</h2>

            {error && <p className="text-red-500">{error}</p>}
            {successMessage && <p className="text-green-500">{successMessage}</p>}
            {loading ? (
                <p className="text-gray-500">Cargando datos...</p>
            ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Título:</label>
                        <input
                            className="block w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            type="text"
                            value={Titulo}
                            onChange={(e) => setTitulo(e.target.value)}
                            placeholder="Escribe el título del libro"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Género:</label>
                        <input
                            className="block w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            type="text"
                            value={Genero}
                            onChange={(e) => setGenero(e.target.value)}
                            placeholder="Escribe el género del libro"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Autor:</label>
                        <select
                            value={AutorID}
                            onChange={(e) => setAutorID(e.target.value)}
                            className="block w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="">Selecciona un autor</option>
                            {autores.map((autor) => (
                                <option key={autor.autorid} value={autor.autorid}>
                                    {autor.nombre}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Editorial:</label>
                        <select
                            value={EditorialID}
                            onChange={(e) => setEditorialID(e.target.value)}
                            className="block w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="">Selecciona una editorial</option>
                            {editoriales.map((editorial) => (
                                <option key={editorial.editorialid} value={editorial.editorialid}>
                                    {editorial.nombre_editorial}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Categoría:</label>
                        <select
                            value={CategoriaID}
                            onChange={(e) => setCategoriaID(e.target.value)}
                            className="block w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="">Selecciona una categoría</option>
                            {categorias.map((categoria) => (
                                <option key={categoria.categoriaid} value={categoria.categoriaid}>
                                    {categoria.nombre_categoria}
                                </option>
                            ))}
                        </select>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600 transition"
                    >
                        Agregar Libro
                    </button>
                </form>
            )}
        </div>
    );
};

export default BookForm;
