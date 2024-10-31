import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const BookDetail = () => {
    const { id } = useParams();
    const [book, setBook] = useState(null);

    //adicion prestamo
    const [user, setUser] = useState(null);  // Aquí guardaremos la información del usuario
    const [disponible, setDisponible] = useState(false); // Estado para disponibilidad del libro
    const [edicionesDisponibles, setEdicionesDisponibles] = useState([]); // Almacenar ediciones disponibles
    const [edicionSeleccionada, setEdicionSeleccionada] = useState(null);

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

            //adicion prestamo
            // Obtener ediciones disponibles
            const edicionesResponse = await axios.get(`https://backend-proyecto-production-13fc.up.railway.app/api/libros/${id}/ediciones`);
            setEdicionesDisponibles(edicionesResponse.data);
            // Verificar disponibilidad del libro
            const disponibilidadResponse = await axios.get(`https://backend-proyecto-production-13fc.up.railway.app/api/prestamos/${id}/disponibilidad`);
            setDisponible(disponibilidadResponse.data.disponible);
            console.log('Disponibilidad:', disponibilidadResponse.data);

        } catch (error) {
            console.error('Error fetching book details:', error);
        }
    }, [id]);

    //adicion prestamo
    const fetchUser = () => {
        const token = localStorage.getItem('token');
        if (token) {
            const decodedToken = jwtDecode(token); // Decodificar el token
            setUser({ id: decodedToken.id, miembroid: decodedToken.miembroid, nombre: decodedToken.nombre, rol: decodedToken.rol, correo: decodedToken.correo });
            console.log('Usuario:', decodedToken);
        }
    };

    useEffect(() => {
        fetchBookDetails();
        fetchUser();
    }, [fetchBookDetails]);

    //adicion prestamo
    const handleSolicitarPrestamo = async (edicionidSeleccionada) => {
        if (user && book && disponible) {
            try {
                await axios.post(`https://backend-proyecto-production-13fc.up.railway.app/api/prestamos`, {
                    id: user.id,
                    miembroid: user.miembroid,
                    edicionid: edicionidSeleccionada,
                    fechaDevolucion: '2024-12-31' //se puede modificar a conveniencia
                });
                alert('Préstamo solicitado con éxito');
            } catch (error) {
                console.error('Error al solicitar el préstamo:', error);
                alert('Hubo un error al solicitar el préstamo');
            }
        }
    };

    //adicion prestamo
    const handleEdicionChange = (e) => {
        setEdicionSeleccionada(e.target.value);
    };

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
                {/* adicion prestamo */}
                {edicionesDisponibles.length > 0 ? (
                    <div>
                        <label htmlFor="edicion">Selecciona una edición:</label>
                        <select id="edicion" onChange={handleEdicionChange}>
                            <option value="">Selecciona una edición</option>
                            {edicionesDisponibles.map((edicion) => (
                                <option key={edicion.edicionid} value={edicion.edicionid}>
                                    Edición {edicion.numero_edicion} (ISBN: {edicion.isbn})
                                </option>
                            ))}
                        </select>

                        {edicionSeleccionada &&  (
                            <button
                                onClick={() => handleSolicitarPrestamo(edicionSeleccionada)}
                                className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
                            >
                                Solicitar Préstamo
                            </button>
                        )}
                    </div>
                ) : (
                    <p className="text-red-500">No hay ediciones disponibles en este momento.</p>
                )}

                </div>

                <Link to="/" className="text-blue-500 hover:underline">
                    Volver al catálogo
                </Link>
            </div>
        </div>
    );
};

export default BookDetail;
