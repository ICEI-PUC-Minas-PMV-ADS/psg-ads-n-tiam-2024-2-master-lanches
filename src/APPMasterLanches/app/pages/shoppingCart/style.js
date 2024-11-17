import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#121212',
        paddingTop: 40,
        paddingHorizontal: 16,
        paddingBottom: 80,
    },
    cartItem: {
        backgroundColor: '#1e1e1e',
        padding: 15,
        marginBottom: 10,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#FFD700',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    cartItemText: {
        color: '#fff',
        fontSize: 16,
        lineHeight: 22,
    },
    removeText: {
        color: '#fff',
        fontSize: 14,
        fontWeight: '600',
    },
    actionText: {
        color: '#FFD700',
        fontSize: 18,
        fontWeight: 'bold',
        marginHorizontal: 10,
    },
    cartActions: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
        justifyContent: 'space-between',
    },
    cartList: {
        paddingBottom: 120,
    },
    emptyCart: {
        color: '#888',
        fontSize: 18,
        textAlign: 'center',
        marginTop: 20,
    },
    cartFooter: {
        padding: 16,
        backgroundColor: '#1e1e1e',
        borderTopWidth: 1,
        borderTopColor: '#FFD700',
        alignItems: 'center',
    },
    totalText: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 15,
        color: '#FFD700',
    },
    checkoutButton: {
        backgroundColor: '#FFD700',
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 8,
        width: '80%',
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3.84,
        elevation: 5,
    },
    checkoutText: {
        color: '#121212',
        fontWeight: 'bold',
        fontSize: 16,
        textAlign: 'center',
    },
    actionButton: {
        marginHorizontal: 8,
        backgroundColor: '#FFD700',
        padding: 8,
        borderRadius: 4,
        alignItems: 'center',
        justifyContent: 'center',
    },
    actionText: {
        color: '#000', // Preto para contraste
        fontSize: 18,
        fontWeight: 'bold',
    },
    adicionaisText: {
        color: '#ccc',
        fontSize: 14,
        marginVertical: 4,
    },
    removeButton: {
        marginLeft: 16,
        backgroundColor: '#FF4500', // Laranja escuro
        padding: 8,
        borderRadius: 4,
        alignItems: 'center',
        justifyContent: 'center',
    },
    removeText: {
        color: '#fff',
        fontSize: 14,
        fontWeight: 'bold',
    },    
});

export default styles;