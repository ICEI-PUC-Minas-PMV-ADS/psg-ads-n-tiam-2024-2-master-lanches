import React, { useState, useRef } from 'react';
import { Text, View, TextInput, Image, FlatList, Pressable, Modal, SafeAreaView, Platform } from 'react-native';
import styles from './style';
import Entypo from 'react-native-vector-icons/Entypo';
import BottomBar from '../../components/bottomBar';
import DetalhesItem from '../../components/Detalhes/index.jsx';
import Teste from "../../assets/teste.jpeg";

function Pesquisa() {
  const preco = 2.20;
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const inputRef = useRef(null);

  const itemTemplate = ({ item }) => (
    <Pressable 
      style={styles.itemBox} 
      onPress={() => {
        setSelectedItem(item);
        setModalVisible(true);
      }}
    >
      <Image source={item.image} style={styles.itemImage} resizeMode='contain'/>
      <View>
        <Text style={styles.itemTitle}>{item.title}</Text>
        <Text style={styles.itemPrice}>R$ {item.price.toFixed(2)}</Text>
      </View>
    </Pressable>
  );

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
        data={data}
        renderItem={itemTemplate}
        keyExtractor={item => item.id}
      />
      </View>
      <BottomBar />
    </SafeAreaView>
  );
}

export default Pesquisa;