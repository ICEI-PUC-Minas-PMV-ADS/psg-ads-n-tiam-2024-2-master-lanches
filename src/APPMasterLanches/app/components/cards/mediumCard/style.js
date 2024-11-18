import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    loadingText: {
        fontSize: 18,
        color: '#555',
        textAlign: 'center',
        marginVertical: 20,
    },
    cardContainer: {
        marginVertical: 16, // Ajuste para um espaço mais uniforme
    },
    card: {
        width: '100%', // Usar largura total da tela
        flexDirection: 'row', // Torna o card horizontal
        padding: 16,
        backgroundColor: '#fff',
        borderRadius: 15,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 5,
        marginBottom: 16, // Espaçamento entre os cards
        justifyContent: 'space-between', // Espaço adequado entre imagem e informações
    },
    imagem: {
        width: 100, // Ajuste mais harmônico para a imagem
        height: 100,
        borderRadius: 10,
        marginRight: 16, // Espaço entre a imagem e as informações
    },
    infoContainer: {
        flex: 1, // Preenche o restante do espaço disponível
        justifyContent: 'space-between', // Organiza os itens dentro da área
    },
    nome: {
        fontSize: 18,
        fontWeight: '600', // Peso moderado para o nome
        color: '#333',
        marginBottom: 6, // Ajuste no espaçamento
    },
    preco: {
        fontSize: 16,
        color: '#444',
        marginBottom: 8,
    },
    status: {
        fontSize: 14,
        color: '#4CAF50',
        marginBottom: 12,
        fontWeight: 'bold', // Destaque para o status
    },
    addButton: {
        backgroundColor: '#4CAF50',
        borderRadius: 20,
        paddingVertical: 10,
        paddingHorizontal: 20,
        alignSelf: 'flex-start',
        marginTop: 10,
    },
    addButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default styles;
