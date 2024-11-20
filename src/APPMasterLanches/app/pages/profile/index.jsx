import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import styles from './style';
import BottomBar from "../../components/bottomBar";

export default function Profile() {
    return (
        <View style={styles.profileContainer}>
            {/* Seção do Avatar do Usuário */}
            <View style={styles.avatarContainer}>
                <View style={styles.avatarCircle}>
                    <Icon name="person" size={60} color="#D8A13B" />
                </View>
            </View>

            {/* Opções do Usuário */}
            <View style={styles.optionsContainer}>
                <TouchableOpacity style={styles.option}>
                    <Icon name="settings" size={24} color="#fff" />
                    <Text style={styles.optionText}>Configurações</Text>
                </TouchableOpacity>
                <View style={styles.divider} />

                <TouchableOpacity style={styles.option}>
                    <Icon name="help-outline" size={24} color="#fff" />
                    <Text style={styles.optionText}>Ajuda</Text>
                </TouchableOpacity>
                <View style={styles.divider} />

                <TouchableOpacity style={styles.option}>
                    <Icon name="location-on" size={24} color="#fff" />
                    <Text style={styles.optionText}>Endereço</Text>
                </TouchableOpacity>
            </View>
            <BottomBar />
        </View>
    );
}
