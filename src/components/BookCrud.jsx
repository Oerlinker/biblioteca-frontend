import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BookCrud = () => {
    const [libros, setLibros] = useState([]);
    const [autores, setAutores] = useState([]);
    const [editoriales, setEditoriales] = useState([]);
    const [categorias, setCategorias] = useState([]);
    const [Titulo, setTitulo] = useState('');
    const [Genero, setGenero] = useState('');
    const [AutorID, setAutorID] = useState('');
    const [EditorialID, setEditorialID] = useState('');
    const [CategoriaID, setCategoriaID] = useState('');
    const [selectedLibro, setSelectedLibro] = useState(null);
    const [viewLibro, setViewLibro] = useState(null);
    const [edicionesDisponibles, setEdicionesDisponibles] = useState([]);
    const [disponible, setDisponible] = useState(false);
    const [setEdicionSeleccionada] = useState(null);

    useEffect(() => {
        fetchLibros();
        fetchAutoresEditorialesCategorias();
    }, []);

    const fetchLibros = async () => {
        try {
            const response = await axios.get('https://backend-proyecto-production-13fc.up.railway.app/api/libros');
            setLibros(response.data);
        } catch (error) {
            console.error('Error fetching libros:', error);
        }
    };

    const fetchAutoresEditorialesCategorias = async () => {
        try {
            const [autoresResponse, editorialesResponse, categoriasResponse] = await Promise.all([
                axios.get('https://backend-proyecto-production-13fc.up.railway.app/api/autores'),
                axios.get('https://backend-proyecto-production-13fc.up.railway.app/api/editoriales'),
                axios.get('https://backend-proyecto-production-13fc.up.railway.app/api/categorias')
            ]);
            setAutores(autoresResponse.data);
            setEditoriales(editorialesResponse.data);
            setCategorias(categoriasResponse.data);
        } catch (error) {
            console.error('Error fetching autores, editoriales, or categorias:', error);
        }
    };

    const handleAddOrUpdateBook = async (e) => {
        e.preventDefault();
        try {
            if (selectedLibro) {
                await axios.put(`https://backend-proyecto-production-13fc.up.railway.app/api/libros/${selectedLibro.libroid}`, {
                    Titulo, Genero, AutorID, EditorialID, CategoriaID
                });
            } else {
                await axios.post('https://backend-proyecto-production-13fc.up.railway.app/api/libros', {
                    Titulo, Genero, AutorID, EditorialID, CategoriaID
                });
            }
            resetForm();
            fetchLibros(); // Actualiza la lista de libros
        } catch (error) {
            console.error('Error saving book:', error);
        }
    };

    const handleDeleteBook = async (libroId) => {
        try {
            await axios.delete(`https://backend-proyecto-production-13fc.up.railway.app/api/libros/${libroId}`);
            fetchLibros(); // Actualiza la lista de libros
        } catch (error) {
            console.error('Error deleting book:', error);
        }
    };

    const resetForm = () => {
        setTitulo('');
        setGenero('');
        setAutorID('');
        setEditorialID('');
        setCategoriaID('');
        setSelectedLibro(null);
    };

    const handleEditClick = (libro) => {
        setSelectedLibro(libro);
        setTitulo(libro.titulo);
        setGenero(libro.genero);
        setAutorID(libro.autorid);
        setEditorialID(libro.editorialid);
        setCategoriaID(libro.categoriaid);
    };

    const handleViewClick = async (libro) => {
        try {
            const response = await axios.get(`https://backend-proyecto-production-13fc.up.railway.app/api/libros/${libro.libroid}`);
            setViewLibro(response.data);
            const edicionesResponse = await axios.get(`https://backend-proyecto-production-13fc.up.railway.app/api/libros/${libro.libroid}/ediciones`);
            setEdicionesDisponibles(edicionesResponse.data);
            const disponibilidadResponse = await axios.get(`https://backend-proyecto-production-13fc.up.railway.app/api/prestamos/${libro.libroid}/disponibilidad`);
            setDisponible(disponibilidadResponse.data.disponible);
        } catch (error) {
            console.error('Error obteniendo los detalles del libro:', error);
        }
    };

    const handleEdicionChange = (e) => {
        setEdicionSeleccionada(e.target.value);
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center p-4 w-full">
            <h1 className="text-3xl font-semibold text-gray-700 mb-8 text-center">Gestión de Libros</h1>

            <form onSubmit={handleAddOrUpdateBook} className="mb-8 p-6 bg-white rounded shadow-md w-full max-w-3xl lg:max-w-5xl">
                <h2 className="text-xl font-bold text-gray-600 mb-4">{selectedLibro ? 'Actualizar Libro' : 'Agregar Libro'}</h2>

                <div className="space-y-4 grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-gray-600">Título</label>
                        <input
                            type="text"
                            value={Titulo}
                            onChange={(e) => setTitulo(e.target.value)}
                            className="w-full p-2 mt-1 border rounded-md focus:outline-none focus:border-blue-400"
                            placeholder="Escribe el título del libro"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-600">Género</label>
                        <input
                            type="text"
                            value={Genero}
                            onChange={(e) => setGenero(e.target.value)}
                            className="w-full p-2 mt-1 border rounded-md focus:outline-none focus:border-blue-400"
                            placeholder="Escribe el género del libro"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-600">Autor</label>
                        <select
                            value={AutorID}
                            onChange={(e) => setAutorID(e.target.value)}
                            className="w-full p-2 mt-1 border rounded-md focus:outline-none focus:border-blue-400"
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
                        <label className="block text-gray-600">Editorial</label>
                        <select
                            value={EditorialID}
                            onChange={(e) => setEditorialID(e.target.value)}
                            className="w-full p-2 mt-1 border rounded-md focus:outline-none focus:border-blue-400"
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
                        <label className="block text-gray-600">Categoría</label>
                        <select
                            value={CategoriaID}
                            onChange={(e) => setCategoriaID(e.target.value)}
                            className="w-full p-2 mt-1 border rounded-md focus:outline-none focus:border-blue-400"
                        >
                            <option value="">Selecciona una categoría</option>
                            {categorias.map((categoria) => (
                                <option key={categoria.categoriaid} value={categoria.categoriaid}>
                                    {categoria.nombre_categoria}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                <button
                    type="submit"
                    className="mt-6 w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700"
                >
                    {selectedLibro ? 'Actualizar Libro' : 'Agregar Libro'}
                </button>
                {selectedLibro && (
                    <button
                        type="button"
                        onClick={resetForm}
                        className="mt-2 w-full bg-gray-300 text-gray-700 p-2 rounded-md hover:bg-gray-400"
                    >
                        Cancelar
                    </button>
                )}
            </form>

            <div className="w-full max-w-3xl lg:max-w-5xl overflow-x-auto">
                <h2 className="text-2xl font-semibold text-gray-700 mb-4 text-center">Lista de Libros</h2>
                <table className="w-full border bg-white rounded shadow-md text-sm lg:text-base">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="p-4 border-b text-left text-gray-600">Título</th>
                            <th className="p-4 border-b text-left text-gray-600">Autor</th>
                            <th className="p-4 border-b text-left text-gray-600">Editorial</th>
                            <th className="p-4 border-b text-left text-gray-600">Categoría</th>
                            <th className="p-4 border-b text-left text-gray-600">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {libros.map((libro) => (
                            <tr key={libro.libroid} className="hover:bg-gray-50 transition">
                                <td className="p-4 border-b">{libro.titulo}</td>
                                <td className="p-4 border-b">{autores.find(a => a.autorid === libro.autorid)?.nombre || 'Desconocido'}</td>
                                <td className="p-4 border-b">{editoriales.find(e => e.editorialid === libro.editorialid)?.nombre_editorial || 'Desconocido'}</td>
                                <td className="p-4 border-b">{categorias.find(c => c.categoriaid === libro.categoriaid)?.nombre_categoria || 'Desconocido'}</td>
                                <td className="p-4 border-b flex space-x-2 justify-center">
                                    <button
                                        onClick={() => handleViewClick(libro)}
                                        className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                                    >
                                        Ver
                                    </button>
                                    <button
                                        onClick={() => handleEditClick(libro)}
                                        className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                                    >
                                        Editar
                                    </button>
                                    <button
                                        onClick={() => handleDeleteBook(libro.libroid)}
                                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                                    >
                                        Eliminar
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {viewLibro && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 p-4">
                    <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-lg space-y-4">
                        <h2 className="text-2xl font-semibold text-gray-700">Detalles del Libro</h2>
                        <p><strong>Título:</strong> {viewLibro.titulo}</p>
                        <p><strong>Género:</strong> {viewLibro.genero}</p>
                        <p><strong>Autor:</strong> {autores.find(a => a.autorid === viewLibro.autorid)?.nombre || 'Desconocido'}</p>
                        <p><strong>Editorial:</strong> {editoriales.find(e => e.editorialid === viewLibro.editorialid)?.nombre_editorial || 'Desconocido'}</p>
                        <p><strong>Categoría:</strong> {categorias.find(c => c.categoriaid === viewLibro.categoriaid)?.nombre_categoria || 'Desconocido'}</p>
                        <p><strong>Disponibilidad:</strong> {disponible ? 'Disponible' : 'No Disponible'}</p>

                        {edicionesDisponibles.length > 0 && (
                            <div>
                                <label className="block text-gray-600">Selecciona una edición:</label>
                                <select
                                    onChange={handleEdicionChange}
                                    className="w-full p-2 mt-1 border rounded-md focus:outline-none focus:border-blue-400"
                                >
                                    <option value="">Selecciona una edición</option>
                                    {edicionesDisponibles.map((edicion) => (
                                        <option key={edicion.edicionid} value={edicion.edicionid}>
                                            Edición {edicion.numero_edicion} (ISBN: {edicion.isbn})
                                        </option>
                                    ))}
                                </select>
                            </div>
                        )}
                        <button
                            onClick={() => setViewLibro(null)}
                            className="mt-4 w-full bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
                        >
                            Cerrar
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default BookCrud;
