import { StyleSheet, Platform } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#121212', // Fundo levemente cinza para suavizar
        paddingHorizontal: 16,
        paddingBottom: 80,
    },
    cartItemContainer: {
        backgroundColor: '#1e1e1e',
        borderRadius: 12,
        marginBottom: 16,
        padding: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 5,
    },
    cartItemContent: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    itemDetails: {
        flex: 1,
        paddingRight: 10,
    },
    itemName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#FFD700',
        marginBottom: 6,
    },
    itemAdditional: {
        fontSize: 14,
        color: '#b3b3b3',
        marginBottom: 4,
    },
    itemRemoved: {
        fontSize: 14,
        color: '#b3b3b3',
        marginBottom: 4,
    },
    itemPrice: {
        fontSize: 14,
        color: '#ccc',
        marginBottom: 4,
    },
    itemSubtotal: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#fff',
        marginTop: 8,
    },
    actionsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
    },
    quantityContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    actionButton: {
        width: 36,
        height: 36,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 18,
        marginHorizontal: 8,
    },
    actionText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff',
    },
    incrementButton: {
        backgroundColor: '#4CAF50', // Verde vibrante
    },
    decrementButton: {
        backgroundColor: '#f44336', // Vermelho vibrante
    },
    itemQuantity: {
        fontSize: 20,
        color: '#FFD700',
    },
    removeButton: {
        marginLeft: 16,
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: 6,
        backgroundColor: '#FF5722', // Laranja forte
    },
    removeText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 14,
    },
    cartFooter: {
        padding: 16,
        backgroundColor: '#1e1e1e',
        borderTopWidth: 1,
        borderTopColor: '#FFD700',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.3,
        shadowRadius: 3.84,
        elevation: 5,
    },
    totalText: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#FFD700',
        marginBottom: 12,
    },
    checkoutButton: {
        backgroundColor: '#FFD700',
        paddingVertical: 14,
        paddingHorizontal: 24,
        borderRadius: 10,
        width: '80%',
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.4,
        shadowRadius: 4,
        elevation: 6,
    },
    checkoutText: {
        color: '#121212',
        fontWeight: 'bold',
        fontSize: 18,
        textAlign: 'center',
    },
    cartList: {
        paddingTop: 10,
    },
    emptyCart: {
        color: '#888',
        fontSize: 18,
        textAlign: 'center',
        marginTop: 20,
    },
});

export default styles;