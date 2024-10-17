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

    useEffect(() => {
        const fetchData = async () => {
            try {
                const autoresResponse = await axios.get('https://backend-proyecto-production-13fc.up.railway.app/api/autores');
                const editorialesResponse = await axios.get('https://backend-proyecto-production-13fc.up.railway.app/api/editoriales');
                const categoriasResponse = await axios.get('https://backend-proyecto-production-13fc.up.railway.app/api/categorias');

                setAutores(autoresResponse.data);
                setEditoriales(editorialesResponse.data);
                setCategorias(categoriasResponse.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const nuevoLibro = {
                Titulo,
                Genero,
                AutorID,
                EditorialID,
                CategoriaID,
            };

            await axios.post('/api/libros', nuevoLibro);

            // Reset form fields
            setTitulo('');
            setGenero('');
            setAutorID('');
            setEditorialID('');
            setCategoriaID('');
        } catch (error) {
            console.error('Error al agregar el libro:', error);
        }
    };

    return (
        <form className="max-w-xl mx-auto p-6 bg-white rounded shadow-lg space-y-6" onSubmit={handleSubmit}>
            <h2 className="text-2xl font-bold text-gray-700 mb-4">Agregar Libro</h2>

            <div>
                <label className="block text-sm font-medium text-gray-700">Título:</label>
                <input
                    className="block w-full p-2 border border-gray-300 rounded"
                    type="text"
                    value={Titulo}
                    onChange={(e) => setTitulo(e.target.value)}
                    placeholder="Escribe el título del libro"
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">Género:</label>
                <input
                    className="block w-full p-2 border border-gray-300 rounded"
                    type="text"
                    value={Genero}
                    onChange={(e) => setGenero(e.target.value)}
                    placeholder="Escribe el género del libro"
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">Autor:</label>
                <select value={AutorID} onChange={(e) => setAutorID(e.target.value)} className="block w-full p-2 border border-gray-300 rounded">
                    <option value="">Selecciona un autor</option>
                    {autores.map(autor => (
                        <option key={autor.autorid} value={autor.autorid}>
                            {autor.nombre}
                        </option>
                    ))}
                </select>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">Editorial:</label>
                <select value={EditorialID} onChange={(e) => setEditorialID(e.target.value)} className="block w-full p-2 border border-gray-300 rounded">
                    <option value="">Selecciona una editorial</option>
                    {editoriales.map(editorial => (
                        <option key={editorial.editorialid} value={editorial.editorialid}>
                            {editorial.nombre_editorial}
                        </option>
                    ))}
                </select>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">Categoría:</label>
                <select value={CategoriaID} onChange={(e) => setCategoriaID(e.target.value)} className="block w-full p-2 border border-gray-300 rounded">
                    <option value="">Selecciona una categoría</option>
                    {categorias.map(categoria => (
                        <option key={categoria.categoriaid} value={categoria.categoriaid}>
                            {categoria.nombre_categoria}
                        </option>
                    ))}
                </select>
            </div>

            <button type="submit" className="w-full bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600">Agregar Libro</button>
        </form>
    );
};

export default BookForm;
