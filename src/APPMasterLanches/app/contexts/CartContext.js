import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
    const [cart, setCart] = useState([]);

    // Adiciona o item ao carrinho ou incrementa a quantidade se já existir
    function addToCart(item) {
        setCart(prevCart => {
            // Verifica se o item já está no carrinho
            const itemIndex = prevCart.findIndex(cartItem => cartItem.id === item.id);
            
            if (itemIndex !== -1) {
                // Incrementa a quantidade de um item existente
                const updatedCart = [...prevCart];
                updatedCart[itemIndex].quantidade += 1;
                return updatedCart;
            } else {
                // Adiciona o novo item com quantidade inicial 1
                return [...prevCart, { ...item, quantidade: 1 }];
            }
        });
    }

    // Incrementa a quantidade de um item no carrinho
    function incrementItemQuantity(id) {
        setCart(prevCart =>
            prevCart.map(item =>
                item.id === id ? { ...item, quantidade: item.quantidade + 1 } : item
            )
        );
    }

    // Decrementa a quantidade de um item no carrinho
    function decrementItemQuantity(id) {
        setCart(prevCart =>
            prevCart
                .map(item =>
                    item.id === id && item.quantidade > 1
                        ? { ...item, quantidade: item.quantidade - 1 }
                        : item
                )
                .filter(item => item.quantidade > 0) // Remove o item se a quantidade for 0
        );
    }

    function removeFromCart(id) {
        setCart(prevCart => prevCart.filter(item => item.id !== id));
    }

    return (
        <CartContext.Provider value={{ cart, addToCart, incrementItemQuantity, decrementItemQuantity, removeFromCart }}>
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    return useContext(CartContext);
}
