import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import styles from './style';

export default function Configuracoes() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSave = () => {
        Alert.alert('Alterações Salvas', 'Suas informações foram atualizadas.');
    };

    return (
        <View style={styles.configContainer}>
            <Text style={styles.configTitle}>Configurações</Text>

            {/* Campo para Nome */}
            <View style={styles.inputGroup}>
                <Icon name="person" size={24} color="#fff" />
                <TextInput
                    style={styles.input}
                    placeholder="Nome"
                    placeholderTextColor="#aaa"
                    value={name}
                    onChangeText={setName}
                />
            </View>

            {/* Campo para Email */}
            <View style={styles.inputGroup}>
                <Icon name="email" size={24} color="#fff" />
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    placeholderTextColor="#aaa"
                    value={email}
                    onChangeText={setEmail}
                />
            </View>

            {/* Campo para Senha */}
            <View style={styles.inputGroup}>
                <Icon name="lock" size={24} color="#fff" />
                <TextInput
                    style={styles.input}
                    placeholder="Senha"
                    placeholderTextColor="#aaa"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                />
            </View>

            {/* Botão Salvar */}
            <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                <Text style={styles.saveButtonText}>Salvar Alterações</Text>
            </TouchableOpacity>
        </View>
    );
}
