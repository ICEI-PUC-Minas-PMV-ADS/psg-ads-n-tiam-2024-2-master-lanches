import React, { useState, useEffect } from 'react';
import { Image, Text, TextInput, TouchableOpacity, View, KeyboardAvoidingView, Animated, Keyboard, } from "react-native";
import styles from "./style";
import InputComponent from "../../components/input/form";
import InputDefault from '../../components/input/inputpadrao';
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
          <View style={styles.boxTop}>
            <Text style={styles.TextCadastro}>
              Preencha as informações abaixo para criar sua conta.
            </Text>
          </View>
        <Animated.View style={styles.boxBottom}>
            <InputDefault
              placeholder="Digite seu nome"
              keyboardType="default"
            //   value={email}
            //   onChangeText={setEmail}
              maskType="name"
            />
            <InputComponent
              placeholder="Digite seu CPF"
              keyboardType="numeric"
              maskType="cpf"
            />
            <InputComponent
              placeholder="Digite seu e-mail"
              keyboardType="email-address"
              maskType="e-mail"
            />
            <InputComponent
              placeholder="Digite sua senha"
              keyboardType=""
              isPassword={true}
            />
            <InputDefault
              placeholder="Digite seu telefone"
              keyboardType="phone-pad"
              maskType="phone-cell"
            />
            <TouchableOpacity style={styles.buttonCadastro} onPress={handleLogin}>
              <Text style={styles.buttonText}>Confirmar Cadastro</Text>
            </TouchableOpacity>
        </Animated.View>
    </KeyboardAvoidingView>
 )    
}