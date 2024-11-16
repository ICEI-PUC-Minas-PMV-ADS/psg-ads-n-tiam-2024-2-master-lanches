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

    const addToCart = useCallback((item) => {
        setCart((prevCart) => {
            const itemIndex = prevCart.findIndex((cartItem) => cartItem.id === item.id);
            if (itemIndex !== -1) {
                const updatedCart = [...prevCart];
                updatedCart[itemIndex].quantidade += 1;
                return updatedCart;
            } else {
                return [...prevCart, { ...item, quantidade: 1 }];
            }
        });
    }, []);

    const incrementItemQuantity = useCallback((id) => {
        setCart((prevCart) =>
            prevCart.map((item) =>
                item.id === id ? { ...item, quantidade: item.quantidade + 1 } : item
            )
        );
    }, []);

    const decrementItemQuantity = useCallback((id) => {
        setCart((prevCart) =>
            prevCart
                .map((item) =>
                    item.id === id && item.quantidade > 1
                        ? { ...item, quantidade: item.quantidade - 1 }
                        : item
                )
                .filter((item) => item.quantidade > 0)
        );
    }, []);

    const removeFromCart = useCallback((id) => {
        setCart((prevCart) => prevCart.filter((item) => item.id !== id));
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