import React, { useState } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, Modal } from 'react-native';
import styles from './style'; // Importando os estilos globais
import { useProducts } from '../../../contexts/ProductContext';
import DetalhesItem from '../../../components/modal/Detalhes';

export default function Categoria({ nomeCategoria = "Bebida" }) {
  const { produtos } = useProducts()
  const [selectedItem, setSelectedItem] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const cardapio = produtos[nomeCategoria]
  console.log(cardapio)
  // Função para renderizar os itens da categoria
  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.cardContainer}
      onPress={() => {
        setSelectedItem(item);
        setModalVisible(true);
      }}>
      <Image source={{ uri: item.imagemUrl }} style={styles.image} />
      <Text style={styles.text}>{item.nome}</Text>
      <Text style={styles.price}>{item.preco}</Text>
    </TouchableOpacity>
  );
  return (
    <View style={styles.container}>
      <FlatList
        data={cardapio}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={styles.list}
        ListHeaderComponent={<Text style={styles.header}>{nomeCategoria}(s)</Text>} />

      {/* Modal para exibir os detalhes do item */}
      {selectedItem && (
        <Modal
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <DetalhesItem item={selectedItem} onClose={() => setModalVisible(false)} />
        </Modal>
      )}
    </View>
  );
}