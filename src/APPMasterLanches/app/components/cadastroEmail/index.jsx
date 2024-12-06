import React, { useState, useEffect } from 'react';
import { Image, Text, TextInput, TouchableOpacity, View, KeyboardAvoidingView, Animated, Keyboard, SafeAreaView} from "react-native";
import styles from "./style";
import InputComponent from "../input/form";

export default function CadastroEmail(){

    return(
        <KeyboardAvoidingView style={styles.container}>
            <View style={styles.boxBottom}>
                <InputComponent
                    placeholder="E-mail"
                    keyboardType="default"
                    maskType= 'e-mail'
                />
                <InputComponent
                    placeholder="Senha"
                    keyboardType="default"
                    isPassword= {true}
                />
            </View>
        </KeyboardAvoidingView>
    );
};
