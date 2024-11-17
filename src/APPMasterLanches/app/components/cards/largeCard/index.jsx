import React, { useEffect, useState } from 'react';
import { View, Text, Image, ActivityIndicator } from 'react-native';
import styles from './style';
import { useProducts } from '../../../contexts/ProductContext';

function LargeCard({ produtoId }) {
    const { getProdutoById } = useProducts();
    const [produto, setProduto] = useState({});
    const [status, setStatus] = useState({ loading: true, error: null });
    console.log('Produto carregado em LargeCard:', produto);
    useEffect(() => {
        const fetchProduto = async () => {
            setStatus({ loading: true, error: null });
            try {
                const produto = await getProdutoById(produtoId);
                setProduto(produto);
            } catch {
                setStatus({ loading: false, error: 'Erro ao carregar produto' });
            } finally {
                setStatus({ loading: false });
            }
        };
        fetchProduto();
    }, [produtoId]);

    if (status.loading) return <LoadingComponent />;
    if (status.error) return <ErrorComponent message={status.error} />;
    if (!produto) return <ErrorComponent message="Produto não encontrado" />;

    return (
        <View style={styles.card}>
            <Image source={{ uri: produto.imagemUrl || DefaultImage }} style={styles.imagem} />
            <Text style={styles.nome}>{produto.nome}</Text>
            <Text style={styles.preco}>Preço: R$ {produto.preco.toFixed(2)}</Text>
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


export default React.memo(LargeCard, (prevProps, nextProps) => {
    return prevProps.produtoId === nextProps.produtoId;
});