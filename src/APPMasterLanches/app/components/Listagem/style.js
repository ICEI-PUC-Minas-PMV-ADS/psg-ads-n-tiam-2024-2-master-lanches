import { StyleSheet, Platform } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5', 
        alignItems: 'center',
        paddingTop: Platform.OS === 'ios' ? 40 : 20,
    },
    listContainer: {
        marginTop: Platform.OS === 'ios' || Platform.OS === 'android' ? 40 : 0,
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingBottom: 80,
        width: '90%',
    },
    listItem: {
        width: '100%',
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 15,
        marginBottom: 10,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowRadius: 10,
        elevation: 5,
    },
    itemText: {
        fontSize: 18,
        color: '#333',
    },
    button: {
        backgroundColor: '#f76c6c',
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 5,
        marginTop: 10,
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
});

export default styles;