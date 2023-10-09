import axios from 'axios';
const BASE_URL = 'http://localhost:4444';
const axiosClient = axios.create({
	baseURL: process.env.REACT_APP_API_URL || BASE_URL
}
)

const getToken = () => window.localStorage.getItem('token');

axiosClient.interceptors.request.use((config) => {
	config.headers.Authorization = `Bearer ${getToken()}`;
	return config;
}
)
export default axiosClient