import React from 'react';
import { Text, View, Image, TouchableWithoutFeedback, Pressable, StatusBar, Platform } from 'react-native';
import styles from './style';
import CustomButton from '../CustomButton/index';

export default function DetalhesItem({ item, onClose }) {
  return (
    <TouchableWithoutFeedback onPress={onClose}>
      <View style={styles.container}>
        <StatusBar barStyle="default" />
        <Pressable style={styles.box} onPress={(e) => e.stopPropagation()}>
          <View style={styles.header}>
            <Image source={item.image} style={styles.itemImage} resizeMode='contain' />
            <View>
              <Text style={styles.itemTitle}>{item.title}</Text>
              <Text style={styles.itemPrice}>{item.price}</Text>
            </View>
          </View>
          <View style={styles.descriptionBox}>
            <Text>{item.ingredientes}</Text>
          </View>
          <View style={styles.buttonBar}>
            <CustomButton 
              style={styles.buttonBackground} 
              textStyle={styles.buttonText} 
              texto='Adicionais' 
              backgroundColor='#FF6347' 
              textColor='#fff' 
              borderRadius={5} 
              padding={10} 
              fontSize={16} 
              hoverColor='#ab3838'
            />
            <CustomButton 
              style={styles.buttonBackground} 
              textStyle={styles.buttonText} 
              texto='Adicionar' 
              backgroundColor='#FF6347' 
              textColor='#fff' 
              borderRadius={5} 
              padding={10} 
              fontSize={16} 
              hoverColor='#ab3838'
            />
          </View>
        </Pressable>
      </View>
    </TouchableWithoutFeedback>
  );
}