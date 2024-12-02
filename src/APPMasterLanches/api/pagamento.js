import api from "./apiML";

// Criar pagamento
export const createPagamento = async (dadosPagamento) => {
    try {
        const { data } = await api.post("/pagamento/pix", dadosPagamento);
        console.log(data)
        return data;
    } catch (error) {
        console.error("Erro ao criar pagamento:", error.response?.data || error.message);
        throw new Error(error.response?.data?.mensagem || "Erro ao criar pagamento.");
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