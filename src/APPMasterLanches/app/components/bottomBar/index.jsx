import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import styles from './style';

const BottomBar = () => {
    const navigation = useNavigation();

    const navigateTo = (screen) => () => navigation.navigate(screen);

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.buttonHome} onPress={navigateTo('Home')}>
                <Icon name="home" size={24} color="#000" />
            </TouchableOpacity>
            <View style={styles.navbar}>
                <TouchableOpacity style={styles.button} onPress={navigateTo('Search')}>
                    <Icon name="search" size={24} color="#000" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={navigateTo('Cart')}>
                    <Icon name="shopping-cart" size={24} color="#000" />
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default BottomBar;
