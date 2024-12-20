import React, { useState, useRef, useEffect } from 'react';
import { Text, View, TextInput, Image, FlatList, Pressable, Modal, SafeAreaView } from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import BottomBar from '../../components/bottomBar/index';
import DetalhesItem from '../../components/modal/Detalhes';
import { useProducts } from '../../contexts/ProductContext';
import Header from '../../components/header';
import { debounce } from 'lodash';
import Fuse from 'fuse.js';
import styles from './style';

function Pesquisa() {
  const { produtos: produtosContext } = useProducts(); // Carregamos os produtos do contexto
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const inputRef = useRef(null);
  const [produtos, setProdutos] = useState([]); // Produtos filtrados
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const allProdutos = Object.values(produtosContext).flat()
  const itemTemplate = ({ item }) => (
    <Pressable
      style={styles.itemBox}
      onPress={() => {
        setSelectedItem(item);
        setModalVisible(true);
      }}
    >
      <Image source={{ uri: item.imagemUrl || 'https://exemplo.com/imagem-default.jpg' }} style={styles.itemImage} />
      <View style={{ width: '66%', }}>
        <Text style={styles.itemTitle} numberOfLines={2} ellipsizeMode="tail">
          {item.nome}
        </Text>
        <Text style={styles.itemPrice}>R$ {item.preco.toFixed(2)}</Text>
      </View>
    </Pressable>
  );
  const searchProdutos = async (query, produtos = []) => {
    if (!query) return produtos.slice(0, 3); // Retorna apenas os três primeiros se não houver busca
    const fuse = new Fuse(produtos, {
      keys: ["nome", "ingredientes"],
      threshold: 0.3,
    });
    return fuse.search(query).map(({ item }) => item);
  };

  const Pesquisado = async (query) => {
    setLoading(true);
    try {
      const result = await searchProdutos(query, allProdutos);
      setProdutos(result);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const debouncedSearch = debounce(() => {
      const allProdutos = Object.values(produtosContext).flat(); // Junta todas as categorias
      Pesquisado(query, allProdutos);
    }, 500);

    debouncedSearch();
    return () => debouncedSearch.cancel();
  }, [query, produtosContext]);


  if (!allProdutos || allProdutos.length === 0) {
    return (
      <SafeAreaView style={styles.page}>
        <Text style={styles.loadingText}>Carregando produtos...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.page}>
      <Header />
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
              placeholder="Digite para pesquisar"
              placeholderTextColor="#fff"
              style={styles.inputPesquisa}
              onChangeText={(text) => setQuery(text)}
            />
          </Pressable>
        </View>
        {loading ? (
          <Text style={styles.loadingText}>Carregando...</Text>
        ) : (
          <FlatList
            data={produtos}
            renderItem={itemTemplate}
            keyExtractor={(item) => item.id.toString()}
            style={styles.lista}
          />
        )}
      </View>
      <BottomBar />
    </SafeAreaView>
  );
}

export default Pesquisa;
