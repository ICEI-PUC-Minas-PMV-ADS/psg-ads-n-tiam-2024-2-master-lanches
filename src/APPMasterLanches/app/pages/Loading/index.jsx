import React from "react";
import { View, ActivityIndicator, Text } from "react-native";

const LoadingScreen = () => (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Carregando...</Text>
    </View>
);

export default LoadingScreen;