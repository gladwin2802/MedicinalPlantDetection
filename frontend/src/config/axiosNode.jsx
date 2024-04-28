import axios from 'axios';

const axiosInstanceNode = axios.create({
    baseURL: `http://localhost:${import.meta.env.VITE_NODE_BACKEND_PORT}`,
});

export default axiosInstanceNode;