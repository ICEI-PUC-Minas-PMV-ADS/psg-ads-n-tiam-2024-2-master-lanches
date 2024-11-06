import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    card: {
        width: 300,
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
        width: '100%',
        height: 150,
        borderRadius: 15,
        marginBottom: 8,
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
});

export default styles;
