import React, { useState } from 'react';
import { Text, View, Image, TouchableWithoutFeedback, Pressable, StatusBar } from 'react-native';
import styles from './style';
import ModalAdicionais from '../Adicionais';
import CustomButton from '../../CustomButton/index';
import { useCart } from '../../../contexts/CartContext';

export default function DetalhesItem({ item, onClose }) {
    const { addToCart } = useCart();
    const [isModalVisible, setModalVisible] = useState(false);
    const [adicionais, setAdicionais] = useState([]);
    const isBebida = item.categoriaId === "1";

    // Calcula o preço total (produto base + adicionais)
    const totalPreco = item.preco + adicionais.reduce((acc, adicional) => acc + adicional.preco, 0);

    const handleOpenAdicionaisModal = () => setModalVisible(true);

    const handleCloseAdicionaisModal = () => setModalVisible(false);

    const handleAddAdicionais = (selectedAdicionais) => {
        setAdicionais(selectedAdicionais); // Atualiza os adicionais
    };

    const handleAddToCart = () => {
        const cartItem = {
            ...item,
            adicionais,
            preco: totalPreco,
        };
        addToCart(cartItem, adicionais); // Envia adicionais para o contexto
        onClose();
    };

    return (
        <TouchableWithoutFeedback onPress={onClose}>
            <View style={styles.container}>
                <StatusBar barStyle="default" />
                <ModalAdicionais
                    isVisible={isModalVisible}
                    onClose={handleCloseAdicionaisModal}
                    onAddAdicionais={handleAddAdicionais}
                    item={item}
                />
                <Pressable style={styles.box} onPress={(e) => e.stopPropagation()}>
                    <View style={styles.header}>
                        <Image
                            source={{ uri: item.imagemUrl || DefaultImage }}
                            style={styles.itemImage}
                            resizeMode="contain"
                        />
                        <View>
                            <Text style={styles.itemTitle}>{item.nome}</Text>
                            <Text style={styles.itemPrice}>{`R$ ${totalPreco.toFixed(2)}`}</Text>
                        </View>
                    </View>

                    {/* Exibição de ingredientes ou descrição */}
                    {isBebida ? (
                        <View style={styles.descriptionBox}>
                            <Text>Volume: {item.volume} ml</Text>
                        </View>
                    ) : (
                        <View style={styles.descriptionBox}>
                            <Text style={styles.title}>Ingredientes:</Text>
                            {item.ingredientes?.length > 0 ? (
                                item.ingredientes.map((ingrediente, index) => (
                                    <Text key={index} style={styles.ingredienteText}>
                                        {ingrediente.nome}
                                    </Text>
                                ))
                            ) : (
                                <Text style={styles.ingredienteText}>Sem ingredientes adicionais</Text>
                            )}

                            {adicionais.length > 0 && (
                                <>
                                    <Text style={styles.title}>Adicionais:</Text>
                                    {adicionais.map((adicional, index) => (
                                        <Text key={index} style={styles.ingredienteText}>
                                            {adicional.nome} - R$ {adicional.preco.toFixed(2)}
                                        </Text>
                                    ))}
                                </>
                            )}
                        </View>
                    )}

                    {/* Botões de ação */}
                    <View style={styles.buttonBar}>
                        {!isBebida && (
                            <CustomButton
                                style={styles.buttonBackground}
                                textStyle={styles.buttonText}
                                texto="Adicionais"
                                backgroundColor="#FF6347"
                                hoverColor="#ab3838"
                                onPress={handleOpenAdicionaisModal}
                            />
                        )}
                        <CustomButton
                            style={styles.buttonBackground}
                            textStyle={styles.buttonText}
                            texto={isBebida ? "Definir Quantidade" : "Adicionar"}
                            backgroundColor="#FF6347"
                            textColor="#fff"
                            hoverColor="#ab3838"
                            onPress={handleAddToCart}
                        />
                    </View>
                </Pressable>
            </View>
        </TouchableWithoutFeedback>
    );
}