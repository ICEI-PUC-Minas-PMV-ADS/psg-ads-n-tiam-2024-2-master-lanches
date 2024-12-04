import api from "./apiML";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as FileSystem from "expo-file-system";

// Criar pagamento e salvar QR Code localmente
export const createPagamento = async (dadosPagamento) => {
    try {
        const { data } = await api.post("/pagamento/pix", dadosPagamento);

        console.log("Dados recebidos da API:", data); // Debug

        if (data.qrCodeBytes) {
            // Gera o caminho local para salvar o QR Code
            const localPath = `${FileSystem.cacheDirectory}qrCode_${Date.now()}.png`;

            // Salva o QR Code como PNG localmente
            await FileSystem.writeAsStringAsync(localPath, data.qrCodeBytes, {
                encoding: FileSystem.EncodingType.Base64,
            });

            // Salva o caminho no AsyncStorage para futura referência
            const cacheData = {
                PixCode: data.pixCode,
                QRCode_Path: localPath,
                expiresAt: Date.now() + 10 * 60 * 1000, // Validade de 10 minutos
            };

            await AsyncStorage.setItem(`pix_${data.pixCode}`, JSON.stringify(cacheData));

            return {
                PixCode: data.pixCode,
                QRCode_Path: localPath,
                Status: data.status,
                Details: data.statusDetail,
            };
        }

        throw new Error("QR Code inválido.");
    } catch (error) {
        console.error("Erro ao criar pagamento:", error.response?.data || error.message);
        throw new Error(error.response?.data?.message || error.message);
    }
};

// Consultar pagamento por ID
export const findPagamentoById = async ({ id }) => {
    try {
        const { data } = await api.get(`/pagamento/pix/${id}`);
        return data;
    } catch (error) {
        console.error("Erro ao buscar pagamento:", error.response?.data || error.message);
        throw new Error(error.response?.data?.mensagem || "Erro ao buscar pagamento.");
    }
};

// Listar todos os pagamentos
export const findAllPagamentos = async () => {
    try {
        const { data } = await api.get("/pagamento/pix");
        return data;
    } catch (error) {
        console.error("Erro ao buscar pagamentos:", error.response?.data || error.message);
        throw new Error("Erro ao buscar pagamentos.");
    }
};

// Atualizar pagamento
export const updatePagamento = async ({ id, dadosAtualizados }) => {
    try {
        const { data } = await api.put(`/pagamento/pix/${id}`, dadosAtualizados);
        return data;
    } catch (error) {
        console.error("Erro ao atualizar pagamento:", error.response?.data || error.message);
        throw new Error(error.response?.data?.mensagem || "Erro ao atualizar pagamento.");
    }
};

// Cancelar pagamento
export const cancelPagamento = async ({ id }) => {
    try {
        const { data } = await api.delete(`/pagamento/pix/${id}`);
        return data;
    } catch (error) {
        console.error("Erro ao cancelar pagamento:", error.response?.data || error.message);
        throw new Error(error.response?.data?.mensagem || "Erro ao cancelar pagamento.");
    }
};