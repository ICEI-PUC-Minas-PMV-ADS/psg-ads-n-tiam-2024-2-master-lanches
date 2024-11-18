import api from './apiML';

export const findProdutoById = async ({id}) => {
    try { 
        const { data } = await api.get(`/produtos/` + id);
        return data;
    } catch (error) {
        console.error('Erro ao buscar produto', error.response?.data || error.message);
        throw error;
    }
};

export const findAllProdutos = async () => {
    try {
        const { data } = await api.get('/produtos');
        return data;
    } catch (error) {
        console.error('Erro ao buscar produtos', error.response?.data || error.message);
        throw error;
    }
};
