import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const BookDetails = () => {
    const { id } = useParams();
    const [book, setBook] = useState(null);

    useEffect(() => {
        console.log("ID del libro:", id);
        setBook(null);
        const fetchBook = async () => {
            try {
                const response = await axios.get(`https://backend-proyecto-production-13fc.up.railway.app/api/libros/${id}`);
                setBook(response.data);
            } catch (error) {
                console.error('Error obteniendo los detalles del libro', error);
            }
        };

        fetchBook();
    }, [id]);

    if (!book) {
        return <p className="text-center text-gray-500">Cargando detalles del libro...</p>;
    }

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg space-y-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Detalles del Libro</h1>

            <table className="min-w-full bg-gray-50 rounded-lg shadow-lg overflow-hidden">
                <thead>
                    <tr className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
                        <th className="py-3 px-6 text-left font-semibold">Campo</th>
                        <th className="py-3 px-6 text-left font-semibold">Valor</th>
                    </tr>
                </thead>
                <tbody>
                    <tr className="hover:bg-gray-100 transition duration-200">
                        <td className="py-4 px-6 border-b">Título</td>
                        <td className="py-4 px-6 border-b">{book.titulo}</td>
                    </tr>
                    <tr className="hover:bg-gray-100 transition duration-200">
                        <td className="py-4 px-6 border-b">Autor</td>
                        <td className="py-4 px-6 border-b">{book.autorid}</td> 
                    </tr>
                    <tr className="hover:bg-gray-100 transition duration-200">
                        <td className="py-4 px-6 border-b">Género</td>
                        <td className="py-4 px-6 border-b">{book.genero}</td>
                    </tr>
                    <tr className="hover:bg-gray-100 transition duration-200">
                        <td className="py-4 px-6 border-b">Editorial</td>
                        <td className="py-4 px-6 border-b">{book.editorialid}</td> 
                    </tr>
                    <tr className="hover:bg-gray-100 transition duration-200">
                        <td className="py-4 px-6 border-b">Categoría</td>
                        <td className="py-4 px-6 border-b">{book.categoriaid}</td> 
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default BookDetails;
