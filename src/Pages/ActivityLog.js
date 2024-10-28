import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ActivityLog = () => {
    const [logs, setLogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchLogs = async () => {
            try {
                const response = await axios.get('https://backend-proyecto-production-13fc.up.railway.app/api/activity-log');
                setLogs(response.data);
                setLoading(false);
            } catch (error) {
                setError('Error fetching activity log');
                setLoading(false);
            }
        };

        fetchLogs();
    }, []);

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md space-y-6">
            <h2 className="text-2xl font-bold text-gray-700 mb-4">Activity Log</h2>
            {error && <p className="text-red-500">{error}</p>}
            {loading ? (
                <p className="text-gray-500">Loading logs...</p>
            ) : (
                <table className="min-w-full bg-white border border-gray-300 mt-4">
                    <thead>
                        <tr>
                            <th className="py-2 px-4 border-b text-left">Timestamp</th>
                            <th className="py-2 px-4 border-b text-left">User ID</th>
                            <th className="py-2 px-4 border-b text-left">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {logs.map((log) => (
                            <tr key={log.id}>
                                <td className="py-2 px-4 border-b">{log.timestamp}</td>
                                <td className="py-2 px-4 border-b">{log.userid}</td>
                                <td className="py-2 px-4 border-b">{log.action}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default ActivityLog;