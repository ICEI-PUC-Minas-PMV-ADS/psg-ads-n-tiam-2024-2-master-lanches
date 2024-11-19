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

const ModalAdicionais = ({ isVisible, onClose, onAddAdicionais, product }) => {
  const [adicionaisSelecionados, setAdicionaisSelecionados] = useState([]);

  // Alternar seleção de adicional
  const toggleAdicional = (adicional) => {
    setAdicionaisSelecionados((prev) =>
      prev.some((ad) => ad.id === adicional.id)
        ? prev.filter((ad) => ad.id !== adicional.id) // Remove adicional
        : [...prev, adicional] // Adiciona adicional
    );
  };

  const handleConfirm = () => {
    onAddAdicionais(adicionaisSelecionados); // Passa os adicionais selecionados
    onClose();
  };

  return (
    <Modal visible={isVisible} animationType="slide" transparent={true}>
      <View style={styles.modalBackground}>
        <View style={styles.modalContainer}>
          <Text style={styles.title}>Selecione os Adicionais</Text>

          <FlatList
            data={adicionaisDisponiveis}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => {
              const isSelected = adicionaisSelecionados.some((ad) => ad.id === item.id);
              return (
                <TouchableOpacity onPress={() => toggleAdicional(item)}>
                  <View style={[styles.adicionalItem, isSelected && styles.selectedAdicional]}>
                    <Text style={styles.adicionalText}>
                      {item.nome} - R$ {item.preco.toFixed(2)}
                    </Text>
                    {isSelected && <Text style={styles.checkMark}>✔️</Text>}
                  </View>
                </TouchableOpacity>
              );
            }}
          />

          <View style={styles.buttonGroup}>
            <Button
              title="Adicionar ao Pedido"
              onPress={handleConfirm}
              disabled={adicionaisSelecionados.length === 0}
            />
            <Button title="Fechar" onPress={onClose} />
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ModalAdicionais;