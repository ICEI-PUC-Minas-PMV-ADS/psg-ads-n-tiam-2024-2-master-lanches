import api from "./apiML";

export const findProdutoById = async ({id}) => {
    try {
        const { data } = await api.get(`/produtos/${id}`);
        return data;
    } catch (error) {
        console.error("Erro ao buscar produto:", error.response?.data || error.message);
        throw new Error(error.response?.data?.mensagem || "Erro ao buscar produto.");
    }
};

export const findProdutoByCategoria = async ({id}) => {
    try { 
        const { data } = await api.get(`/produtos/categorias/` + id);
        return data;
    } catch (error) {
        console.error('Erro ao buscar produto', error.response?.data || error.message);
        throw error;
    }
};

export const findAllProdutos = async () => {
    try {
        const { data } = await api.get("/produtos");
        return data;
    } catch (error) {
        console.error("Erro ao buscar produtos:", error.response?.data || error.message);
        throw new Error("Erro ao buscar produtos.");
    }
};
export const findAllCategorias = async () => {
    try {
        const { data } = await api.get("/categorias-produtos");
        return data;
    } catch (error) {
        console.error("Erro ao buscar produtos:", error.response?.data || error.message);
        throw new Error("Erro ao buscar produtos.");
    }
};