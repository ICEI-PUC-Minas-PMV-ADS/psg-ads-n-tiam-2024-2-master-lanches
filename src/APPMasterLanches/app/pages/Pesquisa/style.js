import { StyleSheet, Dimensions, Platform } from 'react-native';

const { height } = Dimensions.get('window');

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: '#000000',
  },
  container: {
    flex: 1,
    padding: 16,
    height: '100%',
    width: '100%',
  },
  containerPesquisa: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 20,
    //marginTop: Platform.OS === 'ios' || Platform.OS === 'android' ? 40 : 0,
  },
  barraPesquisa: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1e1e1e',
    borderRadius: 20,
    width: '90%',
    height: 40,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: '#FFD700',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 3,
  },
  inputPesquisa: {
    color: '#fff',
    width: '100%',
    height: '100%',
    paddingLeft: 10,
    outline: 'none',
  },
  itemBox: {
    backgroundColor: '#1e1e1e',
    width: '100%',
    height: Platform.OS === 'ios' || Platform.OS === 'android' ? 130 : 100,
    borderRadius: 10,
    overflow: 'hidden',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    padding: 10,
    borderWidth: 1,
    borderColor: '#FFD700',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 3,
  },
  itemImage: {
    height: '100%',
    width: '37%',
    borderRadius: 10,
  },
  itemTitle: {
    fontSize: 19,
    fontWeight: 'bold',
    color: '#FFD700',
    marginBottom: 5,
  },
  itemPrice: {
    fontSize: 16,
    color: '#FFD700',
  },
  modal: {
    flex: 1,
    position: 'absolute',
  },
  lista: {
    marginBottom:'15%',
  },
});

export default styles;