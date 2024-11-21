import React from 'react';
import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native';
import styles from './style'; // Importando os estilos globais
import { useProducts } from '../../../contexts/ProductContext';

export default function CategoriaTeste({nomeCategoria ='Bebida'}) {
    const { produtos } = useProducts();
    
    const produtosCategoria = produtos[nomeCategoria]
    console.log(produtosCategoria) //Pra ver os produtos carregados
    const renderItem = ({ item }) => (
    <View style={styles.cardContainer}>
      <Image source={{ uri: item.imagemUrl }} style={styles.image} />
      <Text style={styles.text}>{item.nome}</Text>
      <Text style={styles.price}>{item.preco}</Text>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Adicionar</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>{nomeCategoria}(s)</Text>
      <FlatList
        data={produtosCategoria}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.scrollContainer}
      />
    </View>
  );
}