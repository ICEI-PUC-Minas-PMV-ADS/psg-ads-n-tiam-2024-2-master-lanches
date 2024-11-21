import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
    alignItems: 'center',
    paddingTop: 20,
  },
  scrollContainer: {
    marginTop: 17,
    flexGrow: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingBottom: 80,
  },
  cardContainer: {
    marginVertical: 20,
    width: '95%',
    backgroundColor: '#333',
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  text: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  price: {
    color: '#aaa',
    fontSize: 16,
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#ff6347',
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  sectionTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});

export default styles;