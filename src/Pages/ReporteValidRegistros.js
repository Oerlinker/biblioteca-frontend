import React, { useState, useEffect } from 'react';
import axiosInstance from "../components/axiosInstance";

const ReporteValidRegistros = () => {
    const [registros, setRegistros] = useState([]);
    const [registroNumber, setRegistroNumber] = useState('');

    useEffect(() => {
        const fetchValidRegistros = async () => {
            try {
                const response = await axiosInstance.get('/valid_registros');
                setRegistros(response.data.registros);
            } catch (error) {
                console.error('Error fetching valid registros:', error);
            }
        };

        fetchValidRegistros();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axiosInstance.post('/valid_registros', { registro_number: registroNumber });
            setRegistros([...registros, response.data.registro]);
            setRegistroNumber('');
        } catch (error) {
            console.error('Error creating valid registro:', error);
        }
    };

    return (
        <section className="container mx-auto px-4 flex flex-col items-center">
            <h2 className="text-2xl font-bold text-gray-800 text-center">Valid Registros</h2>
            <p className="mt-1 text-sm text-gray-500 text-center">Estos son los registros válidos disponibles.</p>

            <form onSubmit={handleSubmit} className="mt-4 w-full max-w-md">
                <div className="flex items-center border-b border-b-2 border-teal-500 py-2">
                    <input
                        type="text"
                        value={registroNumber}
                        onChange={(e) => setRegistroNumber(e.target.value)}
                        placeholder="Enter Registro Number"
                        className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                    />
                    <button
                        type="submit"
                        className="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded"
                    >
                        Add
                    </button>
                </div>
            </form>

            <div className="flex flex-col mt-6 w-full max-w-3xl">
                <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                        <div className="overflow-hidden border border-gray-200 md:rounded-lg">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th scope="col" className="py-3.5 px-4 text-sm font-normal text-center text-gray-500">
                                            <span>Registro Number</span>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {registros.length > 0 ? (
                                        registros.map((registro) => (
                                            <tr key={registro.registro_number}>
                                                <td className="px-4 py-4 text-sm font-medium text-gray-800 text-center">{registro.registro_number}</td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="1" className="px-4 py-4 text-center text-sm text-gray-500">
                                                No se encontraron registros válidos.
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

export default ReporteValidRegistros;