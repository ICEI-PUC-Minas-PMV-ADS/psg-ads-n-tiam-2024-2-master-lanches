import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const api = axios.create({
    baseURL: "https://6fb5-2804-14c-5bb7-822b-c8a-83d2-d673-5c18.ngrok-free.app/v1", // Altere para sua URL definitiva
    headers: { "Content-Type": "application/json",
     },
});

// Interceptor para incluir token JWT no cabeçalho
api.interceptors.request.use(
    async (config) => {
        const token = await AsyncStorage.getItem("token");
        const role = await AsyncStorage.getItem("user.role");

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        if (role) {
            config.headers.Role = role;
        }

        return config;
    },
    (error) => Promise.reject(error)
);

export default api;