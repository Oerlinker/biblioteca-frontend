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

    const togglePdfView = (edicionId) => {
        setShowPdf(showPdf === edicionId ? null : edicionId);
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
                                <button onClick={() => togglePdfView(prestamo.edicionid)} className="bg-teal-500 text-white px-3 py-1 rounded">
                                    {showPdf === prestamo.edicionid ? 'Cerrar PDF' : 'Ver PDF'}
                                </button>
                            </div>
                        </div>
                        {showPdf === prestamo.edicionid && (
                            <div className="mt-4">
                                <VerPdf edicionId={prestamo.edicionid} />
                            </div>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default GestionarPrestamos;
