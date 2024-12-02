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
        backgroundColor: '#121212',
        width: '100%',
        height: '100%',
    },
    header: {
        backgroundColor: "#333",
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: "#555",
    },
    activeHeader: {
        backgroundColor: "#444",
    },
    headerText: {
        color: "#fff",
        fontSize: 16,
    },
    content: {
        padding: 15,
        backgroundColor: "#222",
    },
    contentText: {
        color: "#fff",
    },
});

export default styles;