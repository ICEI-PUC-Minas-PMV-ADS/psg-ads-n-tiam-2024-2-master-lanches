import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    modalBackground: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.7)', // Fundo semi-transparente
    },
    modalContainer: {
        backgroundColor: '#1e1e1e', // Fundo escuro para a modal
        width: '90%',
        padding: 20,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#FFD700', // Dourado
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    title: {
        color: '#FFD700', // Dourado
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 15,
    },
    adicionalItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#333',
        padding: 10,
        marginBottom: 10,
        borderRadius: 8,
    },
    adicionalText: {
        color: '#fff',
        fontSize: 16,
    },
    button: {
        marginTop: 15,
        paddingVertical: 12,
        backgroundColor: '#FFD700',
        borderRadius: 8,
        alignItems: 'center',
    },
    buttonText: {
        color: '#121212',
        fontWeight: 'bold',
        fontSize: 16,
    },
});

export default styles;