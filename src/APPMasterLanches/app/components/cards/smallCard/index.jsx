import React from "react";
import { View, Image } from "react-native";
import styles from "./style";
import DefaultImage from '../../../assets/Default_noLoad.jpg';

export default function SmallCard({ url, onPress }) {
    const imageSource = url ? { uri: url } : DefaultImage;

    return (
        <View style={styles.container}>
            <Image source={imageSource} style={styles.imagem} />
        </View>
    );
}
