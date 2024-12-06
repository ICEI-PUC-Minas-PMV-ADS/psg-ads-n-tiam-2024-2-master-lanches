import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import styles from "./style";
import { useNavigation } from "@react-navigation/native";
import { accessUser } from "../../contexts/UserContext";

const Header = ({ title }) => {
    const navigation = useNavigation();
    const { accessibleScreens } = accessUser();

    const isPedidosAvailable = accessibleScreens.some(screen => screen.name === "Pedidos");
    const isPerfilAvailable = accessibleScreens.some(screen => screen.name === "Perfil");

    return (
        <View style={styles.container}>
            {isPedidosAvailable && (
                <TouchableOpacity
                    style={styles.wishesButton}
                    onPress={() => navigation.navigate("Pedidos")}
                >
                    <Image
                        source={require("../../assets/Pedidos.png")}
                        style={[styles.wishesIcon, { resizeMode: "contain" }]}
                    />
                </TouchableOpacity>
            )}
            <Text style={styles.title}>{title}</Text>
            {isPerfilAvailable && (
                <TouchableOpacity
                    style={styles.profileButton}
                    onPress={() => navigation.navigate("Perfil")}
                >
                    <Image
                        source={require("../../assets/Icone_Perfil.png")}
                        style={[styles.profileIcon, { resizeMode: "contain" }]}
                    />
                </TouchableOpacity>
            )}
        </View>
    );
};

export default Header;