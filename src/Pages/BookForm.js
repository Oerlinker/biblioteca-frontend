import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const InputField = ({ label, value, onChange, placeholder, type = 'text' }) => (
    <div>
        <label className="block text-sm font-medium text-gray-700">{label}</label>
        <input
            className="block w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            type={type}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
        />
    </div>
);

const SelectField = ({ label, value, onChange, options, defaultOption }) => (
    <div>
        <label className="block text-sm font-medium text-gray-700">{label}</label>
        <select
            value={value}
            onChange={onChange}
            className="block w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
            <option value="">{defaultOption}</option>
            {options.map((option) => (
                <option key={option.id} value={option.id}>
                    {option.name}
                </option>
            ))}
        </select>
    </div>
);

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
    const [books, setBooks] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const autoresResponse = await axios.get('https://backend-proyecto-production-13fc.up.railway.app/api/autores');
                const editorialesResponse = await axios.get('https://backend-proyecto-production-13fc.up.railway.app/api/editoriales');
                const categoriasResponse = await axios.get('https://backend-proyecto-production-13fc.up.railway.app/api/categorias');
                const librosResponse = await axios.get('https://backend-proyecto-production-13fc.up.railway.app/api/libros');

                setAutores(autoresResponse.data);
                setEditoriales(editorialesResponse.data);
                setCategorias(categoriasResponse.data);
                setBooks(librosResponse.data);
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

            setTitulo('');
            setGenero('');
            setAutorID('');
            setEditorialID('');
            setCategoriaID('');

            const librosResponse = await axios.get('https://backend-proyecto-production-13fc.up.railway.app/api/libros');
            setBooks(librosResponse.data);
        } catch (error) {
            setError('Error al agregar el libro.');
        }
    };

    const handleViewBook = (id) => {
        navigate(`/libro/${id}`);
    };

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md space-y-6">
            <h2 className="text-2xl font-bold text-gray-700 mb-4">Agregar Libro</h2>

            {error && <p className="text-red-500">{error}</p>}
            {successMessage && <p className="text-green-500">{successMessage}</p>}
            {loading ? (
                <p className="text-gray-500">Cargando datos...</p>
            ) : (
                <>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <InputField
                            label="Título:"
                            value={Titulo}
                            onChange={(e) => setTitulo(e.target.value)}
                            placeholder="Escribe el título del libro"
                        />
                        <InputField
                            label="Género:"
                            value={Genero}
                            onChange={(e) => setGenero(e.target.value)}
                            placeholder="Escribe el género del libro"
                        />
                        <SelectField
                            label="Autor:"
                            value={AutorID}
                            onChange={(e) => setAutorID(e.target.value)}
                            options={autores.map((autor) => ({ id: autor.autorid, name: autor.nombre }))}
                            defaultOption="Selecciona un autor"
                        />
                        <SelectField
                            label="Editorial:"
                            value={EditorialID}
                            onChange={(e) => setEditorialID(e.target.value)}
                            options={editoriales.map((editorial) => ({ id: editorial.editorialid, name: editorial.nombre_editorial }))}
                            defaultOption="Selecciona una editorial"
                        />
                        <SelectField
                            label="Categoría:"
                            value={CategoriaID}
                            onChange={(e) => setCategoriaID(e.target.value)}
                            options={categorias.map((categoria) => ({ id: categoria.categoriaid, name: categoria.nombre_categoria }))}
                            defaultOption="Selecciona una categoría"
                        />

                        <button
                            type="submit"
                            className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600 transition-colors"
                        >
                            Agregar Libro
                        </button>
                    </form>

                    <h3 className="text-xl font-bold text-gray-700 mt-8">Lista de Libros</h3>
                    <table className="min-w-full bg-white border border-gray-300 mt-4">
                        <thead>
                        <tr>
                            <th className="py-2 px-4 border-b text-left">Título</th>
                            <th className="py-2 px-4 border-b text-left">Autor</th>
                            <th className="py-2 px-4 border-b text-left">Género</th>
                            <th className="py-2 px-4 border-b text-left">Acciones</th>
                        </tr>
                        </thead>
                        <tbody>
                        {books.map((book) => (
                            <tr key={book.libroid}>
                                <td className="py-2 px-4 border-b">{book.titulo}</td>
                                <td className="py-2 px-4 border-b">{book.autorid}</td>
                                <td className="py-2 px-4 border-b">{book.genero}</td>
                                <td className="py-2 px-4 border-b">
                                    <button
                                        onClick={() => handleViewBook(book.libroid)}
                                        className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition"
                                    >
                                        Ver
                                    </button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </>
            )}
        </div>
    );
};

export default BookForm;
