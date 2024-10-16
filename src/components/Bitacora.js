import React, { useState, useEffect } from 'react';
import axios from 'axios';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import moment from 'moment-timezone';

const Bitacora = () => {
    const [logs, setLogs] = useState([]);

    useEffect(() => {
        const fetchLogs = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/bitacora');
                setLogs(response.data);
            } catch (error) {
                console.error('Error fetching logs', error);
            }
        };

        fetchLogs();
    }, []);

    const generatePDF = () => {
        const input = document.getElementById('logTable');
        html2canvas(input).then(canvas => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF();
            pdf.addImage(imgData, 'PNG', 0, 0);
            pdf.save('bitacora.pdf');
        });
    };

    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold mb-4">User Activity Log</h2>
            <button onClick={generatePDF} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mb-4">
                Generate PDF
            </button>
            <table id="logTable" className="min-w-full bg-white">
                <thead>
                <tr>
                    <th className="py-2">ID</th>
                    <th className="py-2">User ID</th>
                    <th className="py-2">Action</th>
                    <th className="py-2">Timestamp</th>
                </tr>
                </thead>
                <tbody>
                {logs.map(log => (
                    <tr key={log.id}>
                        <td className="py-2">{log.id}</td>
                        <td className="py-2">{log.userid}</td>
                        <td className="py-2">{log.action}</td>
                        <td className="py-2">{moment(log.timestamp).tz('America/La_Paz').format('YYYY-MM-DD HH:mm:ss')}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default Bitacora;