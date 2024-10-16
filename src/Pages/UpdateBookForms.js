
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UpdateBookForm = () => {
    const [libros, setLibros] = useState([]);
    const [selectedLibro, setSelectedLibro] = useState(null);
    const [Titulo, setTitulo] = useState('');
    const [Genero, setGenero] = useState('');
    const [AutorID, setAutorID] = useState('');
    const [EditorialID, setEditorialID] = useState('');
    const [CategoriaID, setCategoriaID] = useState('');

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

    const handleLibroChange = (e) => {
        const libroId = parseInt(e.target.value, 10); // Ensure libroId is a number
        const libro = libros.find(lib => lib.libroid === libroId);
        setSelectedLibro(libro);
        setTitulo(libro.titulo);
        setGenero(libro.genero);
        setAutorID(libro.autorid);
        setEditorialID(libro.editorialid);
        setCategoriaID(libro.categoriaid);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:3000/api/libros/${selectedLibro.libroid}`, {
                Titulo,
                Genero,
                AutorID,
                EditorialID,
                CategoriaID,
            });
            alert('Libro actualizado con éxito');
        } catch (error) {
            console.error('Error actualizando el libro:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2 className="text-2xl font-bold text-gray-700 mb-4">Actualizar Libro</h2>
            <div>
                <label>Selecciona un Libro:</label>
                <select onChange={handleLibroChange}>
                    <option value="">Selecciona un libro</option>
                    {libros.map(libro => (
                        <option key={libro.libroid} value={libro.libroid}>
                            {libro.titulo}
                        </option>
                    ))}
                </select>
            </div>
            {selectedLibro && (
                <>
                    <div>
                        <label>Título:</label>
                        <input
                            type="text"
                            value={Titulo}
                            onChange={(e) => setTitulo(e.target.value)}
                        />
                    </div>
                    <div>
                        <label>Género:</label>
                        <input
                            type="text"
                            value={Genero}
                            onChange={(e) => setGenero(e.target.value)}
                        />
                    </div>
                    <div>
                        <label>AutorID:</label>
                        <input
                            type="text"
                            value={AutorID}
                            onChange={(e) => setAutorID(e.target.value)}
                        />
                    </div>
                    <div>
                        <label>EditorialID:</label>
                        <input
                            type="text"
                            value={EditorialID}
                            onChange={(e) => setEditorialID(e.target.value)}
                        />
                    </div>
                    <div>
                        <label>CategoriaID:</label>
                        <input
                            type="text"
                            value={CategoriaID}
                            onChange={(e) => setCategoriaID(e.target.value)}
                        />
                    </div>
                    <button type="submit" className="bg-blue-500 text-white mt-4">Actualizar Libro</button>
                </>
            )}
        </form>
    );
};

export default UpdateBookForm;