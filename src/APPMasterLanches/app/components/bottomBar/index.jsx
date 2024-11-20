import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import styles from './style';

export default function BottomBar() {
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.buttonHome} onPress={() => navigation.navigate('Home')}>
                <Icon name="home" size={24} color="#000" />
            </TouchableOpacity>
            <View style={styles.navbar}>
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Search')}>
                    <Icon name="search" size={24} color="#000" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Cart')}>
                    <Icon name="shopping-cart" size={24} color="#000" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Profile')}>
                    <Icon name="user" size={24} color="#000" />
                </TouchableOpacity>
            </View>
        </View>
    );
}