import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import styles from './style';

const ICONS = [
    { name: "home", screen: "Home" },
    { name: "search", screen: "Search" },
    { name: "shopping-cart", screen: "Cart" }
];

const BottomBar = () => {
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            {ICONS.map((icon, index) => (
                <TouchableOpacity
                    key={index}
                    style={icon.name === "home" ? styles.buttonHome : styles.button}
                    onPress={() => navigation.navigate(icon.screen)}
                >
                    <Icon name={icon.name} size={24} color="#000" />
                </TouchableOpacity>
            ))}
        </View>
    );
};

export default BottomBar;