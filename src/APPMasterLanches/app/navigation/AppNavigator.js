import React, { useState } from 'react';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "../pages/login";
import HomeScreen from "../pages/telaPrincipal";
import Pesquisa from "../pages/pesquisa"
import Cart from "../pages/shoppingCart";
import AdministrationFunctions from '../pages/funçõesAdministração';
import { accessUser } from '../contexts/UserContext';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
    const {ADM}  = accessUser()

    // Mapeamento de telas baseando-se no estado ADM
    const CHANGEABLE_NAVIGATION = [
        { name: "Cart", component: Cart }, // Estado não-administrador
        { name: "AdminFunctions", component: AdministrationFunctions }, // Estado administrador
    ];

    const dynamicScreen = ADM ? CHANGEABLE_NAVIGATION[1] : CHANGEABLE_NAVIGATION[0];

    return (
        <Stack.Navigator
            initialRouteName="Login"
            screenOptions={{
                animation: 'fade',
                headerShown: false,
                animationEnabled: true,
                gestureEnabled: true,
                cardStyle: { backgroundColor: 'transparent' }, 
            }}
        >
            {/* Telas comuns */}
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Search" component={Pesquisa} />

            {/* Tela dinâmica */}
            <Stack.Screen name={dynamicScreen.name} component={dynamicScreen.component} initialParams={{ userRole: ADM ? "admin" : "user"}} />
        </Stack.Navigator>
    );
}