import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const api = axios.create({
    baseURL: "https://55b9-2804-14c-5b81-619e-64b6-b9a8-a93d-ce86.ngrok-free.app/v1", // Altere para sua URL definitiva
    headers: { "Content-Type": "application/json",
     },
});

// Interceptor para incluir token JWT no cabeçalho
api.interceptors.request.use(
    async (config) => {
        const token = await AsyncStorage.getItem("token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export default api;