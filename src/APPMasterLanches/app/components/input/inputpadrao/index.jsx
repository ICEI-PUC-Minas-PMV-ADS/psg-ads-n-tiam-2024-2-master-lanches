import React, { useState } from "react";
import { TextInput, View, TouchableOpacity } from "react-native";
import { style } from "./style";
import Icon from "react-native-vector-icons/MaterialIcons";

export default function InputDefault({
        keyboardType = "default",
        placeholder,
        isPassword = false,
        maskType,
        ...props
    }){
    
    const [value, setValue] = useState("");

    const applyMask = (text) => {

        switch (maskType) {
                case "cep":
                    return text.replace(/^(\d{5})(\d{3})$/, "$1-$2");
                case "phone":
                    return text.replace(/\D/g, "").replace(/(\d{2})(\d{4})(\d{4})/, "($1) $2-$3");
                case "phone-cell":
                    return text.replace(/\D/g, "").replace(/(\d{2})(\d{1})(\d{4})(\d{4})/, "($1) $2 $3-$4");
                case "cpf":
                    return text.replace(/\D/g, "").replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
                case "currency":
                    return "R$ " + parseFloat(text.replace(/\D/g, "")).toFixed(2);
                default:
                    return text;
                }
        };

        const handleChange = (text) => {
            const maskedText = applyMask(text);
            setValue(maskedText);
        };


return (
    <View style={style.inputContainer}>
        <TextInput
            placeholder={placeholder}
            style={style.input}
            keyboardType={keyboardType}
            value={value}
            onChangeText={handleChange}
            {...props}
        />  
    </View>
    );
}