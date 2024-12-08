import React, { useEffect, useState } from 'react';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { accessUser } from '../contexts/UserContext';

// Páginas
import Login from "../pages/login";
import HomeScreen from "../pages/telaPrincipal";
import Pesquisa from "../pages/Pesquisa";
import Cart from "../pages/shoppingCart";
import AdministrationFunctions from '../pages/funçõesAdministração';
import Cadastro from '../pages/cadastro';
import Categoria from '../pages/categorias/bebidas';
import Profile from '../pages/profile';
import PedidosList from '../pages/gestao';
import LoadingScreen from '../pages/Loading';
import Configuracoes from "../pages/Configuracoes"; // Importação da página de configurações

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
    const { accessibleScreens, isLoading } = accessUser();
    const [dynamicScreens, setDynamicScreens] = useState([]);
    const [initialRoute, setInitialRoute] = useState("Perfil"); // Rota inicial padrão antes de carregar

    useEffect(() => {
        if (!isLoading && accessibleScreens.length > 0) {
            const screenMap = {
                PaginaInicial: { component: HomeScreen, routeName: "Principal" },
                PaginaPesquisa: { component: Pesquisa, routeName: "Pesquisa" },
                Carrinho: { component: Cart, routeName: "Carrinho" },
                "Funções Administração": { component: AdministrationFunctions, routeName: "Funções Administração" },
                Perfil: { component: Profile, routeName: "Perfil" },
                Configuracoes: { component: Configuracoes, routeName: "Configuracoes" }, 
                Categorias: { component: Categoria, routeName: "Categorias" },
                Pedidos: { component: PedidosList, routeName: "Pedidos" },
            };

            const screens = accessibleScreens
                .filter(screen => screenMap[screen.name])
                .map(screen => ({
                    name: screenMap[screen.name].routeName,
                    component: screenMap[screen.name].component,
                }));

            setDynamicScreens(screens);
            setInitialRoute("Principal"); // Define a rota inicial
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
            {/* Telas fixas */}
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Cadastro" component={Cadastro} />
            <Stack.Screen name="Perfil" component={Profile} />

            {/* Telas dinâmicas */}
            {dynamicScreens.map(({ name, component }, index) => (
                <Stack.Screen key={index} name={name} component={component} />
            ))}
        </Stack.Navigator>
    );
}
