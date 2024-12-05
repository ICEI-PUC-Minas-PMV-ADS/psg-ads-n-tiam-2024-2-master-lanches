import { Dimensions, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#000000",
  },

  boxTop: {
    flex: 1,
    justifyContent: "center",
    alignItems:  'center',
  },

//   TextCadastro: {
// 	  fontFamily: 'Roboto',
//     fontSize: 19,
//     color: '#FFC107',
//     textAlign: 'center',
//     fontWeight: 'bold',
// 	  width: 320,
//   },

  boxBottom: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    marginTop: 10,
    paddingBottom: 50,
  },
  button: {
    justifyContent: 'flex-end',
  },
  btnCadastro: {
    backgroundColor: '#fbdb5b',
    textAlign: 'center',
    width: '100%',
    height: 45,
    marginTop: 5,
    borderRadius: 15,
    padding: 10,
    alignItems: 'center'
  },
  textbtnCadastro: {
    color: 'black',
    fontWeight: 'bold',
  },
//   InputPassword: {
//     flex: 1, // Faz o input ocupar o máximo de espaço disponível
//     fontSize: 18, // Tamanho do texto
//     color: '#000', // Cor do texto
//     paddingVertical: 8, // Espaçamento interno vertical
//   }
});

export default styles;
