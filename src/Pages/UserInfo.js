import React from 'react';

const UserInfo = ({ user }) => {
    return (
        <div className="space-y-4">
            <div>
                <label className="block text-sm font-medium text-gray-700">Nombre:</label>
                <p className="block w-full p-2 border border-gray-300 rounded">{user.nombre}</p>
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">Correo:</label>
                <p className="block w-full p-2 border border-gray-300 rounded">{user.correo}</p>
            </div>
        </div>
    );
};

export default UserInfo;