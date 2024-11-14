import React, { useState, useEffect } from 'react';
import axiosInstance from '../components/axiosInstance';

const VerPdf = ({ edicionId }) => {
    const [pdfUrl, setPdfUrl] = useState(null);
    const [isMobile, setIsMobile] = useState(false);

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

        const userAgent = navigator.userAgent || navigator.vendor || window.opera;
        if (/android|iPad|iPhone|iPod/.test(userAgent.toLowerCase())) {
            setIsMobile(true);
        }
    }, [edicionId]);

    return (
        <div className="w-full flex justify-center bg-gray-100 p-2 rounded-lg overflow-hidden">
            {pdfUrl ? (
                isMobile ? (
                    <a href={pdfUrl} download="document.pdf" className="text-blue-500 hover:underline">
                        Descargar PDF
                    </a>
                ) : (
                    <iframe
                        src={pdfUrl}
                        title="PDF Viewer"
                        className="w-full h-[500px] md:h-[700px] lg:h-[80vh] border rounded-md"
                        style={{ border: "none", width: "100%" }}
                    ></iframe>
                )
            ) : (
                <p className="text-center">Cargando PDF...</p>
            )}
        </div>
    );
};

export default VerPdf;