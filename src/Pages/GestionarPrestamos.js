import React, { useEffect, useState, useContext, useCallback } from 'react';
import moment from 'moment-timezone';
import axiosInstance from "../components/axiosInstance";
import { UserContext } from '../UserContext';
import VerPdf from './VerPdf';

const GestionarPrestamos = () => {
    const { user } = useContext(UserContext);
    const [prestamos, setPrestamos] = useState([]);
    const [isReviewFormVisible, setIsReviewFormVisible] = useState(false);
    const [review, setReview] = useState({
        edicionid: null,
        libroid: null,
        calificacion: 0,
        comentario: '',
    });
    const [showPdf, setShowPdf] = useState(null);

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

    const togglePdfView = (edicionId) => {
        setShowPdf(showPdf === edicionId ? null : edicionId);
    };

    return (
        <div className="container mx-auto px-4 py-6 max-w-3xl">
            <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">Préstamos Activos</h2>

            {successMessage && (
                <div className="bg-green-100 text-green-800 font-medium px-4 py-3 rounded mb-5 text-center">
                    {successMessage}
                </div>
            )}

            <ul className="space-y-6">
                {prestamos.map((prestamo) => (
                    <li key={prestamo.prestamoid} className="p-4 border border-gray-200 rounded-lg bg-white shadow-lg">
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                            <div className="mb-3 md:mb-0">
                                <h4 className="font-semibold text-xl text-gray-700">{prestamo.titulo}</h4>
                                <p className="text-gray-600 mt-1"><strong>Edición:</strong> {prestamo.numero_edicion}</p>
                                <p className="text-gray-600"><strong>Devolución:</strong> {moment(prestamo.fecha_devolucion).format('DD/MM/YYYY')}</p>
                            </div>
                            <div className="flex space-x-2">
                                <button
                                    onClick={() => handleDevolucion(prestamo.prestamoid)}
                                    className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded-lg transition duration-200"
                                >
                                    Devolver
                                </button>
                                <button
                                    onClick={() => togglePdfView(prestamo.edicionid)}
                                    className="bg-teal-500 hover:bg-teal-600 text-white font-semibold px-4 py-2 rounded-lg transition duration-200"
                                >
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
                                    className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold px-4 py-2 rounded-lg transition duration-200"
                                >
                                    Reseñar
                                </button>
                            </div>
                        </div>
                        {showPdf === prestamo.edicionid && (
                            <div className="mt-6">
                                <VerPdf edicionId={prestamo.edicionid} />
                            </div>
                        )}
                    </li>
                ))}
            </ul>

            {isReviewFormVisible && (
                <form onSubmit={handleReviewSubmit} className="mt-8 p-6 border border-gray-200 rounded-lg shadow-lg bg-white max-w-md mx-auto">
                    <h3 className="text-lg font-semibold mb-4 text-gray-800">Enviar Reseña</h3>
                    <label className="block mb-2 text-gray-700 font-medium">Calificación (1-5):</label>
                    <input
                        type="number"
                        min="1"
                        max="5"
                        value={review.calificacion}
                        onChange={(e) => setReview({ ...review, calificacion: e.target.value })}
                        className="w-full mb-4 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <label className="block mb-2 text-gray-700 font-medium">Comentario:</label>
                    <textarea
                        value={review.comentario}
                        onChange={(e) => setReview({ ...review, comentario: e.target.value })}
                        className="w-full mb-4 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <div className="flex justify-end space-x-3">
                        <button type="submit" className="bg-green-500 hover:bg-green-600 text-white font-semibold px-4 py-2 rounded-lg transition duration-200">
                            Enviar Reseña
                        </button>
                        <button
                            type="button"
                            onClick={() => setIsReviewFormVisible(false)}
                            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold px-4 py-2 rounded-lg transition duration-200"
                        >
                            Cancelar
                        </button>
                    </div>
                </form>
            )}
        </div>
    );
};

export default GestionarPrestamos;