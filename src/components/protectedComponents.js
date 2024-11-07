import React from 'react';
import { checkUserRole } from '../utils/auth';

const ProtectedComponent = ({ user }) => {
    if (!checkUserRole(user, 4)) {
        return <div>Access Denied</div>;
    }

    return <div>Protected Content for Admins</div>;
};
//el navigate era el error
export default ProtectedComponent;