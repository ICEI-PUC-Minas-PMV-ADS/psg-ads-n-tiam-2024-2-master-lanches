import React, { useState } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, Modal } from 'react-native';
import styles from './style'; // Importando os estilos globais
import { useProducts } from '../../../contexts/ProductContext';
import { useNavigation } from '@react-navigation/native';

const bebidas = [
  {
    id: "1",
    nome: "Coca Cola Lata 310 ml",
    preco: "R$ 5,00",
    imagem: "https://www.bing.com/images/blob?bcid=svj.vawJz88HXQ",
  },
  {
    id: "2",
    nome: "Mate Couro 1L",
    preco: "R$ 8,90",
    imagem: "https://farmaciaindiana.vtexassets.com/arquivos/ids/205866-800-800?v=636746983612100000&width=800&height=800&aspect=true",
  },
  {
    id: "3",
    nome: "Mate Couro 1L ZERO",
    preco: "R$ 8,90",
    imagem: "https://apoioentrega.vteximg.com.br/arquivos/ids/851931-1000-1000/1170_0.png?v=638595340214830000",
  },
  {
    id: "4",
    nome: "Guaraná Antártica 1,5L",
    preco: "R$ 12,90",
    imagem: "https://apoioentrega.vteximg.com.br/arquivos/ids/836999-500-500/105177_0.png?v=638573470155030000",
  },
  {
    id: "5",
    nome: "Guaraná Antártica 2L",
    preco: "R$ 15,90",
    imagem: "https://m.media-amazon.com/images/I/51GYR4rO8+L._AC_SX569_.jpg",
  },
  {
    id: "6",
    nome: "Soda Limonada 2L",
    preco: "R$ 12,90",
    imagem: "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcRoWEZr3M7HcNmxBJasgVj8Sl6hoyJLcd6bQKeYgiGiwLmLksOs58-sr5Zi7zqVToazZVz7O1EP1vWp5_nM9CU-5k1Qp26rsQvx_ADPjuVxElZyc_BWWzHQgvfXYIf9-u9MUQqnTCs&usqp=CAc",
  },
  {
    id: "7",
    nome: "Sukita Laranja 2L",
    preco: "R$ 12,90",
    imagem: "https://carrefourbr.vtexassets.com/arquivos/ids/169439211/16d9a89afe8043b6a3592510807cbff7.jpg?v=638598902188500000",
  },
  {
    id: "8",
    nome: "Pepsi 2L",
    preco: "R$ 15,90",
    imagem: "https://carrefourbr.vtexassets.com/arquivos/ids/118251451/750b5e5af66c4aef9e73db5b047baf22.jpg?v=638217325062900000",
  },
  {
    id: "9",
    nome: "Suco 1L UVA",
    preco: "R$ 9,90",
    imagem: "https://carrefourbr.vtexassets.com/arquivos/ids/161315774/9a75ea4fabd849ffac129e7035a498c8.jpg?v=638543997489730000",
  },
  {
    id: "10",
    nome: "Suco 1L MARACUJÁ",
    preco: "R$ 9,90",
    imagem: "https://carrefourbr.vtexassets.com/arquivos/ids/132011517/141e3b2647b84e31a8cdee4adf188a83.jpg?v=638321487585130000",
  },
];

export default function Categoria({ route }) {
  const { nomeCategoria = 'Bebida' } = route.params;
  const { produtos } = useProducts();
  const navigation = useNavigation();

  const produtosCategoria = produtos[nomeCategoria]

  const renderItem = ({ item }) => (
    <View style={styles.cardContainer}>
      <Image source={{ uri: item.imagemUrl }} style={styles.image} />
      <Text style={styles.text}>{item.nome}</Text>
      <Text style={styles.price}>{item.preco}</Text>
    </View>
  );


  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Text style={styles.backButtonText}>Voltar</Text>
      </TouchableOpacity>
      <FlatList
        data={produtosCategoria}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={styles.list}
        ListHeaderComponent={<Text style={styles.header}>{nomeCategoria}(s)</Text>} />
    </View>
  );
}