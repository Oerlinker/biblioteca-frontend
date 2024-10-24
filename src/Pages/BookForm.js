import React, { useState, useEffect } from 'react';
import axios from 'axios';

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

const BookForm = ({ userRole }) => {
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
                const autoresResponse = await axios.get('https://backend-proyecto-production-13fc.up.railway.app/api/autores');
                const editorialesResponse = await axios.get('https://backend-proyecto-production-13fc.up.railway.app/api/editoriales');
                const categoriasResponse = await axios.get('https://backend-proyecto-production-13fc.up.railway.app/api/categorias');

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
        } catch (error) {
            setError('Error al agregar el libro.');
        }
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
                    {userRole === 'admin' && (
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
                    )}
                </>
            )}
        </div>
    );
};

export default BookForm;
