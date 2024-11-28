import { StyleSheet } from "react-native";
const styles = StyleSheet.create({
    header: {
        padding: 15,
        backgroundColor: "#333",
        borderBottomWidth: 1,
        borderBottomColor: "#555",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    headerText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
    content: {
        backgroundColor: "black",
        height: '100%',
    },
    icon: {
        marginLeft: 10,
    },
});

export default styles;