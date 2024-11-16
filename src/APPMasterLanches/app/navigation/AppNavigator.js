import React from 'react';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "../pages/login";
import HomeScreen from "../pages/telaPrincipal";
import Pesquisa from "../pages/pesquisa"
import Cart from "../pages/shoppingCart";

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
    return (
        <Stack.Navigator
            initialRouteName="Home"
            screenOptions={{
                animation: 'fade',  // Ou qualquer outra animação desejada
                headerShown: false,
                animationEnabled: true,
                gestureEnabled: true,
                cardStyle: { backgroundColor: 'transparent' },  // Fundo transparente para evitar piscar
            }}
        >
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Search" component={Pesquisa} />
            <Stack.Screen name="Cart" component={Cart} />
        </Stack.Navigator>
    );
}