import axios from "axios";


export const axiosInstance = axios.create({
	baseURL: process.env.REACT_APP_DASBORD_URL as string,
	withCredentials: true,
});