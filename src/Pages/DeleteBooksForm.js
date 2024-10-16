import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DeleteBookForm = () => {
    const [libros, setLibros] = useState([]);
    const [selectedLibro, setSelectedLibro] = useState('');

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

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log(`Deleting book with ID: ${selectedLibro}`);
            await axios.delete(`http://localhost:3000/api/libros/${selectedLibro}`);
            alert('Libro eliminado con éxito');
            // Refresh the list of books after deletion
            const response = await axios.get('http://localhost:3000/api/libros/:id');
            setLibros(response.data);
            setSelectedLibro('');
        } catch (error) {
            console.error('Error eliminando el libro:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2 className="text-2xl font-bold text-gray-700 mb-4">Eliminar Libro</h2>
            <div>
                <label>Selecciona un Libro:</label>
                <select value={selectedLibro} onChange={(e) => setSelectedLibro(e.target.value)}>
                    <option value="">Selecciona un libro</option>
                    {libros.map(libro => (
                        <option key={libro.libroid} value={libro.libroid}>
                            {libro.titulo}
                        </option>
                    ))}
                </select>
            </div>
            <button type="submit" className="bg-blue-500 text-white mt-4">Eliminar Libro</button>
        </form>
    );
};

export default DeleteBookForm;