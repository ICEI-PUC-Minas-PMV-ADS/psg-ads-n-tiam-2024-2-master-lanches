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
  },

  textCadastro: {
	  fontFamily: 'Roboto',
    fontSize: 21,
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
	  width: 320,
  },

  boxBottom: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: "90%",
    paddingBottom: 50,
  },

  buttonCadastro: {
    backgroundColor: "#fbdb5b",
    textAlign: "center",
    width: "90%",
    height: 45,
    marginTop: 15,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  },

  buttonText: {
    color: "black",
    fontWeight: "bold",
  },

  button: {
    backgroundColor: '#fbdb5b',
    textAlign: 'center',
    width: '65%',
    height: 45,
    marginTop: 15,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center'
  },

  buttonText: {
    color: 'black',
    fontWeight: 'bold',
  },
});

export default styles;
