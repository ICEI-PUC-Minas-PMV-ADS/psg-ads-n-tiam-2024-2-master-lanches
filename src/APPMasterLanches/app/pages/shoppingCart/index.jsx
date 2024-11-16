import React, { memo } from 'react';
import { Text, View, FlatList, TouchableOpacity } from 'react-native';
import BottomBar from '../../components/bottomBar';
import { useCart } from '../../contexts/CartContext';
import styles from './style';

const CartItem = memo(({ item, onIncrement, onDecrement, onRemove }) => (
    <View style={styles.cartItem}>
        <Text style={styles.cartItemText}>{item.nome}</Text>
        <Text style={styles.cartItemText}>Quantidade: {item.quantidade}</Text>
        <View style={styles.cartActions}>
            <TouchableOpacity onPress={() => onDecrement(item.id)}>
                <Text style={styles.actionText}>-</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => onIncrement(item.id)}>
                <Text style={styles.actionText}>+</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => onRemove(item.id)}>
                <Text style={styles.removeText}>Remover</Text>
            </TouchableOpacity>
        </View>
    </View>
));

const ShoppingCart = () => {
    const { cart, incrementItemQuantity, decrementItemQuantity, removeFromCart } = useCart();

    return (
        <View style={styles.container}>
            <FlatList
                data={cart}
                renderItem={({ item }) => (
                    <CartItem
                        item={item}
                        onIncrement={incrementItemQuantity}
                        onDecrement={decrementItemQuantity}
                        onRemove={removeFromCart}
                    />
                )}
                keyExtractor={(item) => item.id.toString()}
                contentContainerStyle={styles.cartList}
                ListEmptyComponent={<Text style={styles.emptyCart}>Carrinho vazio</Text>}
            />
            <BottomBar />
        </View>
    );
};

export default ShoppingCart;