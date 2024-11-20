import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    profileContainer: {
        flex: 1,
        backgroundColor: '#000',
        alignItems: 'center',
    },
    avatarContainer: {
        marginTop: 150,
        alignItems: 'center',
        marginBottom: 20,
    },
    avatarCircle: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
    },
    optionsContainer: {
        width: '80%',
    },
    option: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 15,
    },
    optionText: {
        fontSize: 18,
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
