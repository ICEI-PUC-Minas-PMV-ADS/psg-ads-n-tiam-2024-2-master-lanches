import React, { createContext, useState, useContext } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);

    const addToCart = (produto) => {
        setCart((prevCart) => [...prevCart, produto]);
    };

    const removeFromCart = (produtoId) => {
        setCart((prevCart) => prevCart.filter(item => item.id !== produtoId));
    };

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
            {children}
        </CartContext.Provider>
    );
};
