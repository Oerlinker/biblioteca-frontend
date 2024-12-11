import React, { useState, useEffect, useContext } from 'react';
import axiosInstance from "../components/axiosInstance";
import { UserContext } from '../UserContext';
import { useNavigate } from 'react-router-dom';

const ReportedReviews = () => {
    const [reportedReviews, setReportedReviews] = useState([]);
    const { user } = useContext(UserContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (!user || (user.rol !== 3 && user.rol !== 4)) {
            navigate('/');
            return;
        }

        const fetchReportedReviews = async () => {
            try {
                const response = await axiosInstance.get('/reseñas/reportadas', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('Token')}`,
                    },
                });
                setReportedReviews(response.data);
            } catch (error) {
                console.error('Error fetching reported reviews:', error);
            }
        };

        fetchReportedReviews();
    }, [user, navigate]);

    const handleDeleteReview = async (reviewId, editionId, bookId) => {
        try {
            const response = await axiosInstance.delete(
                `/reseñas/${reviewId}/${editionId}/${bookId}`,
                {
                    headers: { Authorization: `Bearer ${localStorage.getItem('Token')}` },
                }
            );
            if (response.status === 200) {
                alert('Reseña eliminada con éxito');
                setReportedReviews(reportedReviews.filter(review => review.reseñaid !== reviewId));
            } else {
                alert('Hubo un problema al eliminar la reseña');
            }
        } catch (error) {
            console.error('Error al eliminar la reseña:', error);
            alert('Hubo un error al eliminar la reseña');
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 p-8 flex flex-col items-center">
            <div className="bg-white border p-6 rounded-lg shadow-lg max-w-3xl w-full">
                <h2 className="text-4xl font-bold text-gray-800 mb-4 text-center">Reseñas Reportadas</h2>
                {reportedReviews.length > 0 ? (
                    <div className="space-y-4">
                        {reportedReviews.map(review => (
                            <div key={review.reseñaid} className="bg-gray-100 p-4 rounded shadow">
                                <p className="text-gray-700"><strong>ID:</strong> {review.reseñaid}</p>
                                <p className="text-gray-700"><strong>Comentario:</strong> {review.comentario}</p>
                                <button
                                    onClick={() => handleDeleteReview(review.reseñaid, review.edicionid, review.libroid)}
                                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                                >
                                    Eliminar Reseña
                                </button>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-gray-500">No hay reseñas reportadas.</p>
                )}
            </div>
        </div>
    );
};

export default ReportedReviews;
