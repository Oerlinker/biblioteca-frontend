// protectedComponents.js
import React from 'react';
import { checkUserRole } from '../utils/auth';

const ProtectedComponent = ({ user, children }) => {
    if (!checkUserRole(user, 4)) {
        return (
            <div className="flex items-center justify-center min-h-screen text-center">
                <p className="text-red-500 font-semibold text-lg">
                    Acceso denegado. No tienes los permisos necesarios para acceder a esta sección.
                </p>
            </div>
        );
    }

    return <>{children}</>;
};

export default ProtectedComponent;