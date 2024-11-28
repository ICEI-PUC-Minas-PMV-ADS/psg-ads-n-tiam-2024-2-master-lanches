import React, { useState } from 'react';
import {
  Modal,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Button,
  TouchableWithoutFeedback,
  Pressable,
} from 'react-native';
import styles from './style';

const adicionaisDisponiveis = [
  { id: 1, nome: 'Queijo extra', preco: 2.5 },
  { id: 2, nome: 'Bacon', preco: 3.0 },
  { id: 3, nome: 'Molho especial', preco: 1.5 },
  { id: 4, nome: 'Alface', preco: 1.0 },
  { id: 5, nome: 'Tomate', preco: 1.2 },
];

const ModalAdicionais = ({ isVisible, onClose, onAddAdicionais, product }) => {
  const [adicionaisSelecionados, setAdicionaisSelecionados] = useState([]);

  const toggleAdicional = (adicional) => {
    setAdicionaisSelecionados((prev) =>
      prev.some((ad) => ad.id === adicional.id)
        ? prev.filter((ad) => ad.id !== adicional.id)
        : [...prev, adicional]
    );
  };

  const handleConfirm = () => {
    onAddAdicionais(adicionaisSelecionados);
    onClose();
  };

  return (
    <Modal visible={isVisible} animationType="slide" transparent={true}>
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.modalBackground}>
          <Pressable
            style={styles.modalContainer}
            onPress={(e) => e.stopPropagation()} // Impede que o evento de toque no modal feche o fundo
          >
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
                title={
                  adicionaisSelecionados.length === 0
                    ? 'Sem adicionais'
                    : 'Adicionar ao Pedido'
                }
                onPress={handleConfirm}
              />
            </View>
          </Pressable>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default ModalAdicionais;