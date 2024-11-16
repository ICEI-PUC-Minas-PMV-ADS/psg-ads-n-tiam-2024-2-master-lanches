import React, { useState, useRef, useEffect } from 'react';
import { Text, View, TextInput, Image, FlatList, Pressable, Modal, SafeAreaView, Platform } from 'react-native';
import styles from './style.js';
import Entypo from 'react-native-vector-icons/Entypo';
import BottomBar from '../../components/bottomBar/index.jsx';
import DetalhesItem from '../../components/Detalhes/index.jsx';
import { searchProdutos } from "../../../api/produto.js";
import { debounce } from 'lodash';

function Pesquisa() {
  const preco = 2.20;
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const inputRef = useRef(null);
  const [produtos, setProdutos] = useState([]);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);

  const itemTemplate = ({ item }) => (
    <Pressable
      style={styles.itemBox}
      onPress={() => {
        setSelectedItem(item);
        setModalVisible(true);
      }}
    >
      <Image source={{ uri: item.imagemUrl || 'https://exemplo.com/imagem-default.jpg' }} style={styles.itemImage} />
      <View>
        <Text style={styles.itemTitle} numberOfLines={2} ellipsizeMode='tail'>{item.nome}</Text>
        <Text style={styles.itemPrice}>R$ {item.preco.toFixed(2)}</Text>
      </View>
    </Pressable>
  );


  async function Pesquisado(query) {
    setLoading(true);
    try {
      const produtos = await searchProdutos(query);
      setProdutos(produtos);
      
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    const debouncedSearch = debounce(() => {
      Pesquisado(query);
    }, 500); // Aguarda 500ms antes de executar a pesquisa

    debouncedSearch();
    return () => debouncedSearch.cancel(); // Limpa o debounce ao desmontar
  }, [query]);
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
              placeholderTextColor="#fff"
              style={styles.inputPesquisa}
              keyboardType='email-address'
              onChangeText={text => setQuery(text)}
              onSubmitEditing={() => Pesquisado(query)}
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