import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    card: {
        width: 300,
        flexDirection: 'row', // Torna o card horizontal
        padding: 16,
        backgroundColor: 'white',
        borderRadius: 20,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    imagem: {
        width: 100, // Ajuste o tamanho da imagem
        height: 100,
        borderRadius: 15,
        marginRight: 16, // Espaço entre a imagem e o texto
    },
    infoContainer: {
        flex: 1, // Faz o conteúdo ocupar o restante do espaço
        justifyContent: 'space-between', // Espaçamento entre os elementos
    },
    nome: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 4,
    },
    preco: {
        fontSize: 16,
        color: '#666',
        marginBottom: 8,
    },
    status: {
        fontSize: 16,
        color: '#4CAF50',
        marginBottom: 8,
    },
    tituloIngredientes: {
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 8,
    },
    ingrediente: {
        fontSize: 14,
        color: '#555',
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
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
    },
});

export default styles;
