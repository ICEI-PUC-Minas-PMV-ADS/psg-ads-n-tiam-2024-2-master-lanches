import React, { useState } from 'react';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "../pages/login";
import HomeScreen from "../pages/telaPrincipal";
import Pesquisa from "../pages/Pesquisa"
import Cart from "../pages/shoppingCart";
import AdministrationFunctions from '../pages/funçõesAdministração';
import { accessUser } from '../contexts/UserContext';
import Cadastro from '../pages/cadastro';
import CategoriaBebidas from '../pages/categorias/bebidas';
import CategoriaTeste from '../pages/categorias/Base';
import Profile from '../pages/profile';
import PedidosList from '../pages/gestao';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
    const { ADM } = accessUser()

    // Mapeamento de telas baseando-se no estado ADM
    const CHANGEABLE_NAVIGATION = [
        { name: "Cart", component: Cart }, // Estado não-administrador
        { name: "AdminFunctions", component: AdministrationFunctions }, // Estado administrador
    ];

    const dynamicScreen = ADM ? CHANGEABLE_NAVIGATION[1] : CHANGEABLE_NAVIGATION[0];

    return (
        <Stack.Navigator
<<<<<<< Updated upstream
            initialRouteName="Cadastro"
=======
<<<<<<< HEAD
            initialRouteName="Bebidas"
=======
            initialRouteName="Cadastro"
>>>>>>> 5aa478853d8be51769237fb12ff8fbe07e009ab0
>>>>>>> Stashed changes
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
            <Stack.Screen name="Cadastro" component={Cadastro} />
            <Stack.Screen name="Perfil" component={Profile} />
            <Stack.Screen name="Bebidas" component={Categoria} />
            <Stack.Screen name="teste" component={CategoriaTeste} />
            <Stack.Screen name="Funções Administração" component={AdministrationFunctions} />
            <Stack.Screen name="pedidos" component={PedidosList} />
            {/* Tela dinâmica */}
            <Stack.Screen name={dynamicScreen.name} component={dynamicScreen.component} initialParams={{ userRole: ADM ? "admin" : "user" }} />
        </Stack.Navigator>
    );
}