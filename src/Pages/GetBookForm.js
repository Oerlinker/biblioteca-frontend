// GetBooksForm.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const GetBooksForm = () => {
    const [libros, setLibros] = useState([]);

    useEffect(() => {
        const fetchLibros = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/libros');
                setLibros(response.data);
            } catch (error) {
                console.error('Error fetching libros:', error);
            }
        };

        fetchLibros();
    }, []);

    return (
        <div>
            <h2 className="text-2xl font-bold text-gray-700 mb-4">Lista de Libros</h2>
            <ul>
                {libros.map(libro => (
                    <li key={libro.libroid}>{libro.titulo}</li>
                ))}
            </ul>
        </div>
    );
};

export default GetBooksForm;