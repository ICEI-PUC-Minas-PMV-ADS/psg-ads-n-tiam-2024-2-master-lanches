import { StyleSheet } from "react-native";

export const style = StyleSheet.create({
    inputContainer: {
      display: 'flex',
      marginBottom: 15,
      alignItems: 'center',
      flexDirection: 'row',
      backgroundColor: '#FFF',
      borderRadius: 15,
      width: '100%',
      height: 40
    }, 
    input: {
      width: '90%',
      padding: 10,
      height: 40, 
      borderRadius: 15,
      backgroundColor: '#FFF',
      fontSize: 19,
      color: '#000000',
      textAlign: 'left',
      paddingHorizontal: 10,
      borderColor: "none"
    },
    iconButton: {
      textAlign: 'center'
    },
});