import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        width: '100%',
        flex: 1,
        backgroundColor: '#1a1a1a',
        padding: 20,
    },
    cartItem: {
        backgroundColor: '#333',
        padding: 15,
        marginBottom: 10,
        borderRadius: 10,
    },
    cartItemText: {
        color: '#fff',
        fontSize: 16,
    },
    removeText: {
        color: '#FF6347',
        fontSize: 14,
        marginTop: 5,
    },
    cartList: {
        paddingBottom: 80,
    },
    emptyCart: {
        color: '#fff',
        fontSize: 18,
        textAlign: 'center',
    },
});

export default styles;
