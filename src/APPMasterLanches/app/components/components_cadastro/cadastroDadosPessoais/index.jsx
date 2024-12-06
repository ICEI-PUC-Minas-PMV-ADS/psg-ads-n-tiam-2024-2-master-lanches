import React, { useState, useEffect } from 'react';
import { Image, Text, TextInput, TouchableOpacity, View, KeyboardAvoidingView, Animated, Keyboard, SafeAreaView} from "react-native";
import styles from "./style";
import InputComponent from "../../input/form";

export default function CadastroDadosPessoais(){
    return(
        <KeyboardAvoidingView style={styles.container}>
            <View style={styles.boxBottom}>
                <InputComponent
                    placeholder="Nome Completo"
                    keyboardType="default"
                />
                <InputComponent
                    placeholder="CPF"
                    keyboardType="numeric"
                    maskType="cpf"
                />
                <InputComponent
                    placeholder="Telefone"
                    keyboardType="numeric"
                    maskType="phone-cell"
                />
            </View>
        </KeyboardAvoidingView>
    );
};