import React, { useState } from "react";
import { Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import styles from "./style"; // Corrigido para importar o styles corretamente
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

  return (
    <View style={styles.container}>
      <View style={styles.boxTop}>
        <Image style={styles.imageLogo} source={Logo} resizeMode="contain" />
        <View style={styles.title}>
          <Text style={styles.titleTextLeft}>LOGIN</Text>
          <Text style={styles.titleTextRight}>Create new account</Text>
        </View>
      </View>
      <View style={styles.boxBottom}>
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
      </View>
    </View>
  );
}
