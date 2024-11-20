import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { findAllProdutos, findProdutoById, findAllCategorias } from '../../api/produto';

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
    const [produtos, setProdutos] = useState([]);
    const CACHE_KEY = 'produtos_cache';
    const CACHE_DURATION = 24 * 60 * 60 * 1000;

    const categorizeProdutos = (produtos) => {
        return produtos.reduce((categorias, produto) => {
            const categoria = produto.nomeCategoria;
            if (!categorias[categoria]) categorias[categoria] = [];
            categorias[categoria].push(produto);
            return categorias;
        }, {});
    };    

    // Uso no ProductContext
    useEffect(() => {
        loadProdutosFromCache();
    }, []);

    const loadProdutosFromCache = async () => {
        try {
            console.log("Carregando produtos do cache...");
            const cache = await AsyncStorage.getItem(CACHE_KEY);
            if (cache) {
                const { timestamp, data } = JSON.parse(cache);
                if (Date.now() - timestamp < CACHE_DURATION) {
                    console.log("Dados do cache ainda válidos.");
                    const produtosCategorizados = categorizeProdutos(data); // Organiza por categorias
                    setProdutos(produtosCategorizados);
                    return;
                }
            }
            console.log("Cache expirado ou não encontrado. Atualizando produtos...");
            refreshProdutos();
        } catch (error) {
            console.error('Erro ao carregar produtos do cache:', error);
        }
    };    

    const refreshProdutos = async () => {
        try {
            console.log("Atualizando produtos...");
            const [produtos, categorias] = await Promise.all([
                findAllProdutos(),
                findAllCategorias(),
            ]);
    
            if (!produtos || !Array.isArray(produtos)) {
                console.error("Produtos retornados são inválidos:", produtos);
                return;
            }
    
            if (!categorias || !Array.isArray(categorias)) {
                console.error("Categorias retornadas são inválidas:", categorias);
                return;
            }
    
            const categoriaMap = categorias.reduce((map, categoria) => {
                if (!categoria.idCategoria || !categoria.nome) {
                    console.error("Categoria inválida:", JSON.stringify(categoria, null, 2));
                    return map;
                }
                map[categoria.idCategoria] = categoria.nome; // Mapeia idCategoria para nome
                return map;
            }, {});
    
            const produtosComNomeCategoria = produtos.map((produto) => ({
                ...produto,
                nomeCategoria: categoriaMap[produto.categoriaId] || 'Desconhecido',
            }));
    
            // Armazena como array simples
            const cache = { timestamp: Date.now(), data: produtosComNomeCategoria };
            await AsyncStorage.setItem(CACHE_KEY, JSON.stringify(cache));
    
            // Divide em categorias antes de definir no estado
            setProdutos(categorizeProdutos(produtosComNomeCategoria));
            console.log("Produtos atualizados e cache salvo.");
        } catch (error) {
            console.error("Erro ao atualizar produtos com categorias:", error);
        }
    };    

    const getProdutoById = async (id) => {
        console.log('getProdutoById chamado para ID:', id);
    
        // Verifica se o produto está no estado categorizado
        const produtoLocal = Object.values(produtos) // Itera pelas categorias
            .flat() // Junta todos os produtos em um único array
            .find((produto) => produto.id === id); // Encontra o produto pelo ID
    
        if (produtoLocal) {
            console.log('Produto encontrado no cache:', produtoLocal);
            return produtoLocal;
        }
    
        // Busca na API caso não esteja no cache
        try {
            console.log('Buscando produto na API...');
            const produtoRemoto = await findProdutoById({ id });
            if (produtoRemoto) {
                setProdutos((prev) => {
                    // Atualiza o estado categorizado
                    const categoria = produtoRemoto.nomeCategoria || 'Desconhecido';
                    const novaCategoria = prev[categoria]
                        ? [...prev[categoria], produtoRemoto]
                        : [produtoRemoto];
    
                    return { ...prev, [categoria]: novaCategoria };
                });
                return produtoRemoto;
            }
        } catch (error) {
            console.error('Erro ao buscar produto por ID:', error);
        }
        return null;
    };    
    const filterProdutosByCategorias = (categorias) => {
        if (!Array.isArray(categorias) || categorias.length === 0) return produtos;
        return produtos.filter((produto) => categorias.includes(produto.categoriaId));
    };

    return (
        <ProductContext.Provider value={{ produtos, refreshProdutos, getProdutoById, filterProdutosByCategorias }}>
            {children}
        </ProductContext.Provider>
    );
};

export const useProducts = () => React.useContext(ProductContext);