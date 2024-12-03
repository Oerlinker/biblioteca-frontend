import React, { useState, useEffect } from 'react';
import axiosInstance from "../components/axiosInstance";

const ReporteLibro = () => {
    const [libros, setLibros] = useState([]);

    useEffect(() => {
        const fetchLibrosDetalles = async () => {
            try {
                const response = await axiosInstance.get('/libros-detalles');
                setLibros(response.data);
            } catch (error) {
                console.error('Error fetching book details:', error);
            }
        };

        fetchLibrosDetalles();
    }, []);

    return (
        <section className="container mx-auto px-4 flex flex-col items-center">
            <h2 className="text-2xl font-bold text-gray-800 text-center">Detalles de Libros</h2>
            <p className="mt-1 text-sm text-gray-500 text-center">Estos son los detalles de los libros disponibles.</p>

            <div className="flex flex-col mt-6 w-full max-w-3xl">
                <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                        <div className="overflow-hidden border border-gray-200 md:rounded-lg">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th scope="col" className="py-3.5 px-4 text-sm font-normal text-center text-gray-500">
                                            <span>Nombre del Libro</span>
                                        </th>
                                        <th scope="col" className="px-4 py-3.5 text-sm font-normal text-center text-gray-500">
                                            Autor
                                        </th>
                                        <th scope="col" className="px-4 py-3.5 text-sm font-normal text-center text-gray-500">
                                            Número de Edición
                                        </th>
                                        <th scope="col" className="px-4 py-3.5 text-sm font-normal text-center text-gray-500">
                                            Categoría
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {libros.length > 0 ? (
                                        libros.map((libro) => (
                                            <tr key={libro.nombre_libro}>
                                                <td className="px-4 py-4 text-sm font-medium text-gray-800 text-center">{libro.nombre_libro}</td>
                                                <td className="px-4 py-4 text-sm font-medium text-gray-600 text-center">{libro.nombre_autor}</td>
                                                <td className="px-4 py-4 text-sm font-medium text-gray-500 text-center">{libro.numero_edicion}</td>
                                                <td className="px-4 py-4 text-sm font-medium text-gray-500 text-center">{libro.nombre_categoria}</td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="4" className="px-4 py-4 text-center text-sm text-gray-500">
                                                No se encontraron detalles de libros.
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

export default ReporteLibro;