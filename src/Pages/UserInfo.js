import React from 'react';

const UserInfo = ({ user }) => {
    return (
        <div className="text-center">
            {/* Avatar */}
            <div className="w-32 h-32 bg-gray-300 rounded-full flex items-center justify-center mb-4">
                <span className="text-4xl font-bold text-gray-700">
                    {user.nombre ? user.nombre.charAt(0).toUpperCase() : 'A'}
                </span>
            </div>

            {/* Información del usuario */}
            <h2 className="text-2xl font-bold text-gray-700 mb-2">{user.nombre}</h2>
            <p className="text-gray-500 mb-4">{user.email}</p>
            <p className="text-gray-500 mb-4">{user.rol === 4 ? 'Administrador' : 'Usuario'}</p>
        </div>
    );
};

export default UserInfo;
