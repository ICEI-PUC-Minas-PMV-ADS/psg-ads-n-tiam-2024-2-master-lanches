import { StyleSheet, Platform } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 11,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
  },
  box: {
    backgroundColor: '#1e1e1e',
    width: '80%',
    height: '76%',
    position: 'absolute',
    alignSelf: 'center',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#FFD700',
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    shadowOffset: { width: 0, height: 2 },
  },
  itemTitle: {
    fontSize: 19,
    fontWeight: 'bold',
    color: '#FFD700',
  },
  itemPrice: {
    fontSize: 14,
    color: '#FFD700',
  },
  itemImage: {
    height: '100%',
    width: '28.5%',
    borderRadius: 10,
  },
  header: {
    flexDirection: 'row',
    height: '18%',
    width: '100%',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#FFD700',
  },
  descriptionBox: {
    alignSelf: 'center',
    backgroundColor: '#f9f9f9',
    width: '95%',
    height: '60%',
    borderColor: '#FFD700',
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    marginTop: 10,
  },
  buttonBar: {
    height: '12%',
    width: '95%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'center',
    marginTop: 10,
  },
  buttonBackground: {
    backgroundColor: '#FFD700',
    padding: 10,
    borderRadius: 5,
    flex: 1,
    marginHorizontal: 5,
  },
  buttonText: {
    color: '#121212',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default styles;