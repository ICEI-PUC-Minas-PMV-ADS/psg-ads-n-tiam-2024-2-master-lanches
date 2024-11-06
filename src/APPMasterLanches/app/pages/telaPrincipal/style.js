import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
        alignItems: 'center',
    },
    scrollContainer: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: 80,
    },
    cardContainer: {
        marginVertical: 20, // Espaçamento entre o card e outras seções
    },
    secondTitles: {
        width: '90%',
        marginTop: 20,
        paddingVertical: 10,
        backgroundColor: '#333',
        borderRadius: 10,
        alignItems: 'center',
    },
    text: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
    categorias: {
        width: '90%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
    }
});

export default styles;
