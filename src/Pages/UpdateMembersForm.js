import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../UserContext';
import fondo from '../assets/fondo.jpeg';

const UpdateMembersForm = () => {
    const { user, isLoading } = useContext(UserContext);

    if (isLoading) {
        return <p>Cargando datos...</p>;
    }
    return (
        <div className="relative min-h-screen flex items-center justify-center bg-gray-100">
            <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${fondo})` }}>
                <div className="absolute inset-0 bg-gray-900 opacity-60"></div>
            </div>

            <div className="relative flex flex-col md:flex-row w-full max-w-6xl mx-auto z-10 bg-white rounded-3xl shadow-2xl overflow-hidden">
                <aside className="w-full md:w-1/3 bg-gray-100 p-8 flex flex-col items-center justify-center rounded-t-3xl md:rounded-l-3xl md:rounded-tr-none">
                    <div className="text-center">
                        <h2 className="text-2xl font-bold text-gray-800 mb-4">Datos de Miembro</h2>
                        <p className="text-gray-600">Nombre: {user.nombre}</p>
                        <p className="text-gray-600">Teléfono: {user.telefono}</p>
                        <p className="text-gray-600">Dirección: {user.direccion}</p>
                        <p className="text-gray-600">Carrera: {user.carrera}</p>
                        <p className="text-gray-600">Semestre: {user.semestre}</p>
                    </div>
                </aside>

                <section className="w-full md:w-2/3 p-6 md:p-10 flex flex-col">
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4 md:mb-6">Gestionar Datos de
                        Miembro</h2>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-6">
                        <Link
                            to="edit-name"
                            state={{ user }}
                            className="block bg-blue-500 text-white py-2 md:py-3 rounded-lg shadow-md text-center font-semibold text-base md:text-lg hover:bg-blue-600 transition duration-300"
                        >
                            Editar Nombre
                        </Link>
                        <Link
                            to="edit-phone"
                            state={{ user }}
                            className="block bg-blue-500 text-white py-2 md:py-3 rounded-lg shadow-md text-center font-semibold text-base md:text-lg hover:bg-blue-600 transition duration-300"
                        >
                            Editar Teléfono
                        </Link>
                        <Link
                            to="edit-direction"
                            state={{ user }}
                            className="block bg-blue-500 text-white py-2 md:py-3 rounded-lg shadow-md text-center font-semibold text-base md:text-lg hover:bg-blue-600 transition duration-300"
                        >
                            Editar Dirección
                        </Link>
                        <Link
                            to="edit-career"
                            state={{ user }}
                            className="block bg-blue-500 text-white py-2 md:py-3 rounded-lg shadow-md text-center font-semibold text-base md:text-lg hover:bg-blue-600 transition duration-300"
                        >
                            Editar Carrera
                        </Link>
                        <Link
                            to="edit-semester"
                            state={{ user }}
                            className="block bg-blue-500 text-white py-2 md:py-3 rounded-lg shadow-md text-center font-semibold text-base md:text-lg hover:bg-blue-600 transition duration-300"
                        >
                            Editar Semestre
                        </Link>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default UpdateMembersForm;
