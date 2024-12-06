import { StyleSheet, Platform } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000000', 
        alignItems: 'center',
    },
    cardContainer: {
        width: 150,
        marginHorizontal: 5,
    },
    section: {
        minWidth: '95%',
        maxWidth: '95%',
        marginVertical: 16,
        backgroundColor: '#333',
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 16,
        alignItems: 'center',
        alignSelf: 'center',
        minHeight: 150,
    },
    sectionTitle: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    sectionListContainer: {
       // paddingBottom: 80, // Não necessario
    },
});

export default styles;
