import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 60,
        backgroundColor: '#FFD700',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        padding: 10,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        borderTopWidth: 2,
        borderTopColor: '#1e1e1e',
        paddingBottom: 2,
        position: 'absolute',
        bottom: 0,
    },
    button: {
        padding: 10,
    },
    buttonHome: {
        width: 60,
        height: 60,
        backgroundColor: '#FFF1A6',
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        left: '50%',
        transform: [{ translateX: -20 }],
        top: -30,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 8,
    },
    navbar: {
        width: '85%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
});

export default styles;