import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'https://backend-proyecto-production-13fc.up.railway.app/api',
});

axiosInstance.interceptors.request.use(
    config => {
        const token = localStorage.getItem('Token');
        if (token) {
            config.headers['x-auth-token'] = token;
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

export default axiosInstance;