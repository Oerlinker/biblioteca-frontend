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
    const [showPdf, setShowPdf] = useState(null);

    // Function to check if the device is mobile
    const isMobileDevice = () => {
        return /Mobi|Android/i.test(navigator.userAgent);
    };

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
            setSuccessMessage('Libro devuelto con éxito.');
            setTimeout(() => setSuccessMessage(''), 3000);
        } catch (error) {
            console.error('Error al devolver el libro:', error);
            alert('Error al devolver el libro. Intenta nuevamente.');
        }
    };

    const togglePdfView = (edicionId, pdfUrl) => {
        if (isMobileDevice()) {
            // Open the PDF in a new tab on mobile devices
            window.open(pdfUrl, '_blank');
        } else {
            // Toggle inline PDF view for desktop
            setShowPdf(showPdf === edicionId ? null : edicionId);
        }
    };

    const handleReviewSubmit = async (e) => {
        e.preventDefault();
        try {
            await axiosInstance.post(`reviews/${review.edicionid}`, {
                calificacion: review.calificacion,
                comentario: review.comentario,
                libroid: review.libroid,
            });
            setSuccessMessage('Reseña enviada con éxito.');
            setTimeout(() => setSuccessMessage(''), 3000);
            setReview({
                edicionid: null,
                libroid: null,
                calificacion: 0,
                comentario: '',
            });
            setIsReviewFormVisible(false);
        } catch (error) {
            console.error('Error al enviar reseña:', error);
        }
    };

    return (
        <div className="container mx-auto p-4 max-w-4xl">
            <h2 className="text-2xl font-semibold text-center mb-8">Préstamos Activos</h2>
            {successMessage && (
                <div className="bg-green-100 text-green-700 px-4 py-2 rounded mb-4 text-center">
                    {successMessage}
                </div>
            )}
            <ul className="space-y-4">
                {prestamos.map((prestamo) => (
                    <li key={prestamo.prestamoid} className="p-4 border rounded-md bg-white shadow-md">
                        <div className="flex flex-col md:flex-row justify-between">
                            <div>
                                <h4 className="font-semibold text-lg">{prestamo.titulo}</h4>
                                <p><strong>Número de Edición:</strong> {prestamo.numero_edicion}</p>
                                <p><strong>Fecha de Devolución:</strong> {moment(prestamo.fecha_devolucion).format('DD/MM/YYYY')}</p>
                            </div>
                            <div className="mt-4 md:mt-0 flex space-x-2">
                                <button onClick={() => handleDevolucion(prestamo.prestamoid)} className="bg-blue-500 text-white px-3 py-1 rounded text-sm md:text-base">
                                    Devolver
                                </button>
                                <button onClick={() => togglePdfView(prestamo.edicionid, prestamo.pdfUrl)} className="bg-teal-500 text-white px-3 py-1 rounded text-sm md:text-base">
                                    {showPdf === prestamo.edicionid ? 'Cerrar PDF' : 'Ver PDF'}
                                </button>
                                <button
                                    onClick={() => {
                                        setIsReviewFormVisible(true);
                                        setReview((prev) => ({
                                            ...prev,
                                            edicionid: prestamo.edicionid,
                                            libroid: prestamo.libroid,
                                        }));
                                    }}
                                    className="bg-yellow-500 text-white px-3 py-1 rounded text-sm md:text-base"
                                >
                                    Reseñar
                                </button>
                            </div>
                        </div>
                        {showPdf === prestamo.edicionid && !isMobileDevice() && (
                            <div className="mt-4">
                                <VerPdf edicionId={prestamo.edicionid} />
                            </div>
                        )}
                    </li>
                ))}
            </ul>

            {isReviewFormVisible && (
                <form onSubmit={handleReviewSubmit} className="mt-8 p-4 border rounded-md shadow-md bg-white max-w-md mx-auto">
                    <h3 className="text-lg font-semibold mb-4">Enviar Reseña</h3>
                    <label className="block mb-2">Calificación (1-5):</label>
                    <input
                        type="number"
                        min="1"
                        max="5"
                        value={review.calificacion}
                        onChange={(e) => setReview({ ...review, calificacion: e.target.value })}
                        className="w-full mb-4 p-2 border rounded"
                    />
                    <label className="block mb-2">Comentario:</label>
                    <textarea
                        value={review.comentario}
                        onChange={(e) => setReview({ ...review, comentario: e.target.value })}
                        className="w-full mb-4 p-2 border rounded"
                    />
                    <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">Enviar Reseña</button>
                    <button
                        type="button"
                        onClick={() => setIsReviewFormVisible(false)}
                        className="ml-2 bg-gray-300 px-4 py-2 rounded"
                    >
                        Cancelar
                    </button>
                </form>
            )}
        </div>
    );
};

export default GestionarPrestamos;
