import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { findAllProdutos, findProdutoById, findAllCategorias, createProduto } from '../../api/produto';

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
    const [produtos, setProdutos] = useState({});
    const [nomeCategorias, setNomeCategorias] = useState([]);
    const [version, setVersion] = useState(0);
    const CACHE_KEY = 'produtos_cache';
    const CATEGORIAS_CACHE_KEY = 'categorias_cache';
    const VERSION_KEY = 'produtos_version';
    const CACHE_DURATION = 24 * 60 * 60 * 1000;

    const categorizeProdutos = (produtos) => {
        return produtos.reduce((categorias, produto) => {
            const categoria = produto.nomeCategoria || 'Desconhecido';
            if (!categorias[categoria]) categorias[categoria] = [];
            categorias[categoria].push(produto);
            return categorias;
        }, {});
    };

    useEffect(() => {
        loadProdutosFromCache();
        loadCategoriasFromCache();
    }, []);

    const loadProdutosFromCache = async () => {
        try {
            console.log("Carregando produtos do cache...");
            const cache = await AsyncStorage.getItem(CACHE_KEY);
            const storedVersion = await AsyncStorage.getItem(VERSION_KEY);

            if (cache && storedVersion) {
                const { timestamp, data } = JSON.parse(cache);
                if (Date.now() - timestamp < CACHE_DURATION) {
                    console.log("Dados do cache ainda válidos.");
                    setVersion(parseInt(storedVersion, 10));
                    setProdutos(categorizeProdutos(data));
                    return;
                }
            }
            console.log("Cache de produtos expirado ou não encontrado. Atualizando...");
            refreshProdutos();
        } catch (error) {
            console.error('Erro ao carregar produtos do cache:', error);
        }
    };

    const loadCategoriasFromCache = async () => {
        try {
            console.log("Carregando categorias do cache...");
            const cache = await AsyncStorage.getItem(CATEGORIAS_CACHE_KEY);

            if (cache) {
                const { timestamp, data } = JSON.parse(cache);
                if (Date.now() - timestamp < CACHE_DURATION) {
                    console.log("Categorias carregadas do cache.");
                    setNomeCategorias(data);
                    return;
                }
            }
            console.log("Cache de categorias expirado ou não encontrado. Atualizando...");
            refreshCategorias();
        } catch (error) {
            console.error('Erro ao carregar categorias do cache:', error);
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
                map[categoria.idCategoria] = categoria.nome;
                return map;
            }, {});

            setNomeCategorias(Object.values(categoriaMap));

            const produtosComNomeCategoria = produtos.map((produto) => ({
                ...produto,
                nomeCategoria: categoriaMap[produto.categoriaId] || 'Desconhecido',
            }));

            const novaVersao = 0; // await getServerVersion();
            //!==
            if (novaVersao === version) {
                setVersion(novaVersao);
                const cache = { timestamp: Date.now(), data: produtosComNomeCategoria };
                await AsyncStorage.setItem(CACHE_KEY, JSON.stringify(cache));
                await AsyncStorage.setItem(VERSION_KEY, novaVersao.toString());
                setProdutos(categorizeProdutos(produtosComNomeCategoria));
                console.log("Produtos atualizados e cache salvo.");
            }
        } catch (error) {
            console.error("Erro ao atualizar produtos:", error);
        }
    };

    const refreshCategorias = async () => {
        try {
            console.log("Atualizando categorias...");
            const categorias = await findAllCategorias();

            const categoriasMap = categorias.map(({ idCategoria, nome, imagem }) => ({
                id: idCategoria,
                nome,
                imagem: imagem || null,
            }));

            const cache = { timestamp: Date.now(), data: categoriasMap };
            await AsyncStorage.setItem(CATEGORIAS_CACHE_KEY, JSON.stringify(cache));
            setNomeCategorias(categoriasMap);
            console.log("Categorias atualizadas e cache salvo.");
        } catch (error) {
            console.error("Erro ao atualizar categorias:", error);
        }
    };

    const addProduto = async (produto, role) => {
        if (role !== 'admin') {
            console.error("Permissão negada: somente administradores podem adicionar produtos.");
            return;
        }
        try {
            console.log("Adicionando novo produto...");
            const novoProduto = await createProduto(produto);
            if (novoProduto) {
                const produtoComCategoria = {
                    ...novoProduto,
                    nomeCategoria: novoProduto.nomeCategoria || 'Desconhecido',
                };

                setProdutos((prev) => {
                    const categoria = produtoComCategoria.nomeCategoria;
                    const novaCategoria = prev[categoria]
                        ? [...prev[categoria], produtoComCategoria]
                        : [produtoComCategoria];

                    return { ...prev, [categoria]: novaCategoria };
                });
                console.log("Produto adicionado com sucesso.");
            }
        } catch (error) {
            console.error("Erro ao adicionar produto:", error);
        }
    };

    const getProdutoById = async (id) => {
        console.log('getProdutoById chamado para ID:', id);
        const produtoLocal = Object.values(produtos).flat().find((produto) => produto.id === id);

        if (produtoLocal) {
            console.log('Produto encontrado no cache:', produtoLocal);
            return produtoLocal;
        }

        try {
            console.log('Buscando produto na API...');
            const produtoRemoto = await findProdutoById({ id });
            if (produtoRemoto) {
                const produtoComCategoria = {
                    ...produtoRemoto,
                    nomeCategoria: produtoRemoto.nomeCategoria || 'Desconhecido',
                };

                setProdutos((prev) => {
                    const categoria = produtoComCategoria.nomeCategoria;
                    const novaCategoria = prev[categoria]
                        ? [...prev[categoria], produtoComCategoria]
                        : [produtoComCategoria];

                    return { ...prev, [categoria]: novaCategoria };
                });
                return produtoComCategoria;
            }
        } catch (error) {
            console.error('Erro ao buscar produto por ID:', error);
        }
        return null;
    };

    return (
        <ProductContext.Provider
            value={{
                produtos,
                nomeCategorias,
                refreshProdutos,
                getProdutoById,
                addProduto,
            }}
        >
            {children}
        </ProductContext.Provider>
    );
};

export const useProducts = () => React.useContext(ProductContext);