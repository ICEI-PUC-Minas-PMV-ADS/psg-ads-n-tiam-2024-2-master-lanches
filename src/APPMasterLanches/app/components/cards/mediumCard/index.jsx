import React, { useEffect, useState } from "react";
import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import styles from "./style";
import { findAllProdutos } from "../../../../api/produto";
import { useCart } from '../../../contexts/CartContext'; // Importe o useCart

export default function MediumCard() {
    const [produtos, setProdutos] = useState([]);
    const { addToCart } = useCart(); // Use a função addToCart do CartContext

    useEffect(() => {
        const fetchProdutos = async () => {
            try {
                const data = await findAllProdutos();
                console.log("Dados dos Produtos:", data);
                setProdutos(data);
            } catch (error) {
                console.error("Erro ao buscar produtos:", error);
            }
        };

        fetchProdutos();
    }, []);

    if (produtos.length === 0) {
        return <Text style={styles.loadingText}>Carregando...</Text>;
    }

    const handleAddToCart = (produto) => {
        console.log("Produto adicionado ao carrinho:", produto.nome);
        addToCart(produto); // Agora a função addToCart do contexto é chamada
    };

    return (
        <ScrollView contentContainerStyle={styles.cardContainer}>
            {produtos.map((produto) => (
                <View key={produto.id} style={[styles.card, styles.cardSpacing]}>
                    <Image 
                        source={{ uri: produto.imagemUrl || 'https://exemplo.com/imagem-default.jpg' }} 
                        style={styles.imagem} 
                    />
                    <View style={styles.infoContainer}>
                        <Text style={styles.nome}>{produto.nome}</Text>
                        <Text style={styles.preco}>R$ {produto.preco.toFixed(2)}</Text>
                        <Text style={styles.status}>
                            {produto.statusDisponibilidade ? "Disponível" : "Indisponível"}
                        </Text>
                        <TouchableOpacity style={styles.addButton} onPress={() => handleAddToCart(produto)}>
                            <Text style={styles.addButtonText}>Adicionar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            ))}
        </ScrollView>
    );
}
