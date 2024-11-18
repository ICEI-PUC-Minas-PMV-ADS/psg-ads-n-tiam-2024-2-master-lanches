import api from './apiML';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const login = async (email, senha) => {
    try {
        const { data } = await api.post('/clientes/login', { email, senha });
        await AsyncStorage.setItem('token', data.token);
        return data;
    } catch (error) {
        console.error("Erro ao fazer login:", error.response?.data || error.message);
        throw error;
    }
};

export const cadastro = async ({cliente}) => {
    try {
        const { data } = await api.post('/clientes', cliente);
        await AsyncStorage.setItem('token', data.token);
        return data;
    } catch (error) {
        console.error("Erro ao fazer login:", error.response?.data || error.message);
        throw error;
    }
};
