import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdministrarMiembrosForm = () => {
    const [miembros, setMiembros] = useState([]);

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
        <section className="container px-4 mx-auto">
            <h2 className="text-lg font-medium text-gray-800 dark:text-white">Miembros</h2>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-300">Estos son los miembros actuales del sistema.</p>

            <div className="flex flex-col mt-6">
                <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                        <div className="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">

                            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                <thead className="bg-gray-50 dark:bg-gray-800">
                                <tr>
                                    <th scope="col" className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                        <span>Nombre</span>
                                    </th>
                                    <th scope="col" className="px-12 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                        Correo
                                    </th>
                                    <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                        Rol
                                    </th>
                                </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
                                {miembros.length > 0 ? (
                                    miembros.map((miembro) => (
                                        <tr key={miembro.id}>
                                            <td className="px-4 py-4 text-sm font-medium text-gray-800 dark:text-white">{miembro.nombre}</td>
                                            <td className="px-12 py-4 text-sm font-medium text-gray-600 dark:text-gray-400">{miembro.correo}</td>
                                            <td className="px-4 py-4 text-sm font-medium text-gray-500 dark:text-gray-400">{miembro.registro}</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="3" className="px-4 py-4 text-center text-sm text-gray-500 dark:text-gray-300">
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
