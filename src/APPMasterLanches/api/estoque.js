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

export const inciarEstoque = async () => {
    try {
        await api.response("/estoques/inicializar")
    }
    catch (error) {
        console.error("Erro ao iniciar estoque:", error.response?.data || error.message);
        throw new Error("Erro ao iniciar estoque.");
    }
}

// Busca estoque por ID
export const findEstoqueProdutoById = async (id) => {
    try {
        const { data } = await api.get(`/estoques/${id}`);
        return data;
    } catch (error) {
        console.error("Erro ao buscar produto no estoque:", error.response?.data || error.message);
        throw new Error("Erro ao buscar produto no estoque.");
    }
};

// Atualiza estoque por ID
export const updateEstoque = async (id, estoque) => {
    try {
        const { data } = await api.put(`/estoques/${id}`, estoque);
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