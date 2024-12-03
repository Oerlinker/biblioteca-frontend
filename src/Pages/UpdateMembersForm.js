import React, { useContext, useEffect } from 'react';
import { UserContext } from '../UserContext';
import axiosInstance from '../components/axiosInstance';
import fondo from '../assets/fondo.jpeg';

const UpdateMembersForm = () => {
    const {user, setUser, isLoading, setIsLoading} = useContext(UserContext);

    useEffect(() => {
        const fetchMemberData = async () => {
            if (!user.miembroid) {
                console.error('No se encontró el miembroid en el contexto.');
                return;
            }

            try {
                setIsLoading(true); // Inicia la carga
                const response = await axiosInstance.get(`/users/members/${user.miembroid}`);
                setUser((prevUser) => ({...prevUser, ...response.data}));
            } catch (error) {
                console.error('Error al cargar los datos del miembro:', error);
            } finally {
                setIsLoading(false); // Finaliza la carga
            }
        };

        fetchMemberData();
    }, [user.miembroid, setUser, setIsLoading]);

    if (isLoading) {
        return <p>Cargando datos del miembro...</p>;
    }

    if (!user || !user.miembroid) {
        return <p>Error: No se pudieron cargar los datos del miembro.</p>;
    }
        return (
            <div className="relative min-h-screen flex items-center justify-center bg-gray-100">
                <div className="absolute inset-0 bg-cover bg-center" style={{backgroundImage: `url(${fondo})`}}>
                    <div className="absolute inset-0 bg-gray-900 opacity-60"></div>
                </div>
                <div
                    className="relative flex flex-col md:flex-row w-full max-w-6xl mx-auto z-10 bg-white rounded-3xl shadow-2xl overflow-hidden">
                    <aside
                        className="w-full md:w-1/3 bg-gray-100 p-8 flex flex-col items-center justify-center rounded-t-3xl md:rounded-l-3xl md:rounded-tr-none">
                        <div className="text-center">
                            <h2 className="text-2xl font-bold text-gray-800 mb-4">Datos de Miembro</h2>
                            <p className="text-gray-600">Nombre: {user.nombre}</p>
                            <p className="text-gray-600">Teléfono: {user.telefono || 'No disponible'}</p>
                            <p className="text-gray-600">Dirección: {user.direccion || 'No disponible'}</p>
                            <p className="text-gray-600">Carrera: {user.carrera || 'No disponible'}</p>
                            <p className="text-gray-600">Semestre: {user.semestre || 'No disponible'}</p>
                        </div>
                    </aside>
                </div>
            </div>
        );
};
export default UpdateMembersForm;
