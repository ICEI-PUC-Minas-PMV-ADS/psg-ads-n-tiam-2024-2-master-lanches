import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    configContainer: {
        flex: 1,
        backgroundColor: '#000',
        padding: 20,
        alignItems: 'center',
    },
    configTitle: {
        fontSize: 28,
        color: '#fff',
        marginBottom: 20,
        textAlign: 'center',
    },
    inputGroup: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#222',
        padding: 10,
        borderRadius: 8,
        width: '100%',
        marginBottom: 20,
    },
    input: {
        flex: 1,
        marginLeft: 10,
        color: '#fff',
        fontSize: 18,
    },
    saveButton: {
        backgroundColor: '#D8A13B',
        paddingVertical: 15,
        paddingHorizontal: 30,
        borderRadius: 8,
        marginTop: 20,
    },
    saveButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default styles;
