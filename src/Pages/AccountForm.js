import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../UserContext';
import axiosInstance from "../components/axiosInstance";
import UserInfo from './UserInfo';
import fondo from '../assets/fondo.jpeg';

const AccountForm = () => {
    const { user } = useContext(UserContext);
    const [email, setEmail] = useState(user.correo);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [code, setCode] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [step, setStep] = useState(1);

    const handleEmailSubmit = async (e) => {
        e.preventDefault();
        try {
            await axiosInstance.post('/forgot-password', { email });
            setMessage('Se ha enviado un código de verificación a tu correo electrónico.');
            setStep(2);
        } catch (error) {
            setError('Error al enviar el correo de restablecimiento de contraseña.');
        }
    };

    const handlePasswordSubmit = async (e) => {
        e.preventDefault();
        if (newPassword !== confirmPassword) {
            setError('Las contraseñas no coinciden');
            return;
        }
        try {
            await axiosInstance.post('/reset-password', { email, code, password: newPassword });
            setMessage('Contraseña actualizada con éxito');
            setStep(1);
        } catch (error) {
            setError('Error al restablecer la contraseña');
        }
    };

    return (
        <div className="relative min-h-screen flex items-center justify-center bg-gray-100">
            <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${fondo})` }}>
                <div className="absolute inset-0 bg-gray-900 opacity-60"></div>
            </div>

            <div className="relative flex flex-col md:flex-row w-full max-w-6xl mx-auto z-10 bg-white rounded-3xl shadow-2xl overflow-hidden">
                <aside className="w-full md:w-1/3 bg-gray-100 p-8 flex flex-col items-center justify-center rounded-t-3xl md:rounded-l-3xl md:rounded-tr-none">
                    <UserInfo user={user} />
                </aside>

                <section className="w-full md:w-2/3 p-6 md:p-10 flex flex-col">
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4 md:mb-6">Gestionar Cuenta</h2>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-6">
                        <Link
                            to="edit-name"
                            state={{ user }}
                            className="block bg-blue-500 text-white py-2 md:py-3 rounded-lg shadow-md text-center font-semibold text-base md:text-lg hover:bg-blue-600 transition duration-300"
                        >
                            Editar Usuario
                        </Link>
                        <button
                            onClick={() => setStep(1)}
                            className="block bg-blue-500 text-white py-2 md:py-3 rounded-lg shadow-md text-center font-semibold text-base md:text-lg hover:bg-blue-600 transition duration-300"
                        >
                            Editar Contraseña
                        </button>
                    </div>

                    {message && <p className="text-green-500">{message}</p>}
                    {error && <p className="text-red-500">{error}</p>}

                    {step === 1 && (
                        <form onSubmit={handleEmailSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Correo Electrónico</label>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full p-2 border border-gray-300 rounded"
                                    required
                                />
                            </div>
                            <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">Enviar Código</button>
                        </form>
                    )}

                    {step === 2 && (
                        <form onSubmit={handlePasswordSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Código de Verificación</label>
                                <input
                                    type="text"
                                    value={code}
                                    onChange={(e) => setCode(e.target.value)}
                                    className="w-full p-2 border border-gray-300 rounded"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Nueva Contraseña</label>
                                <input
                                    type="password"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    className="w-full p-2 border border-gray-300 rounded"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Confirmar Nueva Contraseña</label>
                                <input
                                    type="password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    className="w-full p-2 border border-gray-300 rounded"
                                    required
                                />
                            </div>
                            <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">Restablecer Contraseña</button>
                        </form>
                    )}
                </section>
            </div>
        </div>
    );
};

export default AccountForm;