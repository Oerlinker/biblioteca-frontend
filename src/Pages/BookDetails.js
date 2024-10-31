import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const BookDetail = () => {
    const { id } = useParams();
    const [book, setBook] = useState(null);
    const [reviews, setReviews] = useState([]);

    //adicion prestamo
    const [user, setUser] = useState(null);
    const [disponible, setDisponible] = useState(false);
    const [edicionesDisponibles, setEdicionesDisponibles] = useState([]);
    const [edicionSeleccionada, setEdicionSeleccionada] = useState(null);

    const [autor, setAutor] = useState('');
    const [editorial, setEditorial] = useState('');
    const [categoria, setCategoria] = useState('');
    const [currentPage, setCurrentPage] = useState(0);

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

    const fetchReviews = useCallback(async () => {
        try {
            const response = await axios.get(`https://backend-proyecto-production-13fc.up.railway.app/api/review/libro/${id}`);
            setReviews(response.data);
        } catch (error) {
            console.error('Error fetching reviews:', error);
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
        fetchReviews();
        fetchUser();
    }, [fetchBookDetails,fetchReviews]);

    //adicion prestamo
    const handleSolicitarPrestamo = async (edicionidSeleccionada) => {
        if (user && book && disponible) {
            try {
                await axios.post(`https://backend-proyecto-production-13fc.up.railway.app/api/prestamos`, {
                    id: user.id,
                    miembroid: user.miembroid,
                    edicionid: edicionidSeleccionada,
                    fechaDevolucion: '2024-12-31'
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

    const renderStars = (rating) => {
        return (
            <div className="flex">
                {[...Array(5)].map((star, index) => {
                    index += 1;
                    return (
                        <svg
                            key={index}
                            className={`w-4 h-4 ${index <= rating ? 'text-yellow-500' : 'text-gray-300'}`}
                            fill="currentColor"
                            viewBox="0 0 20 20"
                        >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.97a1 1 0 00.95.69h4.18c.969 0 1.371 1.24.588 1.81l-3.388 2.46a1 1 0 00-.364 1.118l1.287 3.97c.3.921-.755 1.688-1.54 1.118l-3.388-2.46a1 1 0 00-1.175 0l-3.388 2.46c-.784.57-1.838-.197-1.54-1.118l1.287-3.97a1 1 0 00-.364-1.118L2.045 9.397c-.783-.57-.38-1.81.588-1.81h4.18a1 1 0 00.95-.69l1.286-3.97z" />
                        </svg>
                    );
                })}
            </div>
        );
    };

    const handleNextPage = () => {
        if (currentPage < reviews.length - 1) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePreviousPage = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1);
        }
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

                            {edicionSeleccionada && (
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

                {/* Reviews Section */}
                <div className="mt-8">
                    <h3 className="text-2xl font-bold text-gray-800 mb-4">Reseñas</h3>
                    {reviews.length > 0 ? (
                        <div className="space-y-4">
                            <div className="bg-gray-100 p-4 rounded shadow">
                                <div className="flex items-center mb-2">
                                    {renderStars(reviews[currentPage].calificacion)}
                                    <span className="ml-2 text-gray-700">{reviews[currentPage].calificacion}/5</span>
                                </div>
                                <p className="text-gray-700"><strong>{reviews[currentPage].miembro_nombre}:</strong> {reviews[currentPage].comentario}</p>
                                <p className="text-gray-500 text-sm">Fecha: {new Date(reviews[currentPage].fecha_reseña).toLocaleDateString()}</p>
                            </div>
                            <div className="flex justify-between mt-4">
                                <button
                                    onClick={handlePreviousPage}
                                    disabled={currentPage === 0}
                                    className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 disabled:opacity-50"
                                >
                                    Anterior
                                </button>
                                <button
                                    onClick={handleNextPage}
                                    disabled={currentPage === reviews.length - 1}
                                    className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 disabled:opacity-50"
                                >
                                    Siguiente
                                </button>
                            </div>
                        </div>
                    ) : (
                        <p className="text-gray-500">No hay reseñas disponibles para este libro.</p>
                    )}
                </div>

                <Link to="/" className="text-blue-500 hover:underline mt-4 block text-center">
                    Volver al catálogo
                </Link>
            </div>
        </div>
    );
};

export default BookDetail;
