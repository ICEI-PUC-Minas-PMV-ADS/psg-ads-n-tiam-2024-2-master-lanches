import React, { useState } from 'react';
import { View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import styles from './style';
import { accessUser } from '../../contexts/UserContext';

const ICONS = [
    { name: "home", screen: "Home" },
    { name: "search", screen: "Search" },
];

const CHANGEABLE_ICONS = [
    { name: "shopping-cart", screen: "Cart" },
    { name: "gears", screen: "AdminFunctions" },
];

const BottomBar = () => {
    const {ADM}  = accessUser()
    const navigation = useNavigation();

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
            </View>
        </View>
    );
}
