import React, { useState, useEffect } from 'react';
import axiosInstance from '../components/axiosInstance';

const VerPdf = ({ edicionId }) => {
    const [pdfUrl, setPdfUrl] = useState(null);

    useEffect(() => {
        const fetchPdf = async () => {
            try {
                const response = await axiosInstance.get(`/ediciones/download-pdf/${edicionId}`, {
                    responseType: 'blob',
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }  // Ensure token is included
                });
                const url = URL.createObjectURL(new Blob([response.data], { type: 'application/pdf' }));
                setPdfUrl(url);
            } catch (error) {
                console.error('Error al obtener PDF:', error);
            }
        };
        fetchPdf();
    }, [edicionId]);

    return (
        <div>
            {pdfUrl ? (
                <iframe src={pdfUrl} width="100%" height="600px" title="PDF Viewer"></iframe>
            ) : (
                <p>Cargando PDF...</p>
            )}
        </div>
    );
};

export default VerPdf;
