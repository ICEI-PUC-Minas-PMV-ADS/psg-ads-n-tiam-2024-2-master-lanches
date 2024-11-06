import React, { useEffect, useState } from "react";
import { View, Text, Image } from "react-native";
import styles from "./style";
import { findProdutoById } from "../../../../api/produto";

export default function LargeCard({produtoId}) {
    const [produto, setProduto] = useState(null);

    useEffect(() => {
        const fetchProduto = async () => {
            try {
                const data = await findProdutoById({ id: produtoId });
                console.log("Dados do Produto:", data);
                setProduto(data);
            } catch (error) {
                console.error("Erro ao buscar produto:", error);
            }
        };
    
        fetchProduto();
    }, []);

    if (!produto) {
        return <Text>Carregando...</Text>;
    }

    return (
        <View style={styles.card}>
            <Image 
                source={{ uri: produto.imagemUrl || 'https://exemplo.com/imagem-default.jpg' }} 
                style={styles.imagem} 
            />
            <Text style={styles.nome}>{produto.nome}</Text>
            <Text style={styles.preco}>Preço: R$ {produto.preco.toFixed(2)}</Text>
            <Text style={styles.status}>
                {produto.statusDisponibilidade ? "Disponível" : "Indisponível"}
            </Text>
            <Text style={styles.tituloIngredientes}>Ingredientes:</Text>
            {produto.ingredientes?.map((ingrediente) => (
                <View key={ingrediente.idIngrediente} style={styles.ingrediente}>
                    <Text>{ingrediente.nome} - R$ {ingrediente.precoUnitario.toFixed(2)}</Text>
                </View>
            ))}
        </View>
    );
}