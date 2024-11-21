import React from 'react';
import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native';
import styles from './style'; // Importando os estilos globais

const drinks = [
  { id: '1', name: 'Coca-Cola', price: 'R$ 5,00', image: 'https://link_da_imagem1.com' },
  { id: '2', name: 'Sprite', price: 'R$ 5,00', image: 'https://link_da_imagem2.com' },
  { id: '3', name: 'Suco de Laranja', price: 'R$ 7,00', image: 'https://link_da_imagem3.com' },
  { id: '4', name: 'Água Mineral', price: 'R$ 3,00', image: 'https://link_da_imagem4.com' },
];

export default function CategoriaBebidas() {
  const renderItem = ({ item }) => (
    <View style={styles.cardContainer}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <Text style={styles.text}>{item.name}</Text>
      <Text style={styles.price}>{item.price}</Text>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Adicionar</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Nossas Bebidas</Text>
      <FlatList
        data={drinks}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.scrollContainer}
      />
    </View>
  );
}
