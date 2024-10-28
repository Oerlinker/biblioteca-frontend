// src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className="bg-blue-500 p-4 shadow-md">
            <div className="container mx-auto flex justify-between items-center">
                <Link to="/" className="text-white text-2xl font-bold">Biblioteca</Link>
                <div className="space-x-4">
                    <Link to="/" className="text-white hover:text-gray-300">Home</Link>
                    <Link to="/books" className="text-white hover:text-gray-300">Books</Link>
                    <Link to="/account" className="text-white hover:text-gray-300">Account</Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;