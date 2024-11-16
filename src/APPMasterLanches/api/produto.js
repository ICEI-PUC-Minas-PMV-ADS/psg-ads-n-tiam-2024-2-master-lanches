import api from './apiML';
import Fuse from 'fuse.js';

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


export const searchProdutos = async (query) => {
    try {
        const produtos = await findAllProdutos();
        const fuse = new Fuse(produtos, {
            keys: ['nome', 'ingredientes'],
            threshold: 0.3,
        });
        const result = fuse.search(query);
        return result.map(({ item }) => item);
    } catch (error) {
        console.error('Erro ao buscar produtos', error.response?.data || error.message);
        throw error;
    }
};