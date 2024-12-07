import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CartContext = createContext();
const CART_STORAGE_KEY = 'cart_data';
const CART_EXPIRATION_KEY = 'cart_expiration';

export function CartProvider({ children }) {
    const [cart, setCart] = useState([]);

    // Carrega o carrinho do armazenamento local
    useEffect(() => {
        const loadCart = async () => {
            const storedCart = await AsyncStorage.getItem(CART_STORAGE_KEY);
            const expiration = await AsyncStorage.getItem(CART_EXPIRATION_KEY);

            if (storedCart && expiration) {
                const now = Date.now();
                if (now < Number(expiration)) {
                    setCart(JSON.parse(storedCart));
                } else {
                    await clearCart();
                }
            }
        };

        loadCart();
    }, []);

    // Salva o carrinho no armazenamento local
    useEffect(() => {
        const saveCart = async () => {
            const expiration = Date.now() + 2 * 60 * 60 * 1000; // 2 horas
            await AsyncStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
            await AsyncStorage.setItem(CART_EXPIRATION_KEY, expiration.toString());
        };

        if (cart.length > 0) saveCart();
    }, [cart]);

    const clearCart = async () => {
        setCart([]);
        await AsyncStorage.removeItem(CART_STORAGE_KEY);
        await AsyncStorage.removeItem(CART_EXPIRATION_KEY);
    };

    const generateUniqueId = (item, adicionais, removedIngredients) => {
        const adicionaisIds = adicionais.map((ad) => ad.id).sort().join('-');
        const removedIds = removedIngredients.sort().join('-');
        return `${item.id}-${adicionaisIds}-${removedIds}`;
    };

    const addToCart = useCallback(
        (item, adicionais = [], removedIngredients = [], quantity = 1, precoTotal = 0) => {
            const uniqueId = generateUniqueId(item, adicionais, removedIngredients);
    
            setCart((prevCart) => {
                const existingItemIndex = prevCart.findIndex(
                    (cartItem) => cartItem.uniqueId === uniqueId
                );
    
                if (existingItemIndex !== -1) {
                    // Incrementa a quantidade se o item já existir
                    const updatedCart = [...prevCart];
                    updatedCart[existingItemIndex].quantidade += quantity;
                    return updatedCart;
                }
    
                return [
                    ...prevCart,
                    {
                        ...item,
                        uniqueId,
                        adicionais,
                        removedIngredients,
                        quantidade: quantity,
                        preco: precoTotal, // Preço total calculado
                        categoria: item.categoria || 'Sem Categoria', // Certifique-se de que a categoria está correta
                    },
                ];
            });
        },
        []
    );    

    const incrementItemQuantity = useCallback((uniqueId) => {
        setCart((prevCart) =>
            prevCart.map((item) =>
                item.uniqueId === uniqueId
                    ? { ...item, quantidade: item.quantidade + 1 }
                    : item
            )
        );
    }, []);

    const decrementItemQuantity = useCallback((uniqueId) => {
        setCart((prevCart) =>
            prevCart
                .map((item) =>
                    item.uniqueId === uniqueId
                        ? { ...item, quantidade: item.quantidade - 1 }
                        : item
                )
                .filter((item) => item.quantidade > 0)
        );
    }, []);

    const removeFromCart = useCallback((uniqueId) => {
        setCart((prevCart) => prevCart.filter((item) => item.uniqueId !== uniqueId));
    }, []);

    return (
        <CartContext.Provider
            value={{ cart, addToCart, incrementItemQuantity, decrementItemQuantity, removeFromCart, clearCart }}
        >
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    return useContext(CartContext);
}