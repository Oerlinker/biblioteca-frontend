import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import fondo from '../assets/fondo.jpeg';
import axiosInstance from "../components/axiosInstance"; // Imagen de fondo

const Register = () => {
    const [nombre, setNombre] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axiosInstance.post('https://backend-proyecto-production-13fc.up.railway.app/api/register', { nombre, email, password });
            setMessage('Registro exitoso');
            setTimeout(() => {
                navigate('/login');
            }, 2000);
        } catch (error) {
            setMessage('Error en el registro');
        }
    };

    return (
        <div className="relative flex items-center justify-center min-h-screen bg-gray-900">
            {/* Imagen de fondo */}
            <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${fondo})` }}>
                <div className="absolute inset-0 bg-gray-900 opacity-50"></div> {/* Filtro oscuro */}
            </div>

            {/* Formulario */}
            <div className="relative bg-white p-10 rounded-xl shadow-xl w-full max-w-md">
                <h2 className="text-center text-4xl font-extrabold text-gray-800 mb-6">Crear Cuenta</h2>
                <p className="text-center text-gray-500 mb-6">Regístrate para acceder a la plataforma</p>
                {message && (
                    <p className={`text-center mb-4 ${message === 'Registro exitoso' ? 'text-green-500' : 'text-red-500'}`}>
                        {message}
                    </p>
                )}
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="relative">
                        <label className="block text-sm font-semibold text-gray-700">Usuario</label>
                        <input
                            type="text"
                            value={nombre}
                            onChange={(e) => setNombre(e.target.value)}
                            className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-lightblue-500 transition"
                            placeholder="Usuario"
                            required
                        />
                    </div>
                    <div className="relative">
                        <label className="block text-sm font-semibold text-gray-700">Correo Electrónico</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-lightblue-500 transition"
                            placeholder="tucorreo@example.com"
                            required
                        />
                    </div>
                    <div className="relative">
                        <label className="block text-sm font-semibold text-gray-700">Contraseña</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-lightblue-500 transition"
                            placeholder="********"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full py-3 bg-lightblue-500 text-white rounded-lg font-semibold shadow-md">
                        Registrar
                    </button>
                </form>
                <div className="mt-6 text-center">
                    <p className="text-gray-600">¿Ya tienes una cuenta? <a href="/login" className="text-lightblue-500">Inicia sesión</a></p>
                </div>
            </div>
        </div>
    );
};

export default Register;
