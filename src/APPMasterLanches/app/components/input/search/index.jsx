import React, { useState } from "react";
import { TextInput, View, TouchableOpacity } from "react-native";
import styles  from "./style";

export default function InputComponent() {
    return (
        <View style={styles.inputContainer}>
            <TextInput 
                style={styles.input}
                placeholder="Pesquisar produtos..."
                placeholderTextColor="#888"
            />
        </View>
    );
}
