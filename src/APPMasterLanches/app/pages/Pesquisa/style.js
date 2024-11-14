import { StyleSheet, Dimensions, Platform } from 'react-native';

const { height } = Dimensions.get('window');

const styles = StyleSheet.create({
  page: {
    flex: 1
  },
  container: {
    flex: 1,
    backgroundColor: '#000000', // Fundo preto
    padding: 8,
    height: '100%',
    width: '100%',
  },
  containerPesquisa: {
    width: '100%', 
    alignItems: 'center',
    marginBottom: 20, // Aumentei o espaçamento inferior para melhor separação
    marginTop: Platform.OS === 'ios' || Platform.OS === 'android' ? 40 : 0, // Adiciona espaço no topo para dispositivos móveis
  },
  barraPesquisa: { 
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#333', // Fundo cinza escuro para a barra de pesquisa
    borderRadius: 20, 
    width: '90%', 
    height: 40, // Aumentei a altura para melhor usabilidade
    paddingHorizontal: 15, // Ajustei o padding horizontal
    shadowColor: '#000', // Adicionei sombra para destacar a barra de pesquisa
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  inputPesquisa: { 
    color: '#fff', // Cor do texto branco
    width: '100%', 
    height: '100%', 
    paddingLeft: 10, 
    borderWidth: 0,
    outline: 'none', // Remove a borda preta ao focar
  },
  itemBox: {
    backgroundColor: '#ffffff', // Fundo branco para os itens
    width: '100%',
    height: Platform.OS === 'ios' || Platform.OS === 'android' ? 130 : 100, // Ajusta a altura para dispositivos móveis
    borderRadius: 20,
    overflow: 'hidden',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15, // Aumentei o espaçamento inferior para melhor separação
    padding: 10, // Adicionei padding para melhor espaçamento interno
    shadowColor: '#000', // Adicionei sombra para destacar os itens
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    gap: 4,
  },
  itemImage: {
    height: '100%', 
    width: '37%', 
    borderRadius: 10, // Adicionei bordas arredondadas à imagem
  },
  itemTitle: {
    fontSize: 19, 
    fontWeight: 'bold',
    color: '#000000', // Cor do texto preto
    marginBottom: 5, // Adicionei margem inferior para separação
  },
  itemPrice: {
    fontSize: 16, // Aumentei o tamanho da fonte
    color: '#cc0000', // Cor do texto vermelho
  },
  modal: {
    flex: 1, 
    position: 'absolute', 
  },
});

export default styles;