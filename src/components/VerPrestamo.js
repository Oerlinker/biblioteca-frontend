import React, { useState, useEffect } from 'react';
import axios from 'axios';

const VerPrestamos = () => {
    const [prestamos, setPrestamos] = useState([]);

    useEffect(() => {
        const fetchPrestamos = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/prestamos');
                setPrestamos(response.data);
            } catch (error) {
                console.error('Error obteniendo préstamos:', error);
            }
        };
        fetchPrestamos();
    }, []);

    return (
        <div>
            <h2>Lista de Préstamos</h2>
            {prestamos.length === 0 ? (
                <p>No hay préstamos registrados.</p>
            ) : (
                <ul>
                    {prestamos.map((prestamo) => (
                        <li key={prestamo.prestamoid}>
                            Préstamo ID: {prestamo.prestamoid}, Miembro ID: {prestamo.miembroid}, Edición ID: {prestamo.edicionid}, Fecha Préstamo: {prestamo.fecha_prestamo}, Estado: {prestamo.estado}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default VerPrestamos;