import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { UserContext } from '../UserContext';

const ProtectedRoute = ({ element: Component, requiredRole, ...rest }) => {
    const { user } = useContext(UserContext);

    if (user && user.rol >= requiredRole) {
        return <Component {...rest} />;
    } else {
        return <Navigate to="/login" />;
    }
};

export default ProtectedRoute;