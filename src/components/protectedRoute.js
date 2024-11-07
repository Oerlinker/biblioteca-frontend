import React, { useContext } from 'react';
import { Route, Navigate } from 'react-router-dom';
import { UserContext } from '../UserContext';

const ProtectedRoute = ({ element: Component, requiredRole, ...rest }) => {
    const { user } = useContext(UserContext);

    return (
        <Route
            {...rest}
            element={
                user && user.rol >= requiredRole ? (
                    <Component />
                ) : (
                    <Navigate to="/login" />
                )
            }
        />
    );
};
export default ProtectedRoute;