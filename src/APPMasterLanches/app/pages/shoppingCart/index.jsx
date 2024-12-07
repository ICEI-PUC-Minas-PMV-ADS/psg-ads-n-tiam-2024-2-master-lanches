import React, { memo, useMemo, useState } from 'react';
import { Text, View, FlatList, TouchableOpacity, Image, Alert } from 'react-native';
import BottomBar from '../../components/bottomBar';
import ModalPagamento from '../../components/modal/Pagamento';
import { useCart } from '../../contexts/CartContext';
import { accessUser } from '../../contexts/UserContext'; // Contexto de Usuário
import Header from '../../components/header';
import styles from './style';

const CartItem = memo(({ item, onIncrement, onDecrement, onRemove }) => (
    <View style={styles.cartItemContainer}>
        <View style={styles.cartItemContent}>
            {/* Informações do produto */}
            <View style={styles.itemDetails}>
                <Text style={styles.itemName}>{item.nome}</Text>
                <Text style={styles.itemAdditional}>
                    {item.adicionais?.length > 0
                        ? `Adicionais: ${item.adicionais.map((a) => a.nome).join(', ')}`
                        : 'Sem adicionais'}
                </Text>
                <Text style={styles.itemRemoved}>
                    {item.removedIngredients?.length > 0
                        ? `Ingredientes removidos: ${item.removedIngredients.join(', ')}`
                        : 'Sem ingredientes removidos'}
                </Text>
                <Text style={styles.itemPrice}>Preço unitário: R$ {item.preco.toFixed(2)}</Text>
                <Text style={styles.itemSubtotal}>Subtotal: R$ {(item.quantidade * item.preco).toFixed(2)}</Text>
            </View>
        </View>

        {/* Ações (Incrementar, Decrementar, Remover) */}
        <View style={styles.actionsContainer}>
            <View style={styles.quantityContainer}>

                <TouchableOpacity
                    style={[styles.actionButton, styles.incrementButton]}
                    onPress={() => onIncrement(item.uniqueId)}
                >
                    <Text style={styles.actionText}>+</Text>
                </TouchableOpacity>
                <Text style={styles.itemQuantity}>{item.quantidade}</Text>
                <TouchableOpacity
                    style={[styles.actionButton, styles.decrementButton]}
                    onPress={() => onDecrement(item.uniqueId)}
                >
                    <Text style={styles.actionText}>-</Text>
                </TouchableOpacity>
            </View>
            <TouchableOpacity
                style={styles.removeButton}
                onPress={() => onRemove(item.uniqueId)}
            >
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