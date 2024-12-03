import React, { useEffect, useState, useContext, useCallback } from 'react';
import moment from 'moment-timezone';
import axiosInstance from "../components/axiosInstance";
import { UserContext } from '../UserContext';
import VerPdf from './VerPdf';

const GestionarPrestamos = () => {
    const { user } = useContext(UserContext);
    const [prestamos, setPrestamos] = useState([]);
    const [isReviewFormVisible, setIsReviewFormVisible] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [review, setReview] = useState({
        edicionid: null,
        libroid: null,
        calificacion: 0,
        comentario: '',
    });
    const [showPdf, setShowPdf] = useState(null); // Track which PDF is being shown

    const fetchPrestamos = useCallback(async () => {
        if (!user || !user.miembroid) {
            console.error("miembroid no está definido");
            return;
        }
        try {
            const response = await axiosInstance.get(`/users/prestamos/activos/${user.miembroid}`);
            setPrestamos(response.data);
        } catch (error) {
            console.error('Error al obtener préstamos:', error);
        }
    }, [user]);

    useEffect(() => {
        fetchPrestamos();
    }, [user, fetchPrestamos]);

    const handleDevolucion = async (prestamoid) => {
        try {
            await axiosInstance.post(`users/prestamos/devolver/${prestamoid}`);
            setPrestamos((prevPrestamos) => prevPrestamos.filter(p => p.prestamoid !== prestamoid));
            alert('Libro devuelto con éxito.');
        } catch (error) {
            console.error('Error al devolver el libro:', error);
            alert('Error al devolver el libro. Intenta nuevamente.');
        }
    };

    const handleSolicitudExtension = async (prestamoid) => {
        try {
            const response = await axiosInstance.post(`/users/prestamos/solicitar-extension/${prestamoid}`);
            alert('Extensión solicitada con éxito.');
            // Actualizar la lista de préstamos con la nueva fecha de devolución
            const updatedPrestamos = prestamos.map(p => 
                p.prestamoid === prestamoid ? { ...p, fecha_devolucion: response.data.fecha_devolucion } : p
            );
            setPrestamos(updatedPrestamos);
        } catch (error) {
            console.error('Error al solicitar la extensión:', error);
            alert('No se pudo solicitar la extensión. Intenta nuevamente.');
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
        try {
            await axiosInstance.post(`users/review`, {
                id: user.id,
                miembroid: user.miembroid,
                edicionid: review.edicionid,
                libroid: review.libroid,
                calificacion: review.calificacion,
                comentario: review.comentario,
            });
            setReview({ edicionid: null, libroid: null, calificacion: 0, comentario: '' });
            setIsReviewFormVisible(false);
            fetchPrestamos();
            setSuccessMessage('¡Reseña enviada con éxito!');
            setTimeout(() => {
                setSuccessMessage('');
            }, 3000);
        } catch (error) {
            console.error('Error al enviar la reseña:', error);
        }
    };

    const togglePdfView = (edicionId) => {
        setShowPdf(showPdf === edicionId ? null : edicionId); // Toggle the PDF viewer
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
                                    <button onClick={() => handleDevolucion(prestamo.prestamoid)} style={{
                                        backgroundColor: '#007BFF',
                                        color: 'white',
                                        border: 'none',
                                        borderRadius: '5px',
                                        padding: '10px 15px',
                                        cursor: 'pointer',
                                    }}>
                                        Devolver
                                    </button>
                                    <button onClick={() => handleSolicitudExtension(prestamo.prestamoid)} style={{
                                        backgroundColor: '#FFC107',
                                        color: 'white',
                                        border: 'none',
                                        borderRadius: '5px',
                                        padding: '10px 15px',
                                        cursor: 'pointer',
                                    }}>
                                        Solicitar Extensión
                                    </button>
                                    <button onClick={() => togglePdfView(prestamo.edicionid)} style={{
                                        backgroundColor: '#17a2b8',
                                        color: 'white',
                                        border: 'none',
                                        borderRadius: '5px',
                                        padding: '10px 15px',
                                        cursor: 'pointer',
                                    }}>
                                        {showPdf === prestamo.edicionid ? 'Cerrar PDF' : 'Ver PDF'}
                                    </button>
                                </div>
                            </div>
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
