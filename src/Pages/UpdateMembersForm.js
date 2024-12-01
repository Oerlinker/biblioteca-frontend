import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../UserContext';
import fondo from '../assets/fondo.jpeg';

const UpdateMembersForm = () => {
    const { user } = useContext(UserContext);
    const [formData, setFormData] = useState({
        nombre: '',
        telefono: '',
        direccion: '',
        carrera: '',
        semestre: '',
        registro: ''
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`/users/members/${user.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                },
                body: JSON.stringify(formData)
            });
            if (response.ok) {
                navigate('/success');
            } else {
                console.error('Error updating member');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className="relative min-h-screen flex items-center justify-center bg-gray-100">
            <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${fondo})` }}>
                <div className="absolute inset-0 bg-gray-900 opacity-60"></div>
            </div>

            <div className="relative flex flex-col w-full max-w-4xl mx-auto z-10 bg-white rounded-3xl shadow-2xl overflow-hidden">
                <section className="w-full p-6 md:p-10 flex flex-col">
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4 md:mb-6">Actualizar Datos de Miembro</h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {['nombre', 'telefono', 'direccion', 'carrera', 'semestre', 'registro'].map((field) => (
                            <div key={field}>
                                <label className="block text-gray-700">{field.charAt(0).toUpperCase() + field.slice(1)}</label>
                                <input
                                    type="text"
                                    name={field}
                                    value={formData[field]}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                        ))}
                        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-lg shadow-md hover:bg-blue-600 transition duration-300">
                            Actualizar
                        </button>
                    </form>
                </section>
            </div>
        </div>
    );
};

export default UpdateMembersForm;