import React, { memo, useMemo, useState } from 'react';
import { Text, View, FlatList, TouchableOpacity, Alert } from 'react-native';
import BottomBar from '../../components/bottomBar';
import ModalPagamento from '../../components/modal/Pagamento';
import { useCart } from '../../contexts/CartContext';
import { accessUser } from '../../contexts/UserContext'; // Contexto de Usuário
import Header from '../../components/header';
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
    const { savePagamento } = accessUser();
    const [isModalVisible, setModalVisible] = useState(false);
    const [pagamentoInfo, setPagamentoInfo] = useState({});

    const userName = 'Josue';
    const userMail = 'stttttttt@gmail.com';

    const totalPrice = useMemo(() => {
        return cart.reduce((total, item) => total + item.preco * item.quantidade, 0);
    }, [cart]);

    const itensFiltrados = (itens) => {
        return itens.map((item) => ({
            _0_Id: item.id,
            _1_Nome: item.nome,
            _2_Categoria: item.nomeCategoria,
            _3_Adicionais: item.adicionais,
            _4_Ingredientes: item.ingredientes,
            _5_Preco: item.preco,
            _6_Quantidade: item.quantidade,
        }));
    };

    const handlePagamento = () => {
        const Pedido = itensFiltrados(cart);
        const Valor = totalPrice;
        const Descricao = `Pagamento de R$ ${Valor.toFixed(2)} feito por ${userName}`;
        const Email = userMail;
    
        const info = { Pedido, Valor, Descricao, Email };
        setPagamentoInfo(info);
        setModalVisible(true);
    };

    const handlePagamentoFinalizado = (pagamentoConcluido) => {
        if (pagamentoConcluido) {
            savePagamento(pagamentoConcluido); // Salva no UserContext
            clearCart(); // Limpa o carrinho
            Alert.alert('Pagamento Concluído', 'Seu pagamento foi processado com sucesso!');
        }
        setModalVisible(false); // Fecha a modal
    };

    return (
        <View style={{ flex: 1, backgroundColor: 'black' }}>
            <Header />
            <ModalPagamento
                isVisible={isModalVisible}
                data={pagamentoInfo}
                onClose={() => setModalVisible(false)}
                onPagamentoFinalizado={handlePagamentoFinalizado}
            />
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
                        <TouchableOpacity style={styles.checkoutButton} onPress={handlePagamento}>
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