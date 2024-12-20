import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const api = axios.create({
    baseURL: "https://3b31-131-108-25-28.ngrok-free.app/v1", // Altere para sua URL definitiva
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