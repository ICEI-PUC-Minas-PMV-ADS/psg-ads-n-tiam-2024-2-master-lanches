import React, { useState } from 'react';
import {
    Text,
    View,
    Image,
    TouchableWithoutFeedback,
    Pressable,
    StatusBar,
    ScrollView,
    TouchableOpacity,
} from 'react-native';
import styles from './style';
import ModalAdicionais from '../Adicionais';
import CustomButton from '../../CustomButton';
import { useCart } from '../../../contexts/CartContext';

export default function DetalhesItem({ item, onClose }) {
    const { addToCart } = useCart();
    const [isModalVisible, setModalVisible] = useState(false);
    const [adicionais, setAdicionais] = useState([]);
    const [removedIngredients, setRemovedIngredients] = useState([]);
    const [quantity, setQuantity] = useState(1);

    const essentialIngredients = item.ingredientes?.filter((ing) => ing.essencial);
    const removableIngredients = item.ingredientes?.filter((ing) => !ing.essencial);

    const totalPreco = (item.preco + adicionais.reduce((acc, adicional) => acc + adicional.preco, 0)) * quantity;

    const handleOpenAdicionaisModal = () => setModalVisible(true);
    const handleCloseAdicionaisModal = () => setModalVisible(false);

    const handleAddAdicionais = (selectedAdicionais) => setAdicionais(selectedAdicionais);

    const handleRemoveIngredient = (ingredientName) => {
        setRemovedIngredients((prev) =>
            prev.includes(ingredientName)
                ? prev.filter((name) => name !== ingredientName)
                : [...prev, ingredientName]
        );
    };

    const handleAddToCart = () => {
        addToCart(
            { ...item, preco: item.preco },
            adicionais,
            removedIngredients,
            quantity,
            totalPreco
        );
        onClose();
    };
        

    const incrementQuantity = () => setQuantity((prev) => prev + 1);
    const decrementQuantity = () => setQuantity((prev) => (prev > 1 ? prev - 1 : prev));

    return (
        <TouchableWithoutFeedback onPress={onClose}>
            <View style={styles.container}>
                <StatusBar barStyle="default" />
                <ModalAdicionais
                    isVisible={isModalVisible}
                    onClose={handleCloseAdicionaisModal}
                    onAddAdicionais={handleAddAdicionais}
                    adicionaisDisponiveis={item.adicionaisPossiveis || []}
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

                    <ScrollView style={styles.descriptionBox}>
                        <Text style={styles.title}>Ingredientes:</Text>
                        {essentialIngredients?.map((ing) => (
                            <Text key={ing.id} style={[styles.ingredientText, styles.essentialIngredient]}>
                                {ing.nome} (Essencial)
                            </Text>
                        ))}
                        {removableIngredients?.map((ing) => (
                            <TouchableOpacity
                                key={ing.id}
                                onPress={() => handleRemoveIngredient(ing.nome)}
                                style={styles.removableIngredientWrapper}
                            >
                                <Text
                                    style={[
                                        styles.ingredientText,
                                        removedIngredients.includes(ing.nome) && styles.removedIngredient,
                                    ]}
                                >
                                    {removedIngredients.includes(ing.nome) ? `Não adicionar: ${ing.nome}` : ing.nome}
                                </Text>
                            </TouchableOpacity>
                        ))}

                        {adicionais.length > 0 && (
                            <>
                                <Text style={styles.title}>Adicionais:</Text>
                                {adicionais.map((adicional) => (
                                    <Text key={adicional.id} style={styles.additionalText}>
                                        {adicional.nome} - R$ {adicional.preco.toFixed(2)}
                                    </Text>
                                ))}
                            </>
                        )}

                        <CustomButton
                            style={styles.buttonBackground}
                            textStyle={styles.buttonText}
                            texto="Adicionais"
                            backgroundColor="#FF6347"
                            hoverColor="#ab3838"
                            onPress={handleOpenAdicionaisModal}
                        />
                    </ScrollView>

                    <View style={styles.buttonBar}>
                        <View style={styles.quantityControl}>
                            <TouchableOpacity onPress={decrementQuantity} style={styles.quantityButton}>
                                <Text style={styles.quantityButtonText}>-</Text>
                            </TouchableOpacity>
                            <Text style={styles.quantityText}>{quantity}</Text>
                            <TouchableOpacity onPress={incrementQuantity} style={styles.quantityButton}>
                                <Text style={styles.quantityButtonText}>+</Text>
                            </TouchableOpacity>
                        </View>
                        <CustomButton
                            style={styles.buttonBackground}
                            textStyle={styles.buttonText}
                            texto="Adicionar"
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