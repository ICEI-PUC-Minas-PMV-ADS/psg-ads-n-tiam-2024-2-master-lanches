import { StyleSheet, Platform } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black', 
        alignItems: 'center',
    },
    functionContainer: {
        marginTop: Platform.OS === 'ios' || Platform.OS === 'android' ? 40 : 0,
        justifyContent: 'flex-start',
        paddingBottom: 80,
        backgroundColor: 'blue',
        width: '100%',
        height: '100%',
    },
});

export default styles;