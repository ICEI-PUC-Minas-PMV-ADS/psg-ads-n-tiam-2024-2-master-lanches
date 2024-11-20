import { StyleSheet, Platform } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#101010",
        padding: 20,
    },
    functionContainer: {
        backgroundColor: "#1e1e1e",
        padding: 15,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#FFD700",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 5,
    },
    headerText: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#FFD700",
        textAlign: "center",
        marginBottom: 10,
    },
    toggleButton: {
        alignSelf: "flex-end",
        marginVertical: 8,
    },    
    stockItem: {
        backgroundColor: "#2c2c2c",
        borderRadius: 8,
        padding: 15,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: "#FFD700",
    },
    itemTitle: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#FFD700",
        marginBottom: 5,
    },
    itemText: {
        fontSize: 16,
        color: "#fff",
        marginBottom: 10,
    },
    input: {
        backgroundColor: "#1e1e1e",
        color: "#fff",
        borderRadius: 5,
        borderWidth: 1,
        borderColor: "#FFD700",
        padding: 10,
        fontSize: 14,
    },
});

export default styles;