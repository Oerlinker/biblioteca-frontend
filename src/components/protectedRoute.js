import React, { useContext } from 'react';
import { Route,Navigate} from 'react-router-dom';
import { UserContext } from '../UserContext';


const ProtectedRoute = ({ component: Component, requiredRole, ...rest }) => {
    const { user } = useContext(UserContext);

    return (
        <Route
            {...rest}
            render={props =>
                user && user.rol >= requiredRole ? (
                    <Component {...props} />
                ) : (
                    <Navigate to="/login" />
                )
            }
        />
    );
};

export default ProtectedRoute;