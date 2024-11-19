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
  disabled = false,
}) => {
  const [textoInterno, setTextoInterno] = useState("Clique aqui");
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);

  useEffect(() => {
    if (texto) setTextoInterno(texto);
  }, [texto]);

  return (
    <Pressable
      onPress={!disabled && !isLoading ? onPress : null}
      onHoverIn={() => setIsHovered(true)}
      onHoverOut={() => setIsHovered(false)}
      onPressIn={() => setIsPressed(true)}
      onPressOut={() => setIsPressed(false)}
      disabled={disabled}
      style={[
        styles.button,
        style,
        {
          backgroundColor: disabled
            ? "#A9A9A9" // Cor para estado desabilitado
            : isPressed || isHovered
            ? hoverColor
            : backgroundColor,
          borderRadius,
          padding,
          transform: isPressed ? [{ scale: 0.95 }] : [{ scale: 1 }],
          opacity: disabled ? 0.7 : 1, // Suavização visual para botões desabilitados
          minWidth: 90,
          minHeight: 40,
        },
      ]}
      accessibilityRole="button"
    >
      {isLoading ? (
        <ActivityIndicator color={textColor} />
      ) : (
        <Text
          style={[
            styles.buttonText,
            textStyle,
            { color: disabled ? "#666" : textColor, fontSize },
          ]}
        >
          {textoInterno}
        </Text>
      )}
    </Pressable>
  );
};

export default CustomButton;