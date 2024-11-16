import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { findAllProdutos } from '../../api/apiML';

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
    const [produtos, setProdutos] = useState([]);
    const CACHE_KEY = 'produtos_cache';
    const CACHE_DURATION = 24 * 60 * 60 * 1000;
    useEffect(() => {
        loadProdutosFromCache();
    }, []);

    const loadProdutosFromCache = async () => {
        const cache = await AsyncStorage.getItem(CACHE_KEY);
        if (cache) {
            const { timestamp, data } = JSON.parse(cache);
            if (Date.now() - timestamp < CACHE_DURATION) {
                setProdutos(data);
                return;
            }
        }
        refreshProdutos();
    };

    const refreshProdutos = async () => {
        const freshProdutos = await findAllProdutos();
        setProdutos(freshProdutos);
        const cache = { timestamp: Date.now(), data: freshProdutos };
        await AsyncStorage.setItem(CACHE_KEY, JSON.stringify(cache));
    };

    return (
        <ProductContext.Provider value={{ produtos, refreshProdutos }}>
            {children}
        </ProductContext.Provider>
    );
};

export const useProducts = () => React.useContext(ProductContext);