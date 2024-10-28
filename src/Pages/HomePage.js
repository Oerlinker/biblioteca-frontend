// src/Pages/HomePage.js
import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';

const HomePage = () => {
    return (
        <div className="min-h-screen bg-gray-100 flex flex-col">
            <Navbar />
            <header className="w-full bg-blue-500 text-white py-4 shadow-md">
                <h1 className="text-4xl font-bold text-center">Bienvenido a la Biblioteca</h1>
            </header>
            <main className="flex flex-col items-center mt-10 space-y-6 flex-grow">
                <p className="text-xl text-gray-700 text-center max-w-2xl">
                    Explora nuestra colección de libros y encuentra tu próxima lectura favorita.
                </p>
                <Link
                    to="/books"
                    className="bg-blue-500 text-white py-3 px-6 rounded-lg shadow-md hover:bg-blue-600 transition duration-300"
                >
                    Ver Libros
                </Link>
            </main>
            <footer className="w-full bg-gray-900 text-white py-4 mt-auto">
                <p className="text-center">&copy; 2023 Biblioteca. Todos los derechos reservados.</p>
            </footer>
        </div>
    );
};

export default HomePage;