import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import styles from './style';
import { accessUser } from '../../contexts/UserContext';

const ICON_MAP = {
    PaginaInicial: { name: "home", screen: "Principal" },
    PaginaPesquisa: { name: "search", screen: "Pesquisa" },
    Carrinho: { name: "shopping-cart", screen: "Carrinho" },
    "Funções Administração": { name: "gears", screen: "Funções Administração" },
};

const BottomBar = () => {
    const { accessibleScreens } = accessUser();
    const [icons, setIcons] = useState([]);
    const navigation = useNavigation();

    useEffect(() => {
        if (accessibleScreens) {
            const screens = accessibleScreens.map(screen => ICON_MAP[screen.name]).filter(Boolean);
            const adjustedScreens = screens.filter(screen => screen).map(icon =>
                icon.name === "shopping-cart" && accessibleScreens.some(s => s.name === "Funções Administração")
                    ? ICON_MAP["Funções Administração"]
                    : icon
            ); // Remove nulos ou indefinidos
            setIcons(adjustedScreens.slice(0, 3));
        }
    }, [accessibleScreens]);

    // Garante que a home sempre vai estar no meio
    const sortedIcons = icons.sort((a, b) => {
        if (a.name === "home") return -1;
        if (b.name === "home") return 1;
        return 0;
    });

    return (
        <View style={styles.container}>
            {sortedIcons.map((icon, index) => (
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