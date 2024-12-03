import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import styles from "./style";
import { useNavigation } from "@react-navigation/native";

const Header = ({ title }) => {
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{title}</Text>
            <TouchableOpacity
                style={styles.profileButton}
                onPress={() => navigation.navigate("Perfil")}
            >
                <Image
                    source={require("../../assets/Icone_Perfil.png")}
                    style={[styles.profileIcon, { resizeMode: "contain" }]}
                />
            </TouchableOpacity>
        </View>
    );
};

export default Header;