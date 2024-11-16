import React, { useState, useEffect } from "react";
import { Text, Pressable, ActivityIndicator } from "react-native";
import styles from "./style";

const CustomButton = ({ 
  onPress, 
  texto, 
  style, 
  textStyle, 
  backgroundColor = "#4CAF50", 
  textColor = "#fff", 
  borderRadius = 5, 
  padding = 10, 
  fontSize = 16, 
  hoverColor = "#8BC34A",
  isLoading = false,
}) => {
  const [textoInterno, setTextoInterno] = useState("Clique aqui");
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);

  useEffect(() => {
    if (texto) setTextoInterno(texto);
  }, [texto]);

  return (
    <Pressable 
      onPress={onPress}
      onHoverIn={() => setIsHovered(true)}
      onHoverOut={() => setIsHovered(false)}
      onPressIn={() => setIsPressed(true)}
      onPressOut={() => setIsPressed(false)}
      style={[
        styles.button, 
        style, 
        { 
          backgroundColor: isPressed || isHovered ? hoverColor : backgroundColor,
          borderRadius, 
          padding,
          transform: isPressed ? [{ scale: 0.95 }] : [{ scale: 1 }],
          minWidth: 90, 
          minHeight: 40, 
        }
      ]}
    >
      {isLoading ? (
        <ActivityIndicator color={textColor} />
      ) : (
        <Text style={[styles.buttonText, textStyle, { color: textColor, fontSize }]}>
          {textoInterno}
        </Text>
      )}
    </Pressable>
  );
};

export default CustomButton;