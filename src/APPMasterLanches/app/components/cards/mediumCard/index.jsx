import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, FlatList } from 'react-native';
import styles from './style';
import { useProducts } from '../../../contexts/ProductContext';
import { useCart } from '../../../contexts/CartContext';
import DefaultImage from '../../../assets/Default_noLoad.jpg';

function MediumCard() {
    const { produtos, refreshProdutos } = useProducts();
    const { addToCart } = useCart();
    const [loading, setLoading] = useState(false);

    const handleRefresh = async () => {
        setLoading(true);
        await refreshProdutos();
        setLoading(false);
    };    

    const renderItem = ({ item: produto }) => (
        <View style={[styles.card, styles.cardSpacing]}>
            <Image 
                source={{ uri: produto.imagemUrl || DefaultImage }} 
                style={styles.imagem} 
            />
            <View style={styles.infoContainer}>
                <Text style={styles.nome}>{produto.nome}</Text>
                <Text style={styles.preco}>R$ {produto.preco.toFixed(2)}</Text>
                <Text style={styles.status}>
                    {produto.statusDisponibilidade ? "Disponível" : "Indisponível"}
                </Text>
                <TouchableOpacity 
                    style={styles.addButton} 
                    onPress={() => addToCart(produto)}
                >
                    <Text style={styles.addButtonText}>Adicionar</Text>
                </TouchableOpacity>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            {loading ? (
                <Text style={styles.loadingText}>Carregando produtos...</Text>
            ) : (
                <FlatList
                    data={produtos}
                    renderItem={renderItem}
                    keyExtractor={(produto, index) => `${produto.id}-${index}`}
                    contentContainerStyle={styles.cardContainer}
                    onRefresh={handleRefresh}
                    refreshing={false}
                />
            )}
        </View>
    );
}

export default React.memo(MediumCard);