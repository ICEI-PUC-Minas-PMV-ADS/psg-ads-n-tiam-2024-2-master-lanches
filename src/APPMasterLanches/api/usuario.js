import api from "./apiML";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Método para converter uma imagem em base64
const imageToBase64 = async (imagePath) => {
    const response = await fetch(imagePath);
    const blob = await response.blob();
    const reader = new FileReader();
    return new Promise((resolve, reject) => {
        reader.onloadend = () => resolve(reader.result.split(",")[1]); // Base64 sem prefixo
        reader.onerror = () => reject(new Error("Erro ao converter imagem para base64."));
        reader.readAsDataURL(blob);
    });
};

// Cadastro de usuário
export const cadastro = async (usuario) => {
    try {
        if (usuario.imagemPerfil) {
            usuario.imagemPerfil = await imageToBase64(usuario.imagemPerfil);
        }
        const { data } = await api.post('/usuarios', usuario);
        await AsyncStorage.setItem("token", data.token);
        await AsyncStorage.setItem("user.role", data.role || "cliente");
        return data;
    } catch (error) {
        console.error("Erro ao cadastrar usuário:", error.response?.data || error.message);
        throw new Error(error.response?.data?.mensagem || "Erro ao cadastrar usuário.");
    }
};

// Login do usuário
export const login = async (email, senha) => {
    try {
        const response = await api.post("/usuarios/login", { email, senha });
        const { token, role, userID } = response.data;
        await AsyncStorage.setItem("token", token);
        await AsyncStorage.setItem("user.role", role.Name || "cliente");
        await AsyncStorage.setItem("userID", userID.toString());
        return response.data;
    } catch (error) {
        console.error("Erro ao fazer login:", error.response?.data || error.message);
        throw error;
    }
};

// Busca informações gerais do usuário
export const getUsuarioInfo = async () => {
    try {
        const userID = await AsyncStorage.getItem("userID");
        if (!userID) throw new Error("Usuário não autenticado.");

        const response = await api.get(`/usuarios/${userID}/info`);
        const userInfo = response.data;

        // Converte a imagem de perfil (byte[]) para Base64
        if (userInfo.imagemPerfil && Array.isArray(userInfo.imagemPerfil)) {
            userInfo.imagemPerfil = `data:image/png;base64,${Buffer.from(userInfo.imagemPerfil).toString('base64')}`;
        }

        return userInfo;
    } catch (error) {
        console.error("Erro ao buscar informações gerais:", error.message);
        throw error;
    }
};

// Busca dados completos do usuário
export const getUsuarioPorId = async (id) => {
    try {
        const response = await api.get(`/usuarios/${id}`);
        return response.data;
    } catch (error) {
        console.error("Erro ao buscar usuário:", error.message);
        throw error;
    }
};

// Atualiza campo específico do usuário
export const atualizarUsuario = async (campo, valor) => {
    try {
        const userID = await AsyncStorage.getItem("userID");
        if (!userID) throw new Error("Usuário não autenticado.");
        await api.patch(`/usuarios/${userID}?campo=${campo}`, { valor });
    } catch (error) {
        console.error("Erro ao atualizar usuário:", error.message);
        throw error;
    }
};

// Deleta o usuário atual
export const deletarUsuario = async () => {
    try {
        const userID = await AsyncStorage.getItem("userID");
        if (!userID) throw new Error("Usuário não autenticado.");
        await api.delete(`/usuarios/${userID}`);
        await AsyncStorage.clear();
    } catch (error) {
        console.error("Erro ao deletar usuário:", error.message);
        throw error;
    }
};

// Logout do usuário
export const logout = async () => {
    try {
        await AsyncStorage.clear();
    } catch (error) {
        console.error("Erro ao fazer logout:", error.message);
        throw error;
    }
};

// Verificação de autenticação
export const isUsuarioAutenticado = async () => {
    const token = await AsyncStorage.getItem("token");
    return !!token;
};