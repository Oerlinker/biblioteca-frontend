import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const GetBooksForm = () => {
    const [libros, setLibros] = useState([]);
    const [autores, setAutores] = useState([]);
    const [editoriales, setEditoriales] = useState([]);
    const [categorias, setCategorias] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [librosResponse, autoresResponse, editorialesResponse, categoriasResponse] = await Promise.all([
                    axios.get('https://backend-proyecto-production-13fc.up.railway.app/api/libros'),
                    axios.get('https://backend-proyecto-production-13fc.up.railway.app/api/autores'),
                    axios.get('https://backend-proyecto-production-13fc.up.railway.app/api/editoriales'),
                    axios.get('https://backend-proyecto-production-13fc.up.railway.app/api/categorias')
                ]);

                setLibros(librosResponse.data);
                setAutores(autoresResponse.data);
                setEditoriales(editorialesResponse.data);
                setCategorias(categoriasResponse.data);
                setLoading(false);
            } catch (error) {
                setError('Error fetching data');
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const getAutorName = (id) => {
        const autor = autores.find((autor) => autor.autorid === id);
        return autor ? autor.nombre : 'Unknown';
    };

    const getEditorialName = (id) => {
        const editorial = editoriales.find((editorial) => editorial.editorialid === id);
        return editorial ? editorial.nombre_editorial : 'Unknown';
    };

    const getCategoriaName = (id) => {
        const categoria = categorias.find((categoria) => categoria.categoriaid === id);
        return categoria ? categoria.nombre_categoria : 'Unknown';
    };

    const handleViewBook = (id) => {
        navigate(`/libro/${id}`);
    };

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md space-y-6">
            <h2 className="text-2xl font-bold text-gray-700 mb-4">Lista de Libros</h2>

            {error && <p className="text-red-500">{error}</p>}
            {loading ? (
                <p className="text-gray-500">Cargando datos...</p>
            ) : (
                <table className="min-w-full bg-white border border-gray-300 mt-4">
                    <thead>
                        <tr>
                            <th className="py-2 px-4 border-b text-left">Título</th>
                            <th className="py-2 px-4 border-b text-left">Autor</th>
                            <th className="py-2 px-4 border-b text-left">Editorial</th>
                            <th className="py-2 px-4 border-b text-left">Categoría</th>
                            <th className="py-2 px-4 border-b text-left">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {libros.map((book) => (
                            <tr key={book.libroid}>
                                <td className="py-2 px-4 border-b">{book.titulo}</td>
                                <td className="py-2 px-4 border-b">{getAutorName(book.autorid)}</td>
                                <td className="py-2 px-4 border-b">{getEditorialName(book.editorialid)}</td>
                                <td className="py-2 px-4 border-b">{getCategoriaName(book.categoriaid)}</td>
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
            )}
        </div>
    );
};

export default GetBooksForm;