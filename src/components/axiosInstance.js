// src/components/axiosInstance.js
import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'https://backend-proyecto-production-13fc.up.railway.app/api/',
});

axiosInstance.interceptors.request.use(
    config => {
        const token = localStorage.getItem('Token'); // Obtiene el token desde localStorage
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`; // Cambia a Authorization con el formato Bearer
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

export default axiosInstance;
