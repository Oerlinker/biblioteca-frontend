import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import moment from 'moment-timezone';


const GestionarPrestamos = () => {
    const [prestamos, setPrestamos] = useState([]);
    const [user, setUser] = useState(null); 
    const [isReviewFormVisible, setIsReviewFormVisible] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [review, setReview] = useState({
    edicionid: null,
    libroid: null,
    calificacion: 0,
    comentario: '',
});

    useEffect(() => {
        const fetchUser = () => {
            const token = localStorage.getItem('token');
            if (token) {
                const decodedToken = jwtDecode(token);
                setUser({ miembroid: decodedToken.miembroid, id: decodedToken.id, nombre: decodedToken.nombre });
                console.log('Usuario:', decodedToken);
            }
        };

    fetchUser();
}, [user?.id]); 

    // Usar useCallback para memoizar la función fetchPrestamos
    const fetchPrestamos = useCallback(async () => {
        if (!user) return; // Espera a que user esté definido antes de continuar
        const { miembroid } = user;
        try {
            const response = await axios.get(`https://backend-proyecto-production-13fc.up.railway.app/api/users/prestamos/activos/${miembroid}`);
            setPrestamos(response.data);
        } catch (error) {
            console.error('Error al obtener préstamos api:', error);
        }
    }, [user]); // Dependencia de user

    useEffect(() => {
        fetchPrestamos();
    }, [fetchPrestamos]);

    const handleDevolucion = async (prestamoid) => {
        try {
            await axios.post(`https://backend-proyecto-production-13fc.up.railway.app/api/users/prestamos/devolver/${prestamoid}`);
            // Actualiza la lista de préstamos después de la devolución
            setPrestamos((prevPrestamos) => prevPrestamos.filter(p => p.prestamoid !== prestamoid));
            alert('Libro devuelto con éxito.');
        } catch (error) {
            console.error('Error al devolver el libro:', error);
            alert('Error al devolver el libro. Intenta nuevamente.');
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setReview((prevReview) => ({
            ...prevReview,
            [name]: value,
        }));
    };
    
    const handleSubmitReview = async (e) => {
        e.preventDefault();
        console.log('reseña',review);
        try {
            await axios.post(`https://backend-proyecto-production-13fc.up.railway.app/api/users/review`, {
                id: user.id,
                miembroid: user.miembroid,
                edicionid: review.edicionid,
                libroid: review.libroid,
                calificacion: review.calificacion,
                comentario: review.comentario,
            });
            // Reiniciar el formulario
            setReview({ edicionid: null, libroid: null, calificacion: 0, comentario: '' });
            setIsReviewFormVisible(false);
            fetchPrestamos(); // Para actualizar la lista de préstamos si es necesario
            setSuccessMessage('¡Reseña enviada con éxito!');
            setTimeout(() => {
                setSuccessMessage('');
            }, 3000); 
        } catch (error) {
            console.error('Error al enviar la reseña:', error);
        }
    };

    return (
        <div style={{ padding: '20px', maxWidth: '600px', margin: 'auto' }}>
            <h2 style={{ textAlign: 'center' }}>Préstamos Activos</h2>
            {successMessage && (
                <div style={{
                    backgroundColor: '#d4edda',
                    color: '#155724',
                    padding: '10px',
                    borderRadius: '5px',
                    marginBottom: '15px',
                    textAlign: 'center',
                }}>
                    {successMessage}
                </div>
            )}
            {prestamos.length > 0 ? (
                <ul style={{ listStyleType: 'none', padding: 0 }}>
                    {prestamos.map((prestamo) => (
                        <li key={prestamo.prestamoid} style={{
                            padding: '15px',
                            marginBottom: '10px',
                            border: '1px solid #ccc',
                            borderRadius: '5px',
                            backgroundColor: '#f9f9f9'
                        }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <div>
                                    <h4 style={{ margin: '0' }}>{prestamo.titulo}</h4>
                                    <p style={{ margin: '5px 0' }}>
                                        <strong>Número de Edición:</strong> {prestamo.numero_edicion}
                                    </p>
                                    <p style={{ margin: '5px 0' }}>
                                        <strong>Fecha de Devolución:</strong> {moment(prestamo.fecha_devolucion).format('DD/MM/YYYY')}
                                    </p>
                                </div>
                                <div style={{ display: 'flex', gap: '10px' }}>
                                    <button onClick={() => handleDevolucion(prestamo.prestamoid, prestamo.edicionid)} style={{
                                        backgroundColor: '#007BFF',
                                        color: 'white',
                                        border: 'none',
                                        borderRadius: '5px',
                                        padding: '10px 15px',
                                        cursor: 'pointer',
                                    }}>
                                        Devolver
                                    </button>
                                    <button onClick={() => {
                                        setReview((prevReview) => {
                                            const updatedReview = {
                                                ...prevReview,
                                                edicionid: prestamo.edicionid,
                                                libroid: prestamo.libroid,
                                            };
                                            console.log('Updated review state:', updatedReview);
                                            return updatedReview;
                                        });
                                        setIsReviewFormVisible(isReviewFormVisible === prestamo.prestamoid ? null : prestamo.prestamoid);
                                    }} style={{
                                        backgroundColor: '#28A745',
                                        color: 'white',
                                        border: 'none',
                                        borderRadius: '5px',
                                        padding: '10px 15px',
                                        cursor: 'pointer',
                                    }}>
                                        {isReviewFormVisible === prestamo.prestamoid ? 'Cancelar Reseña' : 'Hacer Reseña'}
                                    </button>
                                </div>
                            </div>
                            {/* Formulario de reseña para el préstamo seleccionado */}
                            {isReviewFormVisible === prestamo.prestamoid && (
                                <form onSubmit={handleSubmitReview} style={{ marginTop: '10px' }}>
                                    <input
                                        type="number"
                                        name="calificacion"
                                        step="0.1"
                                        min="1"
                                        max="5"
                                        placeholder="Calificación (1.0 - 5.0)"
                                        value={review.calificacion}
                                        onChange={handleInputChange}
                                        required
                                        style={{ marginRight: '10px' }}
                                    />
                                    <textarea
                                        name="comentario"
                                        placeholder="Escribe tu comentario"
                                        value={review.comentario}
                                        onChange={handleInputChange}
                                        required
                                        style={{ display: 'block', margin: '10px 0', width: '100%' }}
                                    />
                                    <button type="submit" style={{
                                        backgroundColor: '#28A745',
                                        color: 'white',
                                        border: 'none',
                                        borderRadius: '5px',
                                        padding: '10px 15px',
                                        cursor: 'pointer'
                                    }}>Enviar Reseña</button>
                                </form>
                            )}
                        </li>
                    ))}
                </ul>
            ) : (
                <p style={{ textAlign: 'center' }}>No tienes préstamos activos.</p>
            )}
        </div>
    );
};

export default GestionarPrestamos;