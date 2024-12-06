import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 16,
        marginBottom: 50      
    },
    cardContainer: {
        paddingHorizontal: 16,
    },
    card: {
        flexDirection: 'row',
        width: '100%',
        padding: 16,
        backgroundColor: '#fff',
        borderRadius: 15,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 5,
        justifyContent: 'space-between',
    },
    imagem: {
        width: 100,
        height: 100,
        borderRadius: 10,
        marginRight: 16,
    },
    infoContainer: {
        flex: 1,
        justifyContent: 'space-between',
    },
    nome: {
        fontSize: 18,
        fontWeight: '600',
        color: '#333',
    },
    preco: {
        fontSize: 16,
        color: '#444',
    },
});

export default styles;