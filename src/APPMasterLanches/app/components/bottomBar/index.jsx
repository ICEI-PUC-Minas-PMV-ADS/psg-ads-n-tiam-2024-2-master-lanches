import React, { useState } from 'react';
import { View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import styles from './style';

const ICONS = [
    { name: "home", screen: "Home" },
    { name: "search", screen: "Search" },
];

const CHANGEABLE_ICONS = [
    { name: "shopping-cart", screen: "Cart" },
    { name: "gears", screen: "AdminFunctions" },
];

const BottomBar = () => {
    const navigation = useNavigation();
    const [ADM, setADM] = useState(true);

    const baseIconMap = (icon, index) => (
        <TouchableOpacity
            key={index}
            style={icon.name === "home" ? styles.buttonHome : styles.button}
            onPress={() => navigation.navigate(icon.screen)}
        >
            <Icon name={icon.name} size={24} color="#000" />
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            {ICONS.map((icon, index) => baseIconMap(icon, index))}
            {baseIconMap(CHANGEABLE_ICONS[ADM ? 1 : 0], ICONS.length)}
        </View>
    );
};

export default BottomBar;