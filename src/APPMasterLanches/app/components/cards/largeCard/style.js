import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    card: {
        width: 320,
        padding: 18,
        backgroundColor: '#FFFFFF',
        borderRadius: 20,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 6,
        elevation: 6,
        marginBottom: 20,
    },
    imagem: {
        width: '100%',
        height: 180,
        borderRadius: 15,
        marginBottom: 10,
    },
    nome: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 5,
    },
    preco: {
        fontSize: 18,
        color: '#555',
        marginBottom: 12,
    },
    status: {
        fontSize: 16,
        color: '#4CAF50',
        marginBottom: 12,
        fontWeight: 'bold',
    },
    tituloIngredientes: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 12,
        color: '#333',
    },
    ingrediente: {
        fontSize: 15,
        color: '#555',
        marginVertical: 4,
    },
    semIngredientes: {
        fontSize: 15,
        color: '#999',
        marginVertical: 4,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    errorText: {
        fontSize: 16,
        color: 'red',
        textAlign: 'center',
        marginTop: 20,
    },
});

export default styles;
