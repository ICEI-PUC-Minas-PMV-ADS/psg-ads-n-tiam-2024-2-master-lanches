import React, { useEffect, useState } from "react";
import { View, Text, Image, ActivityIndicator } from "react-native";
import styles from "./style";
import { findProdutoById } from "../../../../api/produto";

export default function LargeCard({ produtoId }) {
    const [produto, setProduto] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProduto = async () => {
            try {
                setLoading(true);
                setError(null); // Reseta o erro a cada nova requisição
                const data = await findProdutoById({ id: produtoId });
                console.log("Dados do Produto:", data);
                setProduto(data);
            } catch (error) {
                console.error("Erro ao buscar produto:", error);
                setError("Falha ao carregar produto. Tente novamente.");
            } finally {
                setLoading(false);
            }
        };

        fetchProduto();
    }, [produtoId]); // Adicionando produtoId como dependência para refazer a requisição se o ID mudar

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#4CAF50" />
                <Text>Carregando...</Text>
            </View>
        );
    }

    if (error) {
        return <Text style={styles.errorText}>{error}</Text>;
    }

    if (!produto) {
        return <Text style={styles.errorText}>Produto não encontrado</Text>;
    }

    const { nome, preco, statusDisponibilidade, imagemUrl, ingredientes } = produto;

    return (
        <View style={styles.card}>
            <Image 
                source={{ uri: imagemUrl || 'https://exemplo.com/imagem-default.jpg' }} 
                style={styles.imagem} 
            />
            <Text style={styles.nome}>{nome}</Text>
            <Text style={styles.preco}>Preço: R$ {preco ? preco.toFixed(2) : "N/A"}</Text>
            <Text style={styles.status}>
                {statusDisponibilidade ? "Disponível" : "Indisponível"}
            </Text>
            <Text style={styles.tituloIngredientes}>Ingredientes:</Text>
            {ingredientes?.length ? (
                ingredientes.map((ingrediente) => (
                    <View key={ingrediente.idIngrediente} style={styles.ingrediente}>
                        <Text>{ingrediente.nome} - R$ {ingrediente.precoUnitario.toFixed(2)}</Text>
                    </View>
                ))
            ) : (
                <Text style={styles.semIngredientes}>Sem ingredientes adicionais</Text>
            )}
        </View>
    );
}
