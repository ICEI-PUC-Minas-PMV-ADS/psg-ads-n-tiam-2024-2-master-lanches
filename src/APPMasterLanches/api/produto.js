import api from './apiML';

export const findProdutoById = async ({ id }) => {
    try { 
        const response = await api.get('/v1/produtos/' + id);
        return response.data;
    } catch (error) {
        console.error('Erro ao buscar produto', error.response ? error.response.data : error.message);
        throw error;
    }
};

export const findAllProdutos = async () => {
    try {
        const response = await api.get('/v1/produtos');
        return response.data;
    } catch (error) {
        console.error('Erro ao buscar produtos', error.response ? error.response.data : error.message);
        throw error;
    }
} 
