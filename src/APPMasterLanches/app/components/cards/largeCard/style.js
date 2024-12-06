import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    card: {
        width: '100%',
        padding: 16,
        backgroundColor: '#fff',
        borderRadius: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 6,
        elevation: 6,
        alignItems: 'center',
        marginVertical: 16,
    },
    imagem: {
        width: '90%',
        height: 180,
        borderRadius: 15,
        marginBottom: 12,
    },
    nome: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
    },
    preco: {
        fontSize: 18,
        color: '#555',
        marginTop: 8,
    },
    loadingContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 200,
    },
    loadingText: {
        marginTop: 8,
        color: '#555',
        fontSize: 16,
    },
    errorText: {
        fontSize: 16,
        color: 'red',
        textAlign: 'center',
        marginTop: 20,
    },
});

export default styles;
