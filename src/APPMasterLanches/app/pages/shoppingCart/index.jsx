import React, { memo, useMemo } from 'react';
import { Text, View, FlatList, TouchableOpacity, Alert } from 'react-native';
import BottomBar from '../../components/bottomBar';
import { useCart } from '../../contexts/CartContext';
import styles from './style';

const CartItem = memo(({ item, onIncrement, onDecrement, onRemove }) => (
    <View style={styles.cartItem}>
        <Text style={styles.cartItemText}>{item.nome}</Text>
        {item.adicionais?.length > 0 ? (
            <Text style={styles.adicionaisText}>
                Adicionais: {item.adicionais.map((a) => a.nome).join(', ')}
            </Text>
        ) : (
            <Text style={styles.adicionaisText}>Sem adicionais</Text>
        )}
        <Text style={styles.cartItemText}>Preço unitário: R$ {item.preco.toFixed(2)}</Text>
        <Text style={styles.cartItemText}>Quantidade: {item.quantidade}</Text>
        <Text style={styles.cartItemText}>Subtotal: R$ {(item.quantidade * item.preco).toFixed(2)}</Text>
        <View style={styles.cartActions}>
            <View style={styles.actionContainer}>
                <TouchableOpacity onPress={() => onIncrement(item.uniqueId)} style={styles.actionButton}>
                    <Text style={styles.actionText}>+</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => onDecrement(item.uniqueId)} style={styles.actionButton}>
                    <Text style={styles.actionText}>-</Text>
                </TouchableOpacity>
            </View>
            <TouchableOpacity onPress={() => onRemove(item.uniqueId)} style={styles.removeButton}>
                <Text style={styles.removeText}>Remover</Text>
            </TouchableOpacity>
        </View>
    </View>
));

const ShoppingCart = () => {
    const { cart, incrementItemQuantity, decrementItemQuantity, removeFromCart, clearCart } = useCart();

    const totalPrice = useMemo(() => {
        return cart.reduce((total, item) => total + item.preco * item.quantidade, 0);
    }, [cart]);

    const handleCheckout = () => {
        Alert.alert(
            'Finalizar Pedido',
            `Deseja finalizar o pedido no valor de R$ ${totalPrice.toFixed(2)}?`,
            [
                { text: 'Cancelar', style: 'cancel' },
                { text: 'Confirmar', onPress: () => {
                    clearCart();
                    Alert.alert('Pedido Finalizado!', 'Seu pedido foi enviado com sucesso.');
                }},
            ]
        );
    };

    return (
        <View style={{ flex: 1 }}>
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
                    keyExtractor={(item, index) => item.uniqueId?.toString() || index.toString()}
                    contentContainerStyle={styles.cartList}
                    ListEmptyComponent={<Text style={styles.emptyCart}>Carrinho vazio</Text>}
                />
                {cart.length > 0 && (
                    <View style={styles.cartFooter}>
                        <Text style={styles.totalText}>Total: R$ {totalPrice.toFixed(2)}</Text>
                        <TouchableOpacity style={styles.checkoutButton} onPress={handleCheckout}>
                            <Text style={styles.checkoutText}>Finalizar Pedido</Text>
                        </TouchableOpacity>
                    </View>
                )}
            </View>
            <BottomBar />
        </View>
    );
};

export default ShoppingCart;