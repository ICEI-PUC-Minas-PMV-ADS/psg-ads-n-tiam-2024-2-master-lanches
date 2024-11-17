import React from "react";
import { View, Image, TouchableOpacity } from "react-native";
import styles from "./style";
import DefaultImage from '../../../assets/Default_noLoad.jpg';

function SmallCard({ url, onPress }) {
    const imageSource = url ? { uri: url } : DefaultImage;

    return (
        <TouchableOpacity onPress={onPress} style={styles.container}>
            <Image source={imageSource} style={styles.imagem} />
        </TouchableOpacity>
    );
}

export default React.memo(SmallCard);