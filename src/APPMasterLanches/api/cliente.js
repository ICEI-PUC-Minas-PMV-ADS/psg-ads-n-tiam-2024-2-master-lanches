import api from './apiML';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const login = async (email, senha) => {
    try {
        const response = await api.post('/v1/clientes/login', { email, senha });
        const { token } = response.data; // Supondo que a API retorna um token
        await AsyncStorage.setItem('token', token); // Armazena o token no AsyncStorage
        return response.data; // Retorna os dados do cliente ou token
    } catch (error) {
        console.error("Erro ao fazer login:", error.response ? error.response.data : error.message);
        throw error; // Lança o erro para ser tratado na interface
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
