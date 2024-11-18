import React from 'react';
import { NavigationContainer } from "@react-navigation/native";
import Login from "./app/pages/login";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { CartProvider } from './app/contexts/CartContext';
import HomeScreen from "./app/pages/telaPrincipal";
import Pesquisa from "./app/pages/Pesquisa";
import Cart from "./app/pages/shoppingCart";
import Cadastro from './app/pages/cadastro';
import CadastroEndereco from './app/pages/cadastroEndereco';

const Stack = createNativeStackNavigator();
export default function App() {
    return (
        <CartProvider>
            <NavigationContainer>
                <Stack.Navigator 
                    initialRouteName="Cadastro" 
                    screenOptions={{ animation: 'fade', headerShown: false }} 
                >
                    <Stack.Screen name="Login" component={Login} />
                    <Stack.Screen name="Cadastro" component={Cadastro} />
                    <Stack.Screen name="CadastroEndereco" component={CadastroEndereco} />
                    <Stack.Screen name="Home" component={HomeScreen} />
                    <Stack.Screen name="Search" component={Pesquisa} />
                    <Stack.Screen name="Cart" component={Cart} />
                </Stack.Navigator>
            </NavigationContainer>
        </CartProvider>
    );
}
