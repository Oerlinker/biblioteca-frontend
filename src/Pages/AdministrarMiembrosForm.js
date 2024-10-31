import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { UserContext } from '../UserContext';

const AdministrarMiembrosForm = () => {
    const [miembros, setMiembros] = useState([]);
    const { user } = useContext(UserContext);

    useEffect(() => {
        const fetchMiembros = async () => {
            try {
                const response = await axios.get('https://backend-proyecto-production-13fc.up.railway.app/api/users/members');
                setMiembros(response.data);
            } catch (error) {
                console.error('Error fetching members:', error);
            }
        };

        fetchMiembros();
    }, []);

    return (
        <section className="container mx-auto px-4">
            <h2 className="text-lg font-medium text-gray-800 text-center">Miembros</h2>
            <p className="mt-1 text-sm text-gray-500 text-center">Estos son los miembros actuales del sistema.</p>
            <p className="mt-1 text-sm text-gray-500 text-center">Correo del usuario actual: {user.correo}</p>

            <div className="flex flex-col mt-6">
                <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                        <div className="overflow-hidden border border-gray-200 md:rounded-lg">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th scope="col" className="py-3.5 px-4 text-sm font-normal text-center text-gray-500">
                                            <span>Nombre</span>
                                        </th>
                                        <th scope="col" className="px-4 py-3.5 text-sm font-normal text-center text-gray-500">
                                            Correo
                                        </th>
                                        <th scope="col" className="px-4 py-3.5 text-sm font-normal text-center text-gray-500">
                                            Registro
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {miembros.length > 0 ? (
                                        miembros.map((miembro) => (
                                            <tr key={miembro.id}>
                                                <td className="px-4 py-4 text-sm font-medium text-gray-800 text-center">{miembro.nombre}</td>
                                                <td className="px-4 py-4 text-sm font-medium text-gray-600 text-center">{miembro.correo}</td>
                                                <td className="px-4 py-4 text-sm font-medium text-gray-500 text-center">{miembro.registro}</td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="3" className="px-4 py-4 text-center text-sm text-gray-500">
                                                No se encontraron miembros.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AdministrarMiembrosForm;
