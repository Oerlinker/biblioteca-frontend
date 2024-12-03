import React, { createContext, useState, useEffect } from 'react';
import axiosInstance from './components/axiosInstance';
import {jwtDecode} from 'jwt-decode';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState({});
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('Token');
        if (token) {
            const decodedToken = jwtDecode(token);

            const fetchMemberData = async () => {
                try {
                    const response = await axiosInstance.get(`/users/members/${decodedToken.miembroid}`);
                    setUser({ ...decodedToken, ...response.data });
                    setIsLoggedIn(true);
                } catch (error) {
                    console.error('Error al obtener los datos del miembro:', error);
                    setUser(decodedToken);
                    setIsLoggedIn(true);
                } finally {
                    setIsLoading(false);
                }
            };

            fetchMemberData();
        } else {
            setIsLoading(false);
        }
    }, []);

    return (
        <UserContext.Provider
            value={{
                user,
                setUser,
                isLoggedIn,
                setIsLoggedIn,
                isLoading,
                setIsLoading,
            }}
        >
            {children}
        </UserContext.Provider>
    );
};
