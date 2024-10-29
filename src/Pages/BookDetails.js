import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

const BookDetail = () => {
    const { id } = useParams();
    const [book, setBook] = useState(null);
    const [user, setUser] = useState(null);  // Aquí guardaremos la información del usuario
    const [disponible, setDisponible] = useState(false); // Estado para disponibilidad del libro
    const [edicionesDisponibles, setEdicionesDisponibles] = useState([]); // Almacenar ediciones disponibles
    const [edicionSeleccionada, setEdicionSeleccionada] = useState(null);
    
    useEffect(() => {
        const fetchBookDetails = async () => {
            try {
                // Obtener los detalles del libro
                const response = await axios.get(`https://backend-proyecto-production-13fc.up.railway.app/api/libros/${id}`);
                setBook(response.data);
                console.log('Detalles del libro:', response.data);

                // Obtener ediciones disponibles
                const edicionesResponse = await axios.get(`https://backend-proyecto-production-13fc.up.railway.app/api/libros/${id}/ediciones`);
                setEdicionesDisponibles(edicionesResponse.data); 

                // Verificar disponibilidad del libro
                const disponibilidadResponse = await axios.get(`https://backend-proyecto-production-13fc.up.railway.app/api/prestamos/${id}/disponibilidad`);
                setDisponible(disponibilidadResponse.data.disponible);
                console.log('Disponibilidad:', disponibilidadResponse.data);               
            } catch (error) {
                console.error('Error obteniendo los detalles del libro', error);
            }
        };

            //sacar los datos del usuario del token (se necesita el miembroid para poder hacer prestamo)
        const fetchUser = () => {
            const token = localStorage.getItem('token');
            if (token) {
                const decodedToken = jwtDecode(token); // Decodificar el token
                setUser({ id: decodedToken.id, miembroid: decodedToken.miembroid, nombre: decodedToken.nombre, rol: decodedToken.rol, correo: decodedToken.correo });
                console.log('Usuario:', decodedToken);
            }
        };
        
        fetchBookDetails();
        fetchUser();
    }, [id]);

    const handleSolicitarPrestamo = async (edicionidSeleccionada) => {
        if (user && book && disponible) {
            try {
                await axios.post(`https://backend-proyecto-production-13fc.up.railway.app/api/prestamos`, {
                    id: user.id,
                    miembroid: user.miembroid,  
                    edicionid: edicionidSeleccionada, 
                    fechaDevolucion: '2024-12-31' //se puede modificar a conveniencia
                });
                alert('Préstamo solicitado con éxito');
            } catch (error) {
                console.error('Error al solicitar el préstamo:', error);
                alert('Hubo un error al solicitar el préstamo');
            }
        }
    };

    if (!book) {
        return <p>Cargando...</p>;
    }

    const handleEdicionChange = (e) => {
        setEdicionSeleccionada(e.target.value);
    };
    return (
        <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg space-y-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Detalles del Libro</h1>

            <table className="min-w-full bg-gray-50 rounded-lg shadow-lg overflow-hidden">
                <thead>
                    <tr className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
                        <th className="py-3 px-6 text-left font-semibold">Campo</th>
                        <th className="py-3 px-6 text-left font-semibold">Valor</th>
                        
                    </tr>
                </thead>
                <tbody>
                    <tr className="hover:bg-gray-100 transition duration-200">
                        <td className="py-4 px-6 border-b">Título</td>
                        <td className="py-4 px-6 border-b">{book.titulo}</td>
                    </tr>
                    <tr className="hover:bg-gray-100 transition duration-200">
                        <td className="py-4 px-6 border-b">Autor</td>
                        <td className="py-4 px-6 border-b">{book.autorid}</td> 
                    </tr>
                    <tr className="hover:bg-gray-100 transition duration-200">
                        <td className="py-4 px-6 border-b">Género</td>
                        <td className="py-4 px-6 border-b">{book.genero}</td>
                    </tr>
                    <tr className="hover:bg-gray-100 transition duration-200">
                        <td className="py-4 px-6 border-b">Editorial</td>
                        <td className="py-4 px-6 border-b">{book.editorialid}</td> 
                    </tr>
                    <tr className="hover:bg-gray-100 transition duration-200">
                        <td className="py-4 px-6 border-b">Categoría</td>
                        <td className="py-4 px-6 border-b">{book.categoriaid}</td> 
                    </tr>
                    
                    {edicionesDisponibles.length > 0 ? (
                    <div>
                        <label htmlFor="edicion">Selecciona una edición:</label>
                        <select id="edicion" onChange={handleEdicionChange}>
                            <option value="">Selecciona una edición</option>
                            {edicionesDisponibles.map((edicion) => (
                                <option key={edicion.edicionid} value={edicion.edicionid}>
                                    Edición {edicion.numero_edicion} (ISBN: {edicion.isbn})
                                </option>
                            ))}
                        </select>
    
                        {edicionSeleccionada &&  (
                            <button
                                onClick={() => handleSolicitarPrestamo(edicionSeleccionada)}
                                className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
                            >
                                Solicitar Préstamo
                            </button>
                        )}
                    </div>
                ) : (
                    <p className="text-red-500">No hay ediciones disponibles en este momento.</p>
                )}
                </tbody>
            </table>
        </div>
    );
};

export default BookDetail;
