import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    modal: {
        flex: 1,
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        zIndex: 10,
    },
    container: {
        width: "80%",
        padding: 20,
        backgroundColor: "#fff",
        borderRadius: 10,
        elevation: 10,
        alignItems: "center",
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 20,
    },
    label: {
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 5,
        textAlign: "left",
        width: "100%",
    },
    pixCode: {
        fontSize: 14,
        color: "#007BFF",
        marginBottom: 15,
        textAlign: "left",
    },
    qrCode: {
        width: 150,
        height: 150,
        marginBottom: 20,
    },
    button: {
        backgroundColor: "#007BFF",
        padding: 10,
        borderRadius: 5,
        marginTop: 15,
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
    cancelButton: {
        backgroundColor: "red",
        padding: 10,
        borderRadius: 5,
        marginTop: 15,
    },
    cancelButtonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
});

export default styles;