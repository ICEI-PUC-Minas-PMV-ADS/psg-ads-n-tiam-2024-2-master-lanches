import React from 'react';
import { Text, View, FlatList, TouchableOpacity } from 'react-native';
import BottomBar from '../../components/bottomBar';
import { useCart } from '../../contexts/CartContext';
import styles from './style';

const ShoppingCart = () => {
    const { cart, incrementItemQuantity, decrementItemQuantity, removeFromCart } = useCart();

    const renderCartItem = ({ item }) => (
        <View style={styles.cartItem}>
            <Text style={styles.cartItemText}>{item.nome}</Text>
            <Text style={styles.cartItemText}>Quantidade: {item.quantidade}</Text>
            <View style={styles.cartActions}>
                <TouchableOpacity onPress={() => decrementItemQuantity(item.id)}>
                    <Text style={styles.actionText}>-</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => incrementItemQuantity(item.id)}>
                    <Text style={styles.actionText}>+</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => removeFromCart(item.id)}>
                    <Text style={styles.removeText}>Remover</Text>
                </TouchableOpacity>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={cart}
                renderItem={renderCartItem}
                keyExtractor={(item) => item.id.toString()}
                contentContainerStyle={styles.cartList}
                ListEmptyComponent={<Text style={styles.emptyCart}>Carrinho vazio</Text>}
            />
            <BottomBar />
        </View>
    );
};

export default ShoppingCart;
