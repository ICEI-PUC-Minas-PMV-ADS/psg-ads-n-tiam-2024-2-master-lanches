import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  modalContainer: {
    width: '85%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#444',
  },
  noAdicionais: {
    fontSize: 16,
    color: '#888',
    textAlign: 'center',
    marginTop: 20,
  },
  adicionalItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  adicionalText: {
    fontSize: 16,
    color: '#333',
  },
  checkMark: {
    fontSize: 16,
    color: '#28a745',
  },
  selectedAdicional: {
    backgroundColor: '#e6f7e6',
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent:'space-between',
    marginTop: 20,
  },
  clearButton: {
    backgroundColor: '#FF6347',
    padding: 10,
    borderRadius: 5,
  },
  clearButtonText: {
    color: '#fff',
    fontSize: 16,
  }, 
  confirmButton: {
    backgroundColor: '#ccc',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  activeButton: {
    backgroundColor: '#28a745',
  },
  confirmButtonText: {
    fontSize: 16,
    color: '#fff',
  },
});

export default styles;