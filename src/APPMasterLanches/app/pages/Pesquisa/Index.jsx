import React, { useState, useRef, useEffect } from 'react';
import { Text, View, TextInput, Image, FlatList, Pressable, Modal, SafeAreaView, Platform } from 'react-native';
import styles from './style.js';
import Entypo from 'react-native-vector-icons/Entypo';
import BottomBar from '../../components/bottomBar/index.jsx';
import DetalhesItem from '../../components/Detalhes/index.jsx';
import Teste from "../../assets/teste.jpeg";
import { findAllProdutos } from "../../../api/produto.js";

function Pesquisa() {
  const preco = 2.20;
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const inputRef = useRef(null);
  const [produtos, setProdutos] = useState([]);

  const itemTemplate = ({ item }) => (
    <Pressable 
      style={styles.itemBox} 
      onPress={() => {
        setSelectedItem(item);
        setModalVisible(true);
      }}
    >
      <Image source={{ uri: item.imagemUrl || 'https://exemplo.com/imagem-default.jpg' }}  style={styles.itemImage}/>
      <View>
        <Text style={styles.itemTitle} numberOfLines={2} ellipsizeMode='tail'>{item.nome}</Text>
        <Text style={styles.itemPrice}>R$ {item.preco.toFixed(2)}</Text>
      </View>
    </Pressable>
  );
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
  const data = [
    { id: '1', title: 'Hamburguer teste 1', price: 10.99, image: Teste, ingredientes: 'Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste ' },
    { id: '2', title: 'Hamburguer teste 2', price: 12.99, image: Teste, ingredientes: 'Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste '  },
    { id: '3', title: 'Hamburguer teste 3', price: 8.99, image: Teste, ingredientes: 'Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste '  },
    // Adicione mais itens conforme necessário
  ];

  return (
    <SafeAreaView style={styles.page}>
      <View style={styles.container}> 
      <Modal
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <DetalhesItem item={selectedItem} onClose={() => setModalVisible(false)} />
      </Modal>
      <View style={styles.containerPesquisa}>
        <Pressable style={styles.barraPesquisa} onPress={() => inputRef.current.focus()}>
          <Entypo name="magnifying-glass" size={20} color="gray" style={{ marginLeft: 10 }} />
          <TextInput 
            ref={inputRef}
            placeholder='Digite para pesquisar' 
            placeholderTextColor="#fff" // Garante que o placeholder também seja branco
            style={styles.inputPesquisa} 
            keyboardType='email-address'
          />
        </Pressable>
      </View>
      <FlatList
        data={produtos}
        renderItem={itemTemplate}
        keyExtractor={item => item.id}
        style={styles.lista}
      />
      </View>
      <BottomBar />
    </SafeAreaView>
  );
}

export default Pesquisa;