import React from "react";
import { Text, TouchableOpacity } from "react-native";
import { styles } from "./style"; // Certifique-se de que o caminho está correto

export default function Button({ title }) {
    return (
        <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>{title}</Text>
        </TouchableOpacity>
    );
}
