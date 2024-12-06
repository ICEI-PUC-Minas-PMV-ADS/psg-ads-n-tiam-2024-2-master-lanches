import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  Modal,
  Button,
  StyleSheet,
} from 'react-native';
import { accessUser } from '../../contexts/UserContext';

const pedidosRealizados = [
  {
    id: '1',
    nome: 'Hambúrguer Clássico',
    preco: 'R$ 20,00',
    imagem: 'https://via.placeholder.com/150',
    status: 'Entregue',
    horario: '14:30 - 01/12/2024',
    ingredientes: ['Pão', 'Carne', 'Queijo', 'Alface', 'Tomate'],
    quantidade: 1,
    finalizado: true,
  },
  {
    id: '2',
    nome: 'Batata Frita',
    preco: 'R$ 10,00',
    imagem: 'https://via.placeholder.com/150',
    status: 'Preparando',
    horario: '14:20 - 01/12/2024',
    ingredientes: ['Batata', 'Sal'],
    quantidade: 2,
    finalizado: false,
  },
  {
    id: '3',
    nome: 'Milkshake Chocolate',
    preco: 'R$ 15,00',
    imagem: 'https://via.placeholder.com/150',
    status: 'Aguardando retirada',
    horario: '14:10 - 01/12/2024',
    ingredientes: ['Leite', 'Chocolate', 'Açúcar'],
    quantidade: 1,
    finalizado: false,
  },
];

export default function ModalGestaoPedidos() {
  const [modalVisible, setModalVisible] = useState(true);
  const user = accessUser();

  const renderItem = ({ item }) => (
    <View style={styles.cardContainer}>
      <Image source={{ uri: item.imagem }} style={styles.image} />
      <Text style={styles.text}>{item.nome}</Text>
      <Text style={styles.price}>{item.preco}</Text>
      <Text style={styles.status}>Status: {item.status}</Text>
      <Text style={styles.horario}>Horário: {item.horario}</Text>
      <Text style={styles.ingredients}>Ingredientes: {item.ingredientes.join(', ')}</Text>
      <Text style={styles.quantity}>Quantidade: {item.quantidade}</Text>
      <Text style={styles.finalizado}>Finalizado: {item.finalizado ? 'Sim' : 'Não'}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Button title="Abrir Modal" onPress={() => setModalVisible(true)} />

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalContainer}>
          <Text style={styles.header}>Pedidos Realizados</Text>
          <FlatList
            data={pedidosRealizados}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            numColumns={1}
            contentContainerStyle={styles.list}
          />
          <Button title="Fechar" onPress={() => setModalVisible(false)} />
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    marginTop: 50,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  list: {
    alignItems: 'center',
  },
  cardContainer: {
    flex: 1,
    margin: 10,
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 5,
  },
  price: {
    fontSize: 14,
    color: '#888',
    textAlign: 'center',
    marginBottom: 10,
  },
  status: {
    fontSize: 14,
    color: '#555',
    textAlign: 'center',
    marginBottom: 5,
  },
  horario: {
    fontSize: 12,
    color: '#777',
    textAlign: 'center',
    marginBottom: 5,
  },
  ingredients: {
    fontSize: 12,
    color: '#555',
    textAlign: 'center',
    marginBottom: 5,
  },
  quantity: {
    fontSize: 12,
    color: '#555',
    textAlign: 'center',
    marginBottom: 5,
  },
  finalizado: {
    fontSize: 12,
    color: '#555',
    textAlign: 'center',
  },
});
