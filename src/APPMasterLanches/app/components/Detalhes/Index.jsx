import React from 'react';
import { Text, View, Image, TouchableWithoutFeedback, Pressable, StatusBar } from 'react-native';
import styles from './style';
import CustomButton from '../CustomButton/index';
import { useCart } from '../../contexts/CartContext';

export default function DetalhesItem({ item, onClose }) {
    const { addToCart } = useCart();
    const isBebida = item.tipo === 'bebida';

    return (
        <TouchableWithoutFeedback onPress={onClose}>
            <View style={styles.container}>
                <StatusBar barStyle="default" />
                <Pressable style={styles.box} onPress={(e) => e.stopPropagation()}>
                    <View style={styles.header}>
                        <Image 
                            source={{ uri: item.imagemUrl || DefaultImage }} 
                            style={styles.itemImage} 
                            resizeMode='contain' 
                        />
                        <View>
                            <Text style={styles.itemTitle}>{item.nome}</Text>
                            <Text style={styles.itemPrice}>{`R$ ${item.preco.toFixed(2)}`}</Text>
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
                            <Text>Ingredientes:</Text>
                            {item.ingredientes.length ? (
                                item.ingredientes.map((ingrediente, index) => (
                                    <Text key={index}>{ingrediente.nome}</Text>
                                ))
                            ) : (
                                <Text>Sem ingredientes adicionais</Text>
                            )}
                        </View>
                    )}

                    <View style={styles.buttonBar}>
                        {!isBebida && (
                            <CustomButton 
                                style={styles.buttonBackground} 
                                textStyle={styles.buttonText} 
                                texto='Adicionais' 
                                backgroundColor='#FF6347' 
                                textColor='#fff' 
                                borderRadius={5} 
                                padding={10} 
                                fontSize={16} 
                                hoverColor='#ab3838'
                            />
                        )}
                        <CustomButton 
                            style={styles.buttonBackground} 
                            textStyle={styles.buttonText} 
                            texto={isBebida ? 'Definir Quantidade' : 'Adicionar'} 
                            backgroundColor='#FF6347' 
                            textColor='#fff' 
                            borderRadius={5} 
                            padding={10} 
                            fontSize={16} 
                            hoverColor='#ab3838'
                            onPress={() => addToCart(item)}
                        />
                    </View>
                </Pressable>
            </View>
        </TouchableWithoutFeedback>
    );
}