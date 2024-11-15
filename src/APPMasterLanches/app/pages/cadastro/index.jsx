import React, { useState, useEffect } from 'react';
import { Image, Text, TextInput, TouchableOpacity, View, KeyboardAvoidingView, Animated, Keyboard } from "react-native";
import styles from "./style";
import InputComponent from "../../components/input/form";
import InputDefault from '../../components/input/inputpadrao';
import Logo from "../../assets/logo.png";
import { cadastro } from "../../../api/cliente";

export default function Cadastro({ navigation }) {
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [error, setError] = useState("");

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
        <Animated.View style={styles.boxBottom}>
            <InputDefault
              placeholder="Digite o email"
              keyboardType="email-address"
            //   value={email}
            //   onChangeText={setEmail}
              maskType="email"
            />
            <InputDefault
              placeholder="Digite sua senha"
              keyboardType="default"
              isPassword={true}
            //   value={senha}
            //   onChangeText={setSenha}
            />
            <InputComponent
              placeholder="Digite sua senha"
              keyboardType="default"
              isPassword={true}
            //   value={senha}
            //   onChangeText={setSenha}
            />
            <InputDefault
              placeholder="Digite sua senha"
              keyboardType="default"
              isPassword={true}
            //   value={senha}
            //   onChangeText={setSenha}
            />
            {/* {error ? (
              <Text style={{ color: "red" }}>{error}</Text>
            ) : null} */}
        </Animated.View>
    </KeyboardAvoidingView>
 )    
}