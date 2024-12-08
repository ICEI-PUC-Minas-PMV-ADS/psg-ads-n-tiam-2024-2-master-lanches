import React, { useEffect, useState } from 'react';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { accessUser } from '../contexts/UserContext';
import Login from "../pages/login";
import HomeScreen from "../pages/telaPrincipal";
import Pesquisa from "../pages/Pesquisa"
import Cart from "../pages/shoppingCart";
import AdministrationFunctions from '../pages/funçõesAdministração';
import Cadastro from '../pages/cadastro';
import Categoria from '../pages/categorias/bebidas';
import Profile from '../pages/profile';
import PedidosList from '../pages/gestao';
import LoadingScreen from '../pages/Loading';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
    const { accessibleScreens, isLoading } = accessUser();
    const [dynamicScreens, setDynamicScreens] = useState([]);
    const [initialRoute, setInitialRoute] = useState("Login"); // Default to Login before loading

    useEffect(() => {
        // Se não estiver carregando e existirem telas acessíveis
        if (!isLoading && accessibleScreens.length > 0) {
            const screenMap = {
                PaginaInicial: { component: HomeScreen, routeName: "Principal" },
                PaginaPesquisa: { component: Pesquisa, routeName: "Pesquisa" },
                Carrinho: { component: Cart, routeName: "Carrinho" },
                "Funções Administração": { component: AdministrationFunctions, routeName: "Funções Administração" },
                Perfil: { component: Profile, routeName: "Perfil" },
                Categorias: { component: Categoria, routeName: "Categorias" },
                Pedidos: { component: PedidosList, routeName: "Pedidos" },
            };

            // Mapeando as telas acessíveis para os componentes
            const screens = accessibleScreens
                .filter(screen => screenMap[screen.name])
                .map(screen => ({
                    name: screenMap[screen.name].routeName,
                    component: screenMap[screen.name].component,
                }));

            setDynamicScreens(screens);
            setInitialRoute("Principal"); 
        }
    }, [accessibleScreens, isLoading]);

    if (isLoading) {
        return <LoadingScreen />;
    }

    return (
        <Stack.Navigator
            initialRouteName={initialRoute} 
            screenOptions={{
                animation: 'fade',
                headerShown: false,
            }}
        >
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Cadastro" component={Cadastro} />
            {dynamicScreens.map(({ name, component }, index) => (
                <Stack.Screen key={index} name={name} component={component} />
            ))}
        </Stack.Navigator>
    );
}