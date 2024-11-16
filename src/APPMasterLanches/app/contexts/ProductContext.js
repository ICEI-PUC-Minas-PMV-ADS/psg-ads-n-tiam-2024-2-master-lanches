import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { findAllProdutos } from '../../api/produto';

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
    const [produtos, setProdutos] = useState([]);
    const CACHE_KEY = 'produtos_cache';
    const CACHE_DURATION = 24 * 60 * 60 * 1000;

    useEffect(() => {
        loadProdutosFromCache();
    }, []);

    const loadProdutosFromCache = async () => {
        try {
            console.log("Carregando produtos do cache...");
            const cache = await AsyncStorage.getItem(CACHE_KEY);
            if (cache) {
                const { timestamp, data } = JSON.parse(cache);
                /* console.log("Cache encontrado:", { timestamp, data }); */
                if (Date.now() - timestamp < CACHE_DURATION) {
                    console.log("Dados do cache ainda válidos.");
                    setProdutos(data);
                    return;
                }
            }
            console.log("Cache expirado ou não encontrado. Atualizando produtos...");
            refreshProdutos();
        } catch (error) {
            console.error("Erro ao carregar produtos do cache:", error);
        }
    };

    const refreshProdutos = async () => {
        try {
            console.log("Atualizando produtos...");
            const freshProdutos = await findAllProdutos();
            if (freshProdutos && Array.isArray(freshProdutos)) {
                setProdutos(freshProdutos);
                const cache = { timestamp: Date.now(), data: freshProdutos };
                await AsyncStorage.setItem(CACHE_KEY, JSON.stringify(cache));
                console.log("Produtos atualizados e cache salvo.");
            } else {
                console.error("Dados inesperados da API:", freshProdutos);
            }
        } catch (error) {
            console.error("Erro ao buscar produtos:", error);
        }
    };

    return (
        <ProductContext.Provider value={{ produtos, refreshProdutos }}>
            {children}
        </ProductContext.Provider>
    );
};

export const useProducts = () => React.useContext(ProductContext);