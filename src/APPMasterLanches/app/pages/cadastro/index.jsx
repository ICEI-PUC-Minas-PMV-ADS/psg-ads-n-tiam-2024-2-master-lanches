import React, { useState, useEffect } from 'react';
import { Image, Text, TextInput, TouchableOpacity, View, KeyboardAvoidingView, Animated, Keyboard, } from "react-native";
import styles from "./style";
import CustomAccordion from '../../components/CustomAccordion';
import CadastroEndereco from '../../components/cadastroEndereco';
import { cadastro } from "../../../api/cliente";

export default function Cadastro({ navigation }) {
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [error, setError] = useState("");
    const sections = [
      {
        title: "Informações de Endereço",
        content: <CadastroEndereco />,
        loaded: true,
      },
    ];

    const handleLogin = async () => {
        setError("");
        if (!email || !senha) {
          setError("Por favor, preencha todos os campos.");
          return;
        }
        try {
          const data = await login(email, senha);
          console.log("Login bem-sucedido:", data);
          navigation.navigate("Home");
        } catch (err) {
          console.error("Erro no login:", err); // Melhorar a depuração
          setError("Falha no login. Verifique suas credenciais.");
        }
      };

 return (
    <KeyboardAvoidingView style={styles.container}>
          <CustomAccordion sections={sections}/>
    </KeyboardAvoidingView>
 )    
}
