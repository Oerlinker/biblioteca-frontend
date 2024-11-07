export const checkUserRole = (user, requiredRole) => {
    return user && user.rol >= requiredRole;
};

