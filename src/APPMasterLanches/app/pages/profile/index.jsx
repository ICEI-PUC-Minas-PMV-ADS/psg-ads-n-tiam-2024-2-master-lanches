import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, TextInput, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from '@react-navigation/native'; // Importação para navegação
import styles from './style';
import BottomBar from "../../components/bottomBar";
import { accessUser } from '../../contexts/UserContext';

export default function Profile() {
    const [avatar, setAvatar] = useState(null); // Estado para armazenar o caminho da imagem
    const [userName, setUserName] = useState(''); // Estado para armazenar o nome do usuário
    const [showHelp, setShowHelp] = useState(false); // Estado para exibir/ocultar detalhes de ajuda
    const { usuario } = accessUser();
    const navigation = useNavigation(); // Hook para navegação

    const pickImage = async () => {
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (!permissionResult.granted) {
            Alert.alert("Permissão necessária", "Precisamos de acesso à sua galeria.");
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        if (!result.canceled) {
            setAvatar(result.assets[0].uri);
        }
    };

    return (
        <View style={styles.profileContainer}>
            {/* Seção do Avatar do Usuário */}
            <View style={styles.avatarContainer}>
                <TouchableOpacity style={styles.avatarCircle} onPress={pickImage}>
                    {avatar ? (
                        <Image source={usuario.ImagemPerfil} style={styles.avatarImage} />
                    ) : (
                        <Icon name="person" size={60} color="#D8A13B" />
                    )}
                </TouchableOpacity>
                {/* Campo para o Nome do Usuário */}
                <TextInput
                    style={styles.nameInput}
                    placeholder="Digite seu nome"
                    placeholderTextColor="#aaa"
                    value={userName}
                    onChangeText={setUserName}
                />
            </View>

            {/* Opções do Usuário */}
            <View style={styles.optionsContainer}>
                {/* Navegação para Configurações */}
                <TouchableOpacity
                    style={styles.option}
                    onPress={() => navigation.navigate("Configuracoes")}
                >
                    <Icon name="settings" size={24} color="#fff" />
                    <Text style={styles.optionText}>Configurações</Text>
                </TouchableOpacity>
                <View style={styles.divider} />

                <TouchableOpacity style={styles.option} onPress={() => setShowHelp(!showHelp)}>
                    <Icon name="help-outline" size={24} color="#fff" />
                    <Text style={styles.optionText}>Ajuda</Text>
                </TouchableOpacity>
                {showHelp && (
                    <View style={styles.helpDetails}>
                        <Text style={styles.helpText}>Email: suporte@exemplo.com</Text>
                        <Text style={styles.helpText}>Telefone: (11) 1234-5678</Text>
                    </View>
                )}
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
