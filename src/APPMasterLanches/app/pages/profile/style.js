import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    profileContainer: {
        flex: 1,
        backgroundColor: '#000',
        alignItems: 'center',
    },
    avatarContainer: {
        marginTop: 180,
        alignItems: 'center',
        marginBottom: 100,
    },
    avatarCircle: {
        width: 100,
        height: 100,
        borderRadius: 40,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden', // Garante que a imagem respeite o formato circular
    },
    avatarImage: {
        width: '100%',
        height: '100%',
    },
    nameInput: {
        marginTop: 10,
        fontSize: 22,
        color: '#fff',
        width: '80%',
        padding: 10,
        borderRadius: 8,
        textAlign: 'center',
    },    
    optionsContainer: {
        width: '80%',
    },
    option: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 15,
    },
    helpDetails: {
        marginTop: 10,
        padding: 10,
        backgroundColor: '#222',
        borderRadius: 8,
    },
    helpText: {
        fontSize: 18,
        color: '#fff',
        marginBottom: 10,
    },
    
    optionText: {
        fontSize: 22,
        color: '#fff',
        marginLeft: 10,
    },
    divider: {
        height: 1,
        backgroundColor: '#555',
        width: '100%',
    },
});

export default styles;
