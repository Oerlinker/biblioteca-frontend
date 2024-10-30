import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';

const BookDetail = () => {
    const { id } = useParams();
    const [book, setBook] = useState(null);
    const [autor, setAutor] = useState('');
    const [editorial, setEditorial] = useState('');
    const [categoria, setCategoria] = useState('');

    const fetchBookDetails = useCallback(async () => {
        try {
            const response = await axios.get(`https://backend-proyecto-production-13fc.up.railway.app/api/libros/${id}`);
            setBook(response.data);

            const autorResponse = await axios.get(`https://backend-proyecto-production-13fc.up.railway.app/api/autores/${response.data.autorid}`);
            setAutor(autorResponse.data.nombre);

            const editorialResponse = await axios.get(`https://backend-proyecto-production-13fc.up.railway.app/api/editoriales/${response.data.editorialid}`);
            setEditorial(editorialResponse.data.nombre_editorial);

            const categoriaResponse = await axios.get(`https://backend-proyecto-production-13fc.up.railway.app/api/categorias/${response.data.categoriaid}`);
            setCategoria(categoriaResponse.data.nombre_categoria);
        } catch (error) {
            console.error('Error fetching book details:', error);
        }
    }, [id]);

    useEffect(() => {
        fetchBookDetails();
    }, [fetchBookDetails]);

    if (!book) {
        return <p className="text-center text-gray-500 mt-8">Cargando detalles del libro...</p>;
    }

    return (
        <div className="min-h-screen bg-gray-100 p-8 flex flex-col items-center">
            <div className="bg-white border p-6 rounded-lg shadow-lg max-w-3xl w-full">
                <h2 className="text-4xl font-bold text-gray-800 mb-4 text-center">{book.titulo}</h2>

                <div className="space-y-2 mb-4">
                    <p className="text-gray-700"><strong>Género:</strong> {book.genero}</p>
                    <p className="text-gray-700"><strong>Autor:</strong> {autor || 'Desconocido'}</p>
                    <p className="text-gray-700"><strong>Editorial:</strong> {editorial || 'Desconocida'}</p>
                    <p className="text-gray-700"><strong>Categoría:</strong> {categoria || 'General'}</p>
                    <p className="text-gray-700"><strong>Edición:</strong> {book.edicion || 'No disponible'}</p>
                    <p className="text-gray-700"><strong>ISBN:</strong> {book.isbn || 'No disponible'}</p>
                </div>

                <Link to="/" className="text-blue-500 hover:underline">
                    Volver al catálogo
                </Link>
            </div>
        </div>
    );
};

export default BookDetail;
