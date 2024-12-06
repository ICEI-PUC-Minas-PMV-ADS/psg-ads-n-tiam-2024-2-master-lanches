import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, FlatList, Modal, ActivityIndicator } from 'react-native';
import styles from './style';
import { useProducts } from '../../../contexts/ProductContext';
import DefaultImage from '../../../assets/Default_noLoad.jpg';
import DetalhesItem from '../../modal/Detalhes';

function MediumCard() {
    const { produtos: produtosContext, refreshProdutos } = useProducts();
    const allProdutos = Object.values(produtosContext).flat();
    const [loading, setLoading] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);

    const handleRefresh = async () => {
        setLoading(true);
        await refreshProdutos();
        setLoading(false);
    };

    const renderItem = ({ item: produto }) => (
        <TouchableOpacity
            onPress={() => {
                setSelectedItem(produto);
                setModalVisible(true);
            }}
        >
            <View style={styles.card}>
                {produto ? (
                    <>
                        <Image source={{ uri: produto.imagemUrl || DefaultImage }} style={styles.imagem} />
                        <View style={styles.infoContainer}>
                            <Text style={styles.nome}>{produto.nome}</Text>
                            <Text style={styles.preco}>R$ {produto.preco.toFixed(2)}</Text>
                        </View>
                    </>
                ) : (
                    <ActivityIndicator size="large" color="#4CAF50" />
                )}
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <Modal
                transparent
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <DetalhesItem item={selectedItem} onClose={() => setModalVisible(false)} />
            </Modal>
            <FlatList
                data={allProdutos}
                renderItem={renderItem}
                keyExtractor={(produto, index) => `${produto.id}-${index}`}
                contentContainerStyle={styles.cardContainer}
                refreshing={loading}
                onRefresh={handleRefresh}
            />
        </View>
    );
}

export default React.memo(MediumCard);