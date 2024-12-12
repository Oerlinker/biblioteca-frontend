import React, { useState, useEffect } from 'react';
import axiosInstance from "../components/axiosInstance";

const ReportComments = () => {
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const response = await axiosInstance.get('users/getreport');
                console.log('Datos obtenidos:', response.data); // Log para ver los datos obtenidos

                // Accede a los datos en response.data.body
                if (Array.isArray(response.data.body)) {
                    setReviews(response.data.body);
                    console.log('Longitud de reviews:', response.data.body.length); // Añade este log
                } else {
                    console.error('La respuesta no contiene un array en body:', response.data);
                }
            } catch (error) {
                console.error('Error fetching reviews:', error);
            }
        };

        fetchReviews();
    }, []);

    return (
        <div className="flex flex-col items-center justify-center px-4 py-8 min-h-screen bg-gray-50">
            <h2 className="text-2xl md:text-4xl font-semibold text-center mb-8 text-blue-700">Comentarios reportados</h2>

            {reviews.length > 0 ? (
                <ul className="w-full max-w-2xl mt-8">
                    {reviews.map((reseña) => (
                        <li
                            key={reseña.reseñaid}
                            className="bg-white border border-gray-200 rounded-lg p-4 mb-4 shadow-sm hover:shadow-md transition-shadow duration-200"
                        >
                            <p className="text-gray-900">Nombre del miembro: {reseña.nombre}</p>
                            <p className="text-gray-900">Fecha de la reseña: {new Date(reseña.fecha_reseña).toLocaleDateString()}</p>
                            <p className="text-gray-900 mt-2">Comentario: {reseña.comentario}</p>
                            <p className="text-gray-500 mt-2">Calificación: {isNaN(parseFloat(reseña.calificacion)) || reseña.calificacion === null ? 'N/A' : `${parseFloat(reseña.calificacion).toFixed(1)} ⭐`}</p>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="text-center text-gray-500 mt-10">No se encontraron comentarios reportados.</p>
            )}
        </div>
    );
};

export default ReportComments;
