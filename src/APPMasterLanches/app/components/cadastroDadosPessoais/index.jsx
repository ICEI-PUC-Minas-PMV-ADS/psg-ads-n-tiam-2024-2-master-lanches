import React, { useState, useEffect } from 'react';
import { Image, Text, TextInput, TouchableOpacity, View, KeyboardAvoidingView, Animated, Keyboard, SafeAreaView} from "react-native";
import styles from "./style";
import InputComponent from "../input/form";
import InputDefault from '../input/inputpadrao';
import { cadastro } from "../../../api/cliente";

export default function CadastroDadosPessoais(){


    return(
        <KeyboardAvoidingView style={styles.container}>
            <View style={styles.boxBottom}>
                <InputComponent
                    placeholder="Nome Completo"
                    keyboardType="default"
                    isPassword = "true"
                />
                <InputComponent
                    placeholder="CPF"
                    keyboardType="numeric"
                    maskType="cpf"
                />
                <InputComponent
                    placeholder="CEP"
                    keyboardType="numeric"
                    maskType="cep"
                />
            </View>
            <View style={styles.button}>
                <TouchableOpacity style={styles.btnCadastro}>
                    <Text style={styles.textbtnCadastro}>Finalizar Cadastro</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    );
};