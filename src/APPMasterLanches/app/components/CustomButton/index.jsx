import React, { useState, useEffect } from 'react';
import { Text, Pressable } from 'react-native';
import styles from './style';

const CustomButton = ({ 
  onPress, 
  texto, 
  style, 
  textStyle, 
  backgroundColor, 
  textColor, 
  borderRadius, 
  padding, 
  fontSize,
  hoverColor = 'yellow'
}) => {
  const [textoInterno, setTextoInterno] = useState('clique aqui');
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);

  useEffect(() => {
    if (texto) {
      setTextoInterno(texto);
    }
  }, [texto]);

  return (
    <Pressable 
      onPress={onPress}
      onHoverIn={() => setIsHovered(true)}
      onHoverOut={() => setIsHovered(false)}
      onPressIn={() => setIsPressed(true)}
      onPressOut={() => setIsPressed(false)}
      style={({ pressed }) => [
        styles.button, 
        style, 
        { 
          backgroundColor: isHovered ? hoverColor : backgroundColor, 
          backgroundColor: pressed ? hoverColor : backgroundColor,
          borderRadius, 
          padding,
          transform: pressed ? [{ scale: 0.95 }] : [{ scale: 1 }],
          minWidth: 90, // Define uma largura mínima
          minHeight: 40, // Define uma altura mínima
        }
      ]}
    >
      <Text 
        style={[
          styles.buttonText, 
          textStyle, 
          { color: textColor, fontSize }
        ]}
      >
        {textoInterno}
      </Text>
    </Pressable>
  );
};

export default CustomButton;