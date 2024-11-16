import React, { useEffect, useState } from "react";
import { View, Text, Image, ActivityIndicator } from "react-native";
import styles from "./style";
import { findProdutoById } from "../../../../api/produto";
import { useProducts } from "../../../contexts/ProductContext";

export default function LargeCard({ produtoId }) {
    const { produtos } = useProducts(); // Obtém os produtos do contexto
    const [produto, setProduto] = useState(null);
    const [status, setStatus] = useState({ loading: true, error: null });

    useEffect(() => {
        const fetchProduto = async () => {
            setStatus({ loading: true, error: null });

            try {
                // Busca no contexto primeiro
                const produtoLocal = produtos.find((p) => p.id === produtoId);
                if (produtoLocal) {
                    setProduto(produtoLocal);
                } else {
                    // Se não estiver no contexto, busca na API
                    const data = await findProdutoById({ id: produtoId });
                    setProduto(data);
                }
            } catch (error) {
                console.error("Erro ao buscar produto:", error);
                setStatus({ loading: false, error: "Falha ao carregar produto. Tente novamente." });
            } finally {
                setStatus((prev) => ({ ...prev, loading: false }));
            }
        };

        fetchProduto();
    }, [produtoId, produtos]);

    if (status.loading) return <LoadingComponent />;
    if (status.error) return <ErrorComponent message={status.error} />;
    if (!produto) return <ErrorComponent message="Produto não encontrado" />;

    return (
        <View style={styles.card}>
            <Image source={{ uri: produto.imagemUrl || 'https://exemplo.com/imagem-default.jpg' }} style={styles.imagem} />
            <Text style={styles.nome}>{produto.nome}</Text>
            <Text style={styles.preco}>Preço: R$ {produto.preco ? produto.preco.toFixed(2) : "N/A"}</Text>
            <Text style={styles.status}>{produto.statusDisponibilidade ? "Disponível" : "Indisponível"}</Text>
            <Text style={styles.tituloIngredientes}>Ingredientes:</Text>
            {renderIngredientes(produto.ingredientes)}
        </View>
    );
}

function LoadingComponent() {
    return (
        <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#4CAF50" />
            <Text>Carregando...</Text>
        </View>
    );
}

function ErrorComponent({ message }) {
    return <Text style={styles.errorText}>{message}</Text>;
}

function renderIngredientes(ingredientes) {
    if (!ingredientes?.length) {
        return <Text style={styles.semIngredientes}>Sem ingredientes adicionais</Text>;
    }
    return ingredientes.map((ingrediente) => (
        <View key={ingrediente.idIngrediente} style={styles.ingrediente}>
            <Text>{ingrediente.nome} - R$ {ingrediente.precoUnitario.toFixed(2)}</Text>
        </View>
    ));
}