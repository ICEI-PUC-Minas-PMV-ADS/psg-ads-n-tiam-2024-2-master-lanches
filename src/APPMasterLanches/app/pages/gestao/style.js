import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000000',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    marginTop: 50,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    backgroundColor: '#000000',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  list: {
    alignItems: 'center',
  },
  cardContainer: {
    flex: 1,
    margin: 10,
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 5,
  },
  price: {
    fontSize: 14,
    color: '#888',
    textAlign: 'center',
    marginBottom: 10,
  },
  status: {
    fontSize: 14,
    color: '#555',
    textAlign: 'center',
    marginBottom: 5,
  },
  horario: {
    fontSize: 12,
    color: '#777',
    textAlign: 'center',
    marginBottom: 5,
  },
  ingredients: {
    fontSize: 12,
    color: '#555',
    textAlign: 'center',
    marginBottom: 5,
  },
  quantity: {
    fontSize: 12,
    color: '#555',
    textAlign: 'center',
    marginBottom: 5,
  },
  finalizado: {
    fontSize: 12,
    color: '#555',
    textAlign: 'center',
  },
});

export default styles;
