import React, { useState, useEffect } from 'react';
import axiosInstance from '../components/axiosInstance';

const VerPdf = ({ edicionId }) => {
    const [pdfUrl, setPdfUrl] = useState(null);

    useEffect(() => {
        const fetchPdf = async () => {
            try {
                const response = await axiosInstance.get(`/ediciones/download-pdf/${edicionId}`, {
                    responseType: 'blob',
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
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
        <div className="w-full flex justify-center bg-gray-100 p-2 rounded-lg overflow-hidden">
            {pdfUrl ? (
                <iframe
                    src={pdfUrl}
                    title="PDF Viewer"
                    className="w-full h-[500px] md:h-[700px] lg:h-[80vh] border rounded-md"
                    style={{ border: "none" }}
                ></iframe>
            ) : (
                <p className="text-center">Cargando PDF...</p>
            )}
        </div>
    );
};

export default VerPdf;
