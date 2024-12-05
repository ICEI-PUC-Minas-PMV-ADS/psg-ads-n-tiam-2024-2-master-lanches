import React, { useState, useEffect } from 'react';
import { Image, Text, TextInput, TouchableOpacity, View, KeyboardAvoidingView, Animated, Keyboard, SafeAreaView} from "react-native";
import styles from "./style";
import InputComponent from "../input/form";
import InputDefault from '../input/inputpadrao';
import { cadastro } from "../../../api/usuario";

export default function CadastroEndereco(){


    return(
        <KeyboardAvoidingView style={styles.container}>
            <View style={styles.boxBottom}>
                <InputComponent
                    placeholder="CEP"
                    keyboardType="numeric"
                    maskType="cep"
                />
                <InputDefault
                    placeholder="Rua"
                    keyboardType="default"
                />
                <InputDefault
                    placeholder="Bairro"
                    keyboardType="default"
                />
                <InputDefault
                    placeholder="Cidade"
                    keyboardType="default"
                />
                <InputDefault
                    placeholder="Numero"
                    keyboardType="numeric"
                />
                <InputDefault
                    placeholder="Complemento"
                    keyboardType="default"
                />
            </View>
        </KeyboardAvoidingView>
    );
};
