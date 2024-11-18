import React from 'react';
import { NavigationContainer } from "@react-navigation/native";
import Login from "./app/pages/login";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { CartProvider } from './app/contexts/CartContext';
import Login from './app/pages/login';
import HomeScreen from './app/pages/telaPrincipal';
import SearchScreen from './app/pages/search';
import Cart from './app/pages/shoppingCart';
import CategoriaBebidas from './app/pages/categorias/bebidas'

const Stack = createNativeStackNavigator();
export default function App() {
    return (
        <CartProvider>
            <NavigationContainer>
                <Stack.Navigator 
                    initialRouteName="Bebidas" 
                    screenOptions={{ animation: 'fade', headerShown: false }} 
                >
                    <Stack.Screen name="Login" component={Login} />
                    <Stack.Screen name="Home" component={HomeScreen} />
                    <Stack.Screen name="Search" component={Pesquisa} />
                    <Stack.Screen name="Cart" component={Cart} />
                    <Stack.Screen name="Bebidas" component={CategoriaBebidas} />
                </Stack.Navigator>
            </NavigationContainer>
        </CartProvider>
    );
}