import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EdicionForm = () => {
    const [ediciones, setEdiciones] = useState([]);
    const [edicionid, setEdicionid] = useState('');
    const [isbn, setIsbn] = useState('');
    const [numeroEdicion, setNumeroEdicion] = useState('');
    const [fechaPublicacion, setFechaPublicacion] = useState('');
    const [libroid, setLibroid] = useState('');
    const [proveedorid, setProveedorid] = useState('');
    const [totalPrestamos, setTotalPrestamos] = useState('');
    const [promedioRating, setPromedioRating] = useState('');
    const [edicionID, setEdicionID] = useState(null);

    // Fetch ediciones
    const fetchEdiciones = async () => {
        try {
            const response = await axios.get('https://backend-proyecto-production-13fc.up.railway.app/api/ediciones');
            setEdiciones(response.data);
        } catch (error) {
            console.error('Error obteniendo las ediciones:', error);
        }
    };

    useEffect(() => {
        fetchEdiciones();
    }, []);

    // Insertar edicion
    const insertarEdicion = async () => {
        try {
            await axios.post('https://backend-proyecto-production-13fc.up.railway.app/api/ediciones', {
                edicionid,
                isbn,
                numero_edicion: numeroEdicion,
                fecha_publicacion: fechaPublicacion,
                libroid,
                proveedorid,
                total_prestamos: totalPrestamos,
                promedio_rating: promedioRating
            });
            setEdicionid('');
            setIsbn('');
            setNumeroEdicion('');
            setFechaPublicacion('');
            setLibroid('');
            setProveedorid('');
            setTotalPrestamos('');
            setPromedioRating('');
            fetchEdiciones();
        } catch (error) {
            console.error('Error insertando la edición:', error);
        }
    };

    // Actualizar edicion
    const actualizarEdicion = async () => {
        try {
            await axios.put(`https://backend-proyecto-production-13fc.up.railway.app/api/ediciones/${edicionID}`, {
                edicionid,
                isbn,
                numero_edicion: numeroEdicion,
                fecha_publicacion: fechaPublicacion,
                libroid,
                proveedorid,
                total_prestamos: totalPrestamos,
                promedio_rating: promedioRating
            });
            setEdicionid('');
            setIsbn('');
            setNumeroEdicion('');
            setFechaPublicacion('');
            setLibroid('');
            setProveedorid('');
            setTotalPrestamos('');
            setPromedioRating('');
            setEdicionID(null);
            fetchEdiciones();
        } catch (error) {
            console.error('Error actualizando la edición:', error);
        }
    };

    // Eliminar edicion
    const eliminarEdicion = async (id) => {
        try {
            await axios.delete(`https://backend-proyecto-production-13fc.up.railway.app/api/ediciones/${id}`);
            fetchEdiciones();
        } catch (error) {
            console.error('Error eliminando la edición:', error);
        }
    };

    // Manejar el submit del formulario
    const handleSubmit = (e) => {
        e.preventDefault();
        if (edicionID) {
            actualizarEdicion();
        } else {
            insertarEdicion();
        }
    };

    // Manejar la selección de una edición para editar
    const handleEdit = (edicion) => {
        setEdicionid(edicion.edicionid);
        setIsbn(edicion.isbn);
        setNumeroEdicion(edicion.numero_edicion);
        setFechaPublicacion(edicion.fecha_publicacion);
        setLibroid(edicion.libroid);
        setProveedorid(edicion.proveedorid);
        setTotalPrestamos(edicion.total_prestamos);
        setPromedioRating(edicion.promedio_rating);
        setEdicionID(edicion.edicionid);
    };

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-3xl font-bold text-center mb-6">Gestionar Ediciones</h2>
            <form onSubmit={handleSubmit} className="mb-4">
                <input
                    type="text"
                    value={edicionid}
                    onChange={(e) => setEdicionid(e.target.value)}
                    placeholder="ID de la edición"
                    className="border border-gray-300 rounded-md py-2 px-4 w-full mb-2"
                />
                <input
                    type="text"
                    value={isbn}
                    onChange={(e) => setIsbn(e.target.value)}
                    placeholder="ISBN"
                    className="border border-gray-300 rounded-md py-2 px-4 w-full mb-2"
                />
                <input
                    type="text"
                    value={numeroEdicion}
                    onChange={(e) => setNumeroEdicion(e.target.value)}
                    placeholder="Número de edición"
                    className="border border-gray-300 rounded-md py-2 px-4 w-full mb-2"
                />
                <input
                    type="date"
                    value={fechaPublicacion}
                    onChange={(e) => setFechaPublicacion(e.target.value)}
                    placeholder="Fecha de publicación"
                    className="border border-gray-300 rounded-md py-2 px-4 w-full mb-2"
                />
                <input
                    type="text"
                    value={libroid}
                    onChange={(e) => setLibroid(e.target.value)}
                    placeholder="ID del libro"
                    className="border border-gray-300 rounded-md py-2 px-4 w-full mb-2"
                />
                <input
                    type="text"
                    value={proveedorid}
                    onChange={(e) => setProveedorid(e.target.value)}
                    placeholder="ID del proveedor"
                    className="border border-gray-300 rounded-md py-2 px-4 w-full mb-2"
                />
                <input
                    type="number"
                    value={totalPrestamos}
                    onChange={(e) => setTotalPrestamos(e.target.value)}
                    placeholder="Total de préstamos"
                    className="border border-gray-300 rounded-md py-2 px-4 w-full mb-2"
                />
                <input
                    type="number"
                    step="0.1"
                    value={promedioRating}
                    onChange={(e) => setPromedioRating(e.target.value)}
                    placeholder="Promedio de rating"
                    className="border border-gray-300 rounded-md py-2 px-4 w-full mb-2"
                />
                <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600">
                    {edicionID ? 'Actualizar Edición' : 'Agregar Edición'}
                </button>
            </form>
            <ul>
                {ediciones.map((edicion) => (
                    <li key={edicion.edicionid} className="border p-4 rounded-md shadow-md mb-2 flex justify-between items-center">
                        <span>{edicion.isbn}</span>
                        <div>
                            <button onClick={() => handleEdit(edicion)} className="bg-yellow-500 text-white py-1 px-2 rounded-md hover:bg-yellow-600 mr-2">
                                Editar
                            </button>
                            <button onClick={() => eliminarEdicion(edicion.edicionid)} className="bg-red-500 text-white py-1 px-2 rounded-md hover:bg-red-600">
                                Eliminar
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default EdicionForm;