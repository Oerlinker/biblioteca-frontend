// src/UserContext.js
import React, { createContext, useState, useEffect } from 'react';
import {jwtDecode} from 'jwt-decode';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState({});
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('Token');
        if (token) {
            const decodedToken = jwtDecode(token);
            const userData = { id: decodedToken.id, username: decodedToken.username, correo: decodedToken.correo, rol: decodedToken.rol, miembroid: decodedToken.miembroid, };
            setUser(userData);
            setIsLoggedIn(true);
        }
    }, []);

    return (
        <UserContext.Provider value={{ user, setUser, isLoggedIn, setIsLoggedIn }}>
            {children}
        </UserContext.Provider>
    );
};