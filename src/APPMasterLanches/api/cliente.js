import api from "./apiML";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const login = async (email, senha) => {
    try {
        const { data } = await api.post("/clientes/login", { email, senha });
        await AsyncStorage.setItem("token", data.token);
        return data;
    } catch (error) {
        console.error("Erro ao fazer login:", error.response?.data || error.message);
        throw new Error(error.response?.data?.mensagem || "Erro ao fazer login.");
    }
};

export const logout = async () => {
    try {
        await AsyncStorage.removeItem("token");
    } catch (error) {
        console.error("Erro ao fazer logout:", error.message);
        throw error;
    }
};

export const isAuthenticated = async () => {
    const token = await AsyncStorage.getItem("token");
    return !!token;
};