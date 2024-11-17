import React from 'react';
import { Text, View, Image, TouchableWithoutFeedback, Pressable, StatusBar } from 'react-native';
import styles from './style';
import ModalAdicionais from '../Adicionais';
import CustomButton from '../../CustomButton/index';
import { useCart } from '../../../contexts/CartContext';
import { useState } from 'react';

export default function DetalhesItem({ item, onClose }) {
    const { addToCart } = useCart();
    const [isModalVisible, setModalVisible] = useState(false);
    const isBebida = item.categoriaId === "1";
    const ingredientes = item.ingredientes
    const [adicionais, setAdicionais] = useState([])
    const [preco, setPreco] = useState(item.preco)

    const handleOpenAdicionaisModal = () => {
        setModalVisible(true);
    };

    const handleCloseAdicionaisModal = () => {
        setModalVisible(false);
    };

    const handleAddAdicionais = (adicionais) => {
        // Adicionar os adicionais ao item
        setAdicionais(adicionais);
        handlePrecoAdicionais(adicionais);
    };

    const handlePrecoAdicionais = (adicionais) => {
        let precoAdicionais = adicionais.reduce((total, adicional) => total + adicional.preco, 0);
        setPreco(item.preco + precoAdicionais);
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
                            resizeMode='contain'
                        />
                        <View>
                            <Text style={styles.itemTitle}>{item.nome}</Text>
                            <Text style={styles.itemPrice}>{`R$ ${preco.toFixed(2)}`}</Text>
                        </View>
                    </View>

                    {/* Exibe quadro de ingredientes ou outra informação relevante para bebidas */}
                    {isBebida ? (
                        <View style={styles.descriptionBox}>
                            <Text>Volume: {item.volume} ml</Text>
                            {/* Adicione qualquer outra informação relevante para bebidas aqui */}
                        </View>
                    ) : (
                        <View style={styles.descriptionBox}>
                            <Text style={styles.title}>Ingredientes:</Text>
                            {ingredientes.length ? (
                                ingredientes.map((ingrediente, index) => (
                                    <Text key={index} style={styles.ingredienteText}>{ingrediente.nome}</Text>
                                ))
                            ) : (
                                <Text style={styles.ingredienteText}>Sem ingredientes adicionais</Text>
                            )}

                            {adicionais.length > 0 && (
                                <>
                                    <Text style={styles.title}>Adicionais:</Text>
                                    {adicionais.map((adicional, index) => (
                                        <Text key={index} style={styles.ingredienteText}>{adicional.nome}</Text>
                                    ))}
                                </>
                            )}
                        </View>
                    )}

                    <View style={styles.buttonBar}>
                        {!isBebida && (
                            <CustomButton
                                style={styles.buttonBackground}
                                textStyle={styles.buttonText}
                                texto="Adicionais"
                                backgroundColor="#FF6347"
                                onPress={handleOpenAdicionaisModal}
                            />
                        )}
                        <CustomButton
                            style={styles.buttonBackground}
                            textStyle={styles.buttonText}
                            texto={isBebida ? 'Definir Quantidade' : 'Adicionar'}
                            backgroundColor="#FF6347"
                            textColor="#fff"
                            borderRadius={5}
                            padding={10}
                            fontSize={16}
                            hoverColor="#ab3838"
                            onPress={() => {
                                addToCart({ ...item, adicionais, preco });
                                onClose();
                            }}
                        />
                    </View>
                </Pressable>
            </View>
        </TouchableWithoutFeedback>
    );
}