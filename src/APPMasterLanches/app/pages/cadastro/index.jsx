import React, { useState, useEffect } from 'react';
import { Image, Text, TextInput, TouchableOpacity, View, KeyboardAvoidingView, Animated, Keyboard, } from "react-native";
import styles from "./style";
import CustomAccordion from '../../components/CustomAccordion';
import CadastroEndereco from '../../components/cadastroEndereco';
import CadastroDadosPessoais from '../../components/cadastroDadosPessoais';
import CadastroEmail from '../../components/cadastroEmail';
import { accessUser } from '../../contexts/UserContext';

export default function Cadastro({ navigation }) {
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [error, setError] = useState("");
    const { Cadastro } = accessUser ();

    const sections = [
      {
        title: "Informações de Endereço",
        content: <CadastroEndereco />,
        loaded: true,
      },
      {
        title: "Dados Pessoais",
        content: <CadastroDadosPessoais />,
        loaded: true,
      },
      {
        title: 'E-mail',
        content: <CadastroEmail />,
        loaded: true,
      }
    ];

 return (
    <KeyboardAvoidingView style={styles.container}>
          <CustomAccordion sections={sections}/>
          <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText} onPress={ () => Cadastro()}>Finalizar Cadastro</Text>
          </TouchableOpacity>
      </KeyboardAvoidingView>
 )    
}
