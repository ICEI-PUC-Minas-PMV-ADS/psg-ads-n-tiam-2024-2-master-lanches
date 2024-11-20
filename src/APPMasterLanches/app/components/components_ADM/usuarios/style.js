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
        alignItems: 'center',
        paddingBottom: 80,
    },
});

export default styles;