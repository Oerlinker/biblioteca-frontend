import React from 'react';

const UserInfo = ({ user }) => {
    if (!user) {
        return <p className="text-center text-gray-500">Cargando información del usuario...</p>;
    }

    return (
        <div className="text-center">
            {/* Avatar con inicial del usuario */}
            <div className="w-32 h-32 bg-gray-300 rounded-full flex items-center justify-center mb-4">
                <span className="text-4xl font-bold text-gray-700">
                    {user.nombre ? user.nombre.charAt(0).toUpperCase() : 'U'}
                </span>
            </div>

            <h2 className="text-2xl font-bold text-gray-700 mb-2">{user.nombre}</h2>
            <p className="text-gray-500 mb-4">{user.correo}</p>
            <p className="text-gray-500 mb-4">
                {user.rol === 4 ? 'Administrador' : user.rol === 2 ? 'Usuario 2' : 'Usuario'}
            </p>
        </div>
    );
};

export default UserInfo;
