import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#fbdb5b',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    transition: 'background-color 0.3s, transform 0.1s', 
    paddingHorizontal: 20, // Adiciona padding horizontal
    paddingVertical: 10, // Adiciona padding vertical
  },
  buttonText: {
    color: 'black',
    fontSize: 16,
  },
});

export default styles;