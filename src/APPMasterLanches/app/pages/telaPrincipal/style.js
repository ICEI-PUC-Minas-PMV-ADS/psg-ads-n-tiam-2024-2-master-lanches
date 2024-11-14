import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1a1a1a', 
        alignItems: 'center',
    },
    scrollContainer: {
        marginTop: 17,
        flexGrow: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingBottom: 80,
    },
    categorias: {
        width: '95%', 
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 5,
        flexWrap: 'wrap',
    },
    section: {
        width: '95%',
        marginVertical: 15,
        backgroundColor: '#333',
        borderRadius: 10,
        paddingVertical: 10,
        alignItems: 'center',
    },
    sectionTitle: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    text: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default styles;
