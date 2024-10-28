// src/Pages/SubscriptionForm.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import fondo from '../assets/fondo.jpeg';

const SubscriptionForm = ({ user }) => {
    const [telefono, setTelefono] = useState('');
    const [direccion, setDireccion] = useState('');
    const [carrera, setCarrera] = useState('');
    const [semestre, setSemestre] = useState('');
    const [registro, setRegistro] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        if (user.rol === 2) {
            navigate('/'); // Redirect to home or another page
        }
    }, [user, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('https://backend-proyecto-production-13fc.up.railway.app/api/subscripciones', {
                usuarioid: user.id,
                telefono,
                direccion,
                carrera,
                semestre,
                registro,
                fecha_inicio: new Date(),
                fecha_fin: new Date(new Date().setFullYear(new Date().getFullYear() + 1)),
                estado: 'Activa'
            });
            alert('Suscripción creada con éxito');
        } catch (error) {
            console.error('Error creando la suscripción', error);
            alert('Error creando la suscripción');
        }
    };

    return (
        <div className="relative flex items-center justify-center min-h-screen bg-gray-900">
            {/* Imagen de fondo */}
            <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${fondo})` }}>
                <div className="absolute inset-0 bg-gray-900 opacity-50"></div> {/* Filtro oscuro */}
            </div>

            {/* Formulario */}
            <div className="relative bg-white p-10 rounded-xl shadow-lg w-full max-w-md">
                <h2 className="text-center text-3xl font-bold text-gray-700 mb-6">Registrar Suscripción</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="text"
                        value={telefono}
                        onChange={(e) => setTelefono(e.target.value)}
                        placeholder="Teléfono"
                        className="border border-gray-300 rounded-md py-2 px-4 w-full"
                    />
                    <input
                        type="text"
                        value={direccion}
                        onChange={(e) => setDireccion(e.target.value)}
                        placeholder="Dirección"
                        className="border border-gray-300 rounded-md py-2 px-4 w-full"
                    />
                    <input
                        type="text"
                        value={carrera}
                        onChange={(e) => setCarrera(e.target.value)}
                        placeholder="Carrera"
                        className="border border-gray-300 rounded-md py-2 px-4 w-full"
                    />
                    <input
                        type="text"
                        value={semestre}
                        onChange={(e) => setSemestre(e.target.value)}
                        placeholder="Semestre"
                        className="border border-gray-300 rounded-md py-2 px-4 w-full"
                    />
                    <input
                        type="text"
                        value={registro}
                        onChange={(e) => setRegistro(e.target.value)}
                        placeholder="Registro"
                        className="border border-gray-300 rounded-md py-2 px-4 w-full"
                    />
                    <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600">
                        Registrar Suscripción
                    </button>
                </form>
            </div>
        </div>
    );
};

export default SubscriptionForm;