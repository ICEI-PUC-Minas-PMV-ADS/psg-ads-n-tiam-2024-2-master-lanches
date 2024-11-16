
import React from 'react';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "../pages/login";
import HomeScreen from "../pages/telaPrincipal";
import Pesquisa from "../pages/Pesquisa";
import Cart from "../pages/shoppingCart";

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
    return (
        <Stack.Navigator
            initialRouteName="Home"
            screenOptions={{
                animation: 'fade', // ou 'slide_from_right', 'slide_from_left', etc.
                headerShown: false, // se você não quiser mostrar o cabeçalho
                animationEnabled: true,
                gestureEnabled: true,
            }}
        >
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Search" component={Pesquisa} />
            <Stack.Screen name="Cart" component={Cart} />
        </Stack.Navigator>
    );
}