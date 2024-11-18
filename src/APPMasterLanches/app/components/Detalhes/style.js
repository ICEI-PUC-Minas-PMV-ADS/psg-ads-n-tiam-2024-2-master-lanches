import { StyleSheet, Platform } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 11,
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Fundo semi-transparente
  },
  box: {
    backgroundColor: '#fff', // Fundo branco para a caixa principal
    width: '80%',
    height: '76%',
    position: 'absolute',
    alignSelf: 'center',
    borderRadius: 10,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    shadowOffset: { width: 0, height: 2 },
  },
  itemTitle: { 
    fontSize: 19, 
    fontWeight: 'bold',
    color: '#333', // Cor do texto
  },
  itemPrice: {
    fontSize: 14,
    color: '#666', // Cor do texto
  },
  itemImage: {
    height: '100%', 
    width: '28.5%',
    borderRadius: 10, // Adiciona bordas arredondadas à imagem
  },
  header: {
    flexDirection: 'row',
    height: '18%',
    width: '100%',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd', // Linha de separação
  },
  descriptionBox: {
    alignSelf: 'center',
    backgroundColor: '#f9f9f9', // Fundo claro para a descrição
    width: '95%',
    height: '60%', // Ajuste a altura para evitar cortes
    borderColor: '#ddd',
    borderStyle: 'solid',
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
    backgroundColor: '#FF6347', // Cor do botão (tom de vermelho tomate)
    padding: 10,
    borderRadius: 5,
    flex: 1, // Permite que o botão ocupe o espaço disponível
    marginHorizontal: 5, // Espaçamento entre os botões
  },
  buttonText: {
    color: '#fff', // Cor do texto do botão
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default styles;