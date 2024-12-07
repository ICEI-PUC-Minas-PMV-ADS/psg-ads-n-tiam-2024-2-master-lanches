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


const ModalAdicionais = ({ isVisible, onClose, onAddAdicionais, adicionaisDisponiveis }) => {
  const [adicionaisSelecionados, setAdicionaisSelecionados] = useState([]);

  const toggleAdicional = (adicional) => {
    setAdicionaisSelecionados((prev) =>
      prev.some((ad) => ad.id === adicional.id)
        ? prev.filter((ad) => ad.id !== adicional.id)
        : [...prev, adicional]
    );
  };

  const clearAllAdicionais = () => setAdicionaisSelecionados([]);

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
            onPress={(e) => e.stopPropagation()} // Impede que o clique no modal feche o fundo
          >
            <Text style={styles.title}>Selecione os Adicionais</Text>

            {adicionaisDisponiveis.length === 0 ? (
              <Text style={styles.noAdicionais}>Nenhum adicional disponível para este produto.</Text>
            ) : (
              <FlatList
                data={adicionaisDisponiveis}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => {
                  const isSelected = adicionaisSelecionados.some((ad) => ad.id === item.id);
                  return (
                    <TouchableOpacity onPress={() => toggleAdicional(item)}>
                      <View
                        style={[styles.adicionalItem, isSelected && styles.selectedAdicional]}
                      >
                        <Text style={styles.adicionalText}>
                          {item.nome} - R$ {item.preco.toFixed(2)}
                        </Text>
                        {isSelected && <Text style={styles.checkMark}>✔️</Text>}
                      </View>
                    </TouchableOpacity>
                  );
                }}
              />
            )}

            <View style={styles.buttonGroup}>
              <Button title="Limpar Todos" onPress={clearAllAdicionais} color="#FF6347" />
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
