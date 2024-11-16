import React, { useState } from 'react';
import { Modal, Text, View, TouchableOpacity, FlatList, Button } from 'react-native';
import styles from './style';

const adicionaisDisponiveis = [
  { id: 1, nome: 'Queijo extra', preco: 2.5 },
  { id: 2, nome: 'Bacon', preco: 3.0 },
  { id: 3, nome: 'Molho especial', preco: 1.5 },
  { id: 4, nome: 'Alface', preco: 1.0 },
  { id: 5, nome: 'Tomate', preco: 1.2 },
  // Mais adicionais podem ser adicionados aqui
];

const ModalAdicionais = ({ isVisible, onClose, onAddAdicionais, item }) => {
  const [adicionaisSelecionados, setAdicionaisSelecionados] = useState([]);

  const handleAddAdicional = (adicional) => {
    setAdicionaisSelecionados((prev) => {
      if (prev.some((ad) => ad.id === adicional.id)) {
        return prev.filter((ad) => ad.id !== adicional.id);
      } else {
        return [...prev, adicional];
      }
    });
  };

  const handleConfirm = () => {
    onAddAdicionais(adicionaisSelecionados);  // Passa os adicionais selecionados para o item
    onClose();  // Fecha o modal
  };

  return (
    <Modal visible={isVisible} animationType="slide" transparent={true}>
      <View style={styles.modalBackground}>
        <View style={styles.modalContainer}>
          <Text style={styles.title}>Adicionais</Text>
          
          <FlatList
            data={adicionaisDisponiveis}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => handleAddAdicional(item)}>
                <View style={styles.adicionalItem}>
                  <Text>{item.nome} - R$ {item.preco.toFixed(2)}</Text>
                  {adicionaisSelecionados.some((ad) => ad.id === item.id) && <Text>✔️</Text>}
                </View>
              </TouchableOpacity>
            )}
          />
          
          <Button title="Adicionar ao Pedido" onPress={handleConfirm} disabled={adicionaisSelecionados.length === 0} />
          <Button title="Fechar" onPress={onClose} />
        </View>
      </View>
    </Modal>
  );
};

export default ModalAdicionais;