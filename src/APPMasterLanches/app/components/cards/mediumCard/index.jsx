import React, { useEffect, useState } from "react";
import { View, Text, Image, TouchableOpacity, FlatList } from "react-native";
import styles from "./style";
import { useProducts } from "../../../contexts/ProductContext";
import { useCart } from "../../../contexts/CartContext";
import DefaultImage from '../../../assets/Default_noLoad.jpg';

export default function MediumCard() {
    const { produtos, refreshProdutos } = useProducts();
    const { addToCart } = useCart();
    const [loading, setLoading] = useState(true);
    // Função para adicionar ao carrinho
    const handleAddToCart = (produto) => {
        console.log("Produto adicionado ao carrinho:", produto.nome);
        addToCart(produto);
    };
    useEffect(() => {
        if (produtos.length > 0) {
            setLoading(false)
        }
    }, [produtos]);
    // Renderiza cada item do produto
    const renderItem = ({ item: produto }) => (
        <View key={produto.id} style={[styles.card, styles.cardSpacing]}>
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
                    onPress={() => handleAddToCart(produto)}
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
                    keyExtractor={(produto) => produto.id.toString()}
                    contentContainerStyle={styles.cardContainer}
                    onRefresh={refreshProdutos} // Para permitir pull-to-refresh
                    refreshing={false}
                />
            )}
        </View>
    );
}