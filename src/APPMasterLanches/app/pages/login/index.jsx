import React, { useState, useEffect } from 'react';
import { Image, Text, TextInput, TouchableOpacity, View, KeyboardAvoidingView, Animated, Keyboard } from "react-native";
import styles from "./style";
import InputComponent from "../../components/input/form/input";
import Logo from "../../assets/logo.png";
import { login } from "../../../api/cliente";

export default function Login({ navigation }) {
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

  // Animação da IMAGEM

  const [offset] = useState(new Animated.ValueXY({x: 0, y: 95}));
  const [imageLogo] = useState(new Animated.ValueXY({x: 250, y: 300}));

  useEffect(() => {
    KeyboardDidShowListener = Keyboard.addListener('keyboardDidShow', keyboardShow);
    KeyboardDidHideListener = Keyboard.addListener('keyboardDidHide', keyboardHide);
  
    Animated.spring(offset.y, {
      toValue: 0,
      speed: 4,
      bounciness: 20,
      duration: 100,
      useNativeDriver: false
    }).start();
  }, []);
  
  function keyboardShow() {
    Animated.parallel([
      Animated.timing(imageLogo.x, {
        toValue: 220,
        duration: 300,
        useNativeDriver: false 
      }),
      Animated.timing(imageLogo.y, {
        toValue: 200,
        duration: 300,
        useNativeDriver: false
      })
    ]).start();
  }
  
  function keyboardHide() {
    Animated.parallel([
      Animated.timing(imageLogo.x, {
        toValue: 250,
        duration: 200,
        useNativeDriver: false 
      }),
      Animated.timing(imageLogo.y, {
        toValue: 300,
        duration: 200,
        useNativeDriver: false
      })
    ]).start();
  }
  

  return (
    <KeyboardAvoidingView style={styles.container}>
       <View style={styles.boxTop}>
        <Animated.Image 
        style={{
          width: imageLogo.x,
          height: imageLogo.y
        }} 
        source={Logo} 
        resizeMode='contain'
        />
      </View>
      <Animated.View style={[styles.boxBottom,
        {
          transform: [
            {translateY: offset.y } 
          ]
        }
      ]}>        
      <InputComponent
          placeholder="Digite o email"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
          maskType="email"
        />
        <InputComponent
          placeholder="Digite sua senha"
          keyboardType="default"
          isPassword={true}
          value={senha}
          onChangeText={setSenha}
        />
        {error ? (
          <Text style={{ color: "red" }}>{error}</Text>
        ) : null}
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btnCadastro}>
          <Text style={styles.textBtnCadastro}>Criar Conta</Text>
        </TouchableOpacity>

      </Animated.View>
    </KeyboardAvoidingView>
   );
};