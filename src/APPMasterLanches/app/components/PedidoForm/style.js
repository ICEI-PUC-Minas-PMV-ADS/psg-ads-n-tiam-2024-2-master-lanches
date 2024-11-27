import { StyleSheet, Platform } from 'react-native';

const styles = StyleSheet.create({
    container: {
        width: '90%',
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowRadius: 10,
        elevation: 5,
        marginTop: 20,
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 15,
        color: '#333',
    },
    input: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 15,
        paddingHorizontal: 10,
        fontSize: 16,
    },
    select: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 15,
        paddingHorizontal: 10,
        fontSize: 16,
    },
    button: {
        backgroundColor: '#4CAF50',
        paddingVertical: 12,
        borderRadius: 5,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 18,
    },
});

export default styles;
