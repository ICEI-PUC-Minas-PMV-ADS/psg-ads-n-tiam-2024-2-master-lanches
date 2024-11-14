import React from 'react';
import { Text, View, FlatList, TouchableOpacity } from 'react-native';
import BottomBar from "../../components/bottomBar";
import { useCart } from "../../contexts/CartContext";
import styles from "./style";

export default function ShoppingCart() {
    const { cart, removeFromCart } = useCart();

    // Agrupar produtos semelhantes por nome (ou id) e somar a quantidade
    const groupedCartItems = cart.reduce((acc, item) => {
        const existingItem = acc.find(cartItem => cartItem.id === item.id);
        if (existingItem) {
            existingItem.quantidade += item.quantidade;
        } else {
            acc.push({ ...item });
        }
        return acc;
    }, []);

    // Renderizar cada item no carrinho
    const renderCartItem = ({ item }) => (
        <View style={styles.cartItem}>
            <Text style={styles.cartItemText}>{item.nome}</Text>
            <Text style={styles.cartItemText}>Quantidade: {item.quantidade}</Text>
            <TouchableOpacity onPress={() => removeFromCart(item.id)}>
                <Text style={styles.removeText}>Remover</Text>
            </TouchableOpacity>
        </View>
    );

    return (
        <View style={styles.container}>
            {/* Exibindo os itens agrupados do carrinho */}
            <FlatList
                data={groupedCartItems}
                renderItem={renderCartItem}
                keyExtractor={(item) => item.id.toString()}
                contentContainerStyle={styles.cartList}
                ListEmptyComponent={<Text style={styles.emptyCart}>Carrinho vazio</Text>}
            />
            <BottomBar />
        </View>
    );
}
