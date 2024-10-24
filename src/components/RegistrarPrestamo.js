import React, { useState } from 'react';
import axios from 'axios';

const RegistrarPrestamo = () => {
    const [miembroID, setMiembroID] = useState('');
    const [edicionID, setEdicionID] = useState('');
    const [fechaPrestamo, setFechaPrestamo] = useState('');
    const [fechaDevolucion, setFechaDevolucion] = useState('');
    const [estado, setEstado] = useState('');
    const [libroID, setLibroID] = useState('');
    const [prestamoID, setPrestamoID] = useState(null);

    const handlePrestamoSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/api/prestamos', {
                miembroID,
                edicionID,
                fechaPrestamo,
                fechaDevolucion,
                estado
            });
            setPrestamoID(response.data.prestamoid);
            alert('Préstamo creado con éxito!');
        } catch (error) {
            console.error('Error creando el préstamo:', error);
            alert('Error creando el préstamo');
        }
    };

    const handleLibroSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:3000/api/libroprestamo', {
                libroID,
                prestamoID
            });
            alert('Libro registrado en el préstamo con éxito!');
        } catch (error) {
            console.error('Error registrando el libro en el préstamo:', error);
            alert('Error registrando el libro en el préstamo');
        }
    };

    return (
        <div>
            <h2>Registrar Préstamo</h2>
            <form onSubmit={handlePrestamoSubmit}>
                <div>
                    <label>ID Miembro:</label>
                    <input
                        type="number"
                        value={miembroID}
                        onChange={(e) => setMiembroID(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>ID Edición:</label>
                    <input
                        type="number"
                        value={edicionID}
                        onChange={(e) => setEdicionID(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Fecha Préstamo:</label>
                    <input
                        type="date"
                        value={fechaPrestamo}
                        onChange={(e) => setFechaPrestamo(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Fecha Devolución:</label>
                    <input
                        type="date"
                        value={fechaDevolucion}
                        onChange={(e) => setFechaDevolucion(e.target.value)}
                    />
                </div>
                <div>
                    <label>Estado:</label>
                    <input
                        type="text"
                        value={estado}
                        onChange={(e) => setEstado(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Crear Préstamo</button>
            </form>

            {prestamoID && (
                <form onSubmit={handleLibroSubmit}>
                    <h3>Registrar Libro en el Préstamo</h3>
                    <div>
                        <label>ID Libro:</label>
                        <input
                            type="number"
                            value={libroID}
                            onChange={(e) => setLibroID(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit">Registrar Libro</button>
                </form>
            )}
        </div>
    );
};

export default RegistrarPrestamo;

