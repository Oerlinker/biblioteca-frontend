import React, { useState, useEffect } from 'react';
import axiosInstance from "../components/axiosInstance";

const ReportComments = () => {
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const response = await axiosInstance.get('users/getreport');
                console.log('Datos obtenidos:', response.data); 

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

    const handleEliminarComentario = async (reseñaid) => {
        console.log('Eliminar comentario con ID:', reseñaid);
        try {
            
            await axiosInstance.delete('/users/delComent', { data: { reseñaid } });
            
            
            setReviews(reviews.filter((reseña) => reseña.reseñaid !== reseñaid));
    
            alert('Comentario eliminado con éxito.');
        } catch (error) {
            console.error('Error al eliminar comentario:', error);
            alert('Hubo un error al eliminar el comentario');
        }
    };
    
    const handleConservarComentario = async (reseñaid) => {
        try {
            const response = await axiosInstance.put('/users/ConserComent', { reseñaid });
            console.log('Respuesta:', response);  // Muestra la respuesta completa
            setReviews(reviews.filter((reseña) => reseña.reseñaid !== reseñaid));
            alert('Comentario conservado con éxito.');
        } catch (error) {
            // Log para ver la respuesta completa del error
            console.error('Error al conservar comentario:', error.response ? error.response.data : error.message);
            alert('Hubo un error al conservar el comentario');
        }
    };

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
                            <div className="flex justify-between items-start">
                                <div className="flex flex-col">
                                    <p className="text-gray-900">Nombre del miembro: {reseña.nombre}</p>
                                    <p className="text-gray-900">Fecha de la reseña: {new Date(reseña.fecha_reseña).toLocaleDateString()}</p>
                                    <p className="text-gray-900 mt-2">Comentario: {reseña.comentario}</p>
                                    <p className="text-gray-500 mt-2">Calificación: {isNaN(parseFloat(reseña.calificacion)) || reseña.calificacion === null ? 'N/A' : `${parseFloat(reseña.calificacion).toFixed(1)} ⭐`}</p>
                                </div>
                                <div className="flex flex-col items-center justify-between space-y-2">
                                    <button
                                        onClick={() => handleEliminarComentario(reseña.reseñaid)} // Aquí añades la función para eliminar
                                        className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                                    >
                                        Eliminar
                                    </button>
                                    <button
                                        onClick={() => handleConservarComentario(reseña.reseñaid)} // Aquí añades la función para conservar
                                        className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
                                    >
                                        Conservar
                                    </button>
                                </div>
                            </div>
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
