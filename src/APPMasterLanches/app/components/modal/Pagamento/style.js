import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    modal: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)"
    },
    visible: {
        display: "flex"
    },
    hidden: {
        display: "none"
    },
    container: {
        width: "80%",
        padding: 20,
        backgroundColor: "#fff",
        borderRadius: 10,
        alignItems: "center"
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 20
    },
    input: {
        width: "100%",
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 5,
        padding: 10,
        marginBottom: 15
    },
    label: {
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 5
    },
    pixCode: {
        fontSize: 14,
        color: "#007BFF",
        marginBottom: 15
    },
    qrCode: {
        width: 150,
        height: 150,
        marginBottom: 20
    }
});

export default styles;