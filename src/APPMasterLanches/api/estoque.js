import api from "./apiML";

export const findAllEstoque = async () => {
    try {
        const { data } = await api.get("/estoques/produtos");
        return data;
    } catch (error) {
        console.error("Erro ao buscar estoque:", error.response?.data || error.message);
        throw new Error("Erro ao buscar estoque.");
    }
};

export const inicializarEstoque = async () => {
    try {
        await api.post("/estoques/inicializar");
    } catch (error) {
        console.error("Erro ao inicializar estoque:", error.response?.data || error.message);
        throw new Error("Erro ao inicializar estoque.");
    }
};

export const findEstoqueProdutoById = async (id) => {
    try {
        const { data } = await api.get(`/estoques/produtos/${id}`);
        return data;
    } catch (error) {
        console.error("Erro ao buscar produto no estoque:", error.response?.data || error.message);
        throw new Error("Erro ao buscar produto no estoque.");
    }
};

export const updateEstoque = async (id, quantidade) => {
    try {
        const { data } = await api.put(`/estoques/produtos/${id}`, quantidade);
        return data;
    } catch (error) {
        console.error("Erro ao atualizar estoque:", error.response?.data || error.message);
        throw new Error("Erro ao atualizar estoque.");
    }
};

// Atualiza campos em todos os documentos (apenas admin)
export const updateFieldsInAllDocuments = async (fieldsToUpdate) => {
    try {
        const { data } = await api.put(`/estoques/updateFields`, fieldsToUpdate);
        return data;
    } catch (error) {
        console.error("Erro ao atualizar campos:", error.response?.data || error.message);
        throw new Error("Erro ao atualizar campos.");
    }
};