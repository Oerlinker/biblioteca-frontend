// src/Pages/GetBooksForm.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const GetBooksForm = () => {
    const [libros, setLibros] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchLibros = async () => {
            try {
                const response = await axios.get('https://backend-proyecto-production-13fc.up.railway.app/api/libros');
                setLibros(response.data);
                setLoading(false);
            } catch (error) {
                setError('Error fetching libros');
                setLoading(false);
            }
        };

        fetchLibros();
    }, []);

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
                            <th className="py-2 px-4 border-b text-left">Género</th>
                            <th className="py-2 px-4 border-b text-left">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {libros.map((book) => (
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
            )}
        </div>
    );
};

export default GetBooksForm;