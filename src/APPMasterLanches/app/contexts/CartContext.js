import React, { createContext, useContext, useState, useCallback } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
    const [cart, setCart] = useState([]);

    const addToCart = useCallback((item) => {
        setCart(prevCart => {
            const itemIndex = prevCart.findIndex(cartItem => cartItem.id === item.id);
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
        setCart(prevCart =>
            prevCart.map(item =>
                item.id === id ? { ...item, quantidade: item.quantidade + 1 } : item
            )
        );
    }, []);

    const decrementItemQuantity = useCallback((id) => {
        setCart(prevCart =>
            prevCart
                .map(item =>
                    item.id === id && item.quantidade > 1
                        ? { ...item, quantidade: item.quantidade - 1 }
                        : item
                )
                .filter(item => item.quantidade > 0)
        );
    }, []);

    const removeFromCart = useCallback((id) => {
        setCart(prevCart => prevCart.filter(item => item.id !== id));
    }, []);

    return (
        <CartContext.Provider value={{ cart, addToCart, incrementItemQuantity, decrementItemQuantity, removeFromCart }}>
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    return useContext(CartContext);
}