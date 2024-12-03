import React from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import { CartProvider } from './app/contexts/CartContext';
import { ProductProvider } from './app/contexts/ProductContext';
import { UserProvider } from './app/contexts/UserContext';
import AppNavigator from './app/navigation/AppNavigator';

const AppProviders = ({ children }) => {
    return (
        <ProductProvider>
            <UserProvider>
                <CartProvider>
                    {children}
                </CartProvider>
            </UserProvider>
        </ProductProvider>
    );
};

export default function App() {
    return (
        <AppProviders>
            {/* Adiciona a StatusBar global ( barra superior na tela com informacoes do dispositivo)*/}
            <StatusBar
                barStyle="light-content" // Texto claro
                backgroundColor="#000" // Fundo da barra
            />
            <NavigationContainer>
                <AppNavigator />
            </NavigationContainer>
        </AppProviders>
    );
}
