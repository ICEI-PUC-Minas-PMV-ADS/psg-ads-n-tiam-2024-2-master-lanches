import React, { useEffect, useState } from 'react';
import { View, Text, Image, ActivityIndicator } from 'react-native';
import styles from './style';
import { useProducts } from '../../../contexts/ProductContext';

function LargeCard({ produtoId }) {
    const { getProdutoById } = useProducts();
    const [produto, setProduto] = useState(null);
    const [status, setStatus] = useState({ loading: true, error: null });

    useEffect(() => {
        const fetchProduto = async () => {
            try {
                setStatus({ loading: true, error: null });
                const data = await getProdutoById(produtoId);
                setProduto(data);
            } catch {
                setStatus({ error: 'Erro ao carregar produto' });
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
            <Image source={{ uri: produto.imagemUrl || DefaultImage }} style={styles.imagem} resizeMode="contain" />
            <Text style={styles.nome}>{produto.nome}</Text>
            <Text style={styles.preco}>R$ {produto.preco.toFixed(2)}</Text>
        </View>
    );
}

const LoadingComponent = () => (
    <View style={[styles.card, styles.loadingContainer]}>
        <ActivityIndicator size="large" color="#4CAF50" />
        <Text style={styles.loadingText}>Carregando...</Text>
    </View>
);

const ErrorComponent = ({ message }) => (
    <Text style={styles.errorText}>{message}</Text>
);

export default React.memo(LargeCard, (prevProps, nextProps) => prevProps.produtoId === nextProps.produtoId);