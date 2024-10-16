import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const BookDetails = () => {
    const { id } = useParams();
    const [book, setBook] = useState(null);


    useEffect(() => {
        console.log("ID del libro:", id);
        setBook(null)
        const fetchBook = async () => {
            try {
                const response = await axios.get(`api/libros/${id}`); // Asegúrate de incluir el URL completo
                setBook(response.data);
            } catch (error) {
                console.error('Error obteniendo los detalles del libro', error);
            }
        };

        fetchBook();
    }, [id]);

    if (!book) {
        return <p>Cargando...</p>;
    }

    return (
        <div>
            <h1>{book.titulo}</h1>
            <p>Autor: {book.autorid}</p> {/* Asegúrate de que este campo sea correcto */}
            <p>Género: {book.genero}</p>
            <p>Editorial: {book.editorialid}</p> {/* Considera hacer una consulta para obtener el nombre de la editorial */}
            <p>Categoría: {book.categoriaid}</p> {/* Considera hacer una consulta para obtener el nombre de la categoría */}
        </div>
    );
};

export default BookDetails;