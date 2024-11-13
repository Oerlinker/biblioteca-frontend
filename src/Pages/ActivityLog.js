import React, { useState, useEffect } from 'react';
import axios from 'axios';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import moment from 'moment-timezone';
import axiosInstance from "../components/axiosInstance";

const ActivityLog = () => {
    const [logs, setLogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchLogs = async () => {
            try {
                const response = await axiosInstance.get('https://backend-proyecto-production-13fc.up.railway.app/api/activity-log');
    
                // Procesa cada log para manejar casos donde `action` no es JSON válido
                const logsWithParsedAction = response.data.map(log => {
                    let parsedAction;
    
                    try {
                        // Intenta parsear `action` como JSON
                        parsedAction = JSON.parse(log.action);
                    } catch (error) {
                        // Si falla, deja `action` tal cual
                        parsedAction = log.action;
                    }
    
                    return {
                        ...log,
                        parsedAction
                    };
                });
    
                setLogs(logsWithParsedAction);
                setLoading(false);
            } catch (error) {
                setError('Error fetching activity log');
                setLoading(false);
            }
        };
    
        fetchLogs();
    }, []);

    const downloadPDF = () => {
        const doc = new jsPDF();
        const tableColumn = ["Timestamp", "User ID", "Action", "IP"];
        const tableRows = [];

        logs.forEach(log => {
            const logData = [
                moment(log.timestamp).tz('America/La_Paz').format('YYYY-MM-DD HH:mm:ss'),
                log.userid,
                log.parsedAction.action,
                log.parsedAction.ip // IP deserializada
            ];
            tableRows.push(logData);
        });

        doc.autoTable(tableColumn, tableRows, { startY: 20 });
        doc.text("Activity Log", 14, 15);
        doc.save("activity_log.pdf");
    };

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md space-y-6">
            <h2 className="text-2xl font-bold text-gray-700 mb-4">Activity Log</h2>
            {error && <p className="text-red-500">{error}</p>}
            {loading ? (
                <p className="text-gray-500">Loading logs...</p>
            ) : (
                <>
                    <button
                        onClick={downloadPDF}
                        className="mb-4 bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600"
                    >
                        Download PDF
                    </button>
                    <table className="min-w-full bg-white border border-gray-300 mt-4">
                        <thead>
                            <tr>
                                <th className="py-2 px-4 border-b text-left">Timestamp</th>
                                <th className="py-2 px-4 border-b text-left">User ID</th>
                                <th className="py-2 px-4 border-b text-left">Action</th>
                                <th className="py-2 px-4 border-b text-left">IP Address</th>
                            </tr>
                        </thead>
                        <tbody>
                            {logs.map((log) => (
                                <tr key={log.id}>
                                    <td className="p-2">{moment(log.timestamp).tz('America/La_Paz').format('YYYY-MM-DD HH:mm:ss')}</td>
                                    <td className="py-2 px-4 border-b">{log.userid}</td>
                                    <td className="py-2 px-4 border-b">{log.parsedAction.action}</td>
                                    <td className="py-2 px-4 border-b">{log.parsedAction.ip}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </>
            )}
        </div>
    );
};

export default ActivityLog;