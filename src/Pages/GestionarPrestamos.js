import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import moment from 'moment-timezone';

const GestionarPrestamos = () => {
    const [prestamos, setPrestamos] = useState([]);
    const [user, setUser] = useState(null); 

    useEffect(() => {
        const fetchUser = () => {
            const token = localStorage.getItem('token');
            if (token) {
                const decodedToken = jwtDecode(token);
                setUser({ miembroid: decodedToken.miembroid, nombre: decodedToken.nombre });
                console.log('Usuario:', decodedToken);
            }
        };

        fetchUser();
    }, []);

    // Usar useCallback para memoizar la función fetchPrestamos
    const fetchPrestamos = useCallback(async () => {
        if (!user) return; // Espera a que user esté definido antes de continuar
        const { miembroid } = user;
        try {
            const response = await axios.get(`https://backend-proyecto-production-13fc.up.railway.app/api/users/prestamos/activos/${miembroid}`);
            setPrestamos(response.data);
        } catch (error) {
            console.error('Error al obtener préstamos api:', error);
        }
    }, [user]); // Dependencia de user

    useEffect(() => {
        fetchPrestamos();
    }, [fetchPrestamos]); // Dependencia de fetchPrestamos

    const handleDevolucion = async (prestamoid) => {
        try {
            await axios.post(`https://backend-proyecto-production-13fc.up.railway.app/api/users/prestamos/devolver/${prestamoid}`);
            // Actualiza la lista de préstamos después de la devolución
            setPrestamos((prevPrestamos) => prevPrestamos.filter(p => p.prestamoid !== prestamoid));
            alert('Libro devuelto con éxito.');
        } catch (error) {
            console.error('Error al devolver el libro:', error);
            alert('Error al devolver el libro. Intenta nuevamente.');
        }
    };

    return (
        <div style={{ padding: '20px', maxWidth: '600px', margin: 'auto' }}>
            <h2 style={{ textAlign: 'center' }}>Préstamos Activos</h2>
            {prestamos.length > 0 ? (
                <ul style={{ listStyleType: 'none', padding: 0 }}>
                    {prestamos.map((prestamo) => (
                        <li key={prestamo.prestamoid} style={{
                            padding: '15px',
                            marginBottom: '10px',
                            border: '1px solid #ccc',
                            borderRadius: '5px',
                            backgroundColor: '#f9f9f9',
                            display: 'flex', // Habilita flexbox
                            justifyContent: 'space-between', // Espacio entre los elementos
                            alignItems: 'center' // Centra verticalmente
                        }}>
                            <div>
                                <h4 style={{ margin: '0' }}>{prestamo.titulo}</h4>
                                <p style={{ margin: '5px 0' }}>
                                    <strong>Número de Edición:</strong> {prestamo.numero_edicion}
                                </p>
                                <p style={{ margin: '5px 0' }}>
                                    <strong>Fecha de Devolución:</strong> {moment(prestamo.fecha_devolucion).format('DD/MM/YYYY')}
                                </p>
                            </div>
                            <button onClick={() => handleDevolucion(prestamo.prestamoid)} style={{
                                backgroundColor: '#007BFF',
                                color: 'white',
                                border: 'none',
                                borderRadius: '5px',
                                padding: '10px 15px',
                                cursor: 'pointer',
                            }}>
                                Devolver
                            </button>
                        </li>
                    ))}
                </ul>
            ) : (
                <p style={{ textAlign: 'center' }}>No tienes préstamos activos.</p>
            )}
        </div>
    );
};

export default GestionarPrestamos;