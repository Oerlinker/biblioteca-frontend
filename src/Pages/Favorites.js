import React, { useState, useEffect, useContext } from 'react';
import axiosInstance from "../components/axiosInstance";
import { Link } from 'react-router-dom';
import { UserContext } from '../UserContext';

const Favorites = () => {
    const { user } = useContext(UserContext);
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        const fetchFavorites = async () => {
            try {
                const response = await axiosInstance.get(`/users/favoritos/${user.id}`);
                setFavorites(response.data.favoritos);
            } catch (error) {
                console.error('Error fetching favorites:', error);
            }
        };

        fetchFavorites();
    }, [user.id]);

    return (
        <div className="flex flex-col items-center justify-center px-4 py-8 min-h-screen bg-gray-50">
            <h2 className="text-2xl md:text-4xl font-semibold text-center mb-8 text-blue-700">Tus Libros Favoritos</h2>
            {favorites.length > 0 ? (
                <ul className="w-full max-w-2xl mt-8">
                    {favorites.map((book) => (
                        <li
                            key={book.libroid}
                            className="bg-white border border-gray-200 rounded-lg p-4 mb-4 shadow-sm hover:shadow-md transition-shadow duration-200"
                        >
                            <Link to={`/libro/${book.libroid}`} className="text-lg font-medium text-blue-600 hover:underline">
                                {book.titulo}
                            </Link>
                            <p className="text-gray-500 mt-2">
                                Calificación: {isNaN(parseFloat(book.calificacion)) || book.calificacion === null ? 'N/A' : `${parseFloat(book.calificacion).toFixed(1)} ⭐`}
                            </p>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="text-center text-gray-500 mt-10">No tienes libros favoritos.</p>
            )}
        </div>
    );
};

export default Favorites;