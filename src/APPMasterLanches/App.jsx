import React from 'react';
import { NavigationContainer } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { CartProvider } from './app/contexts/CartContext';
import { ProductProvider } from './app/contexts/ProductContext';
import AppNavigator from './app/navigation/AppNavigator';

const AppProviders = ({ children }) => {
    return (
        <ProductProvider>
            <CartProvider>
                {children}
            </CartProvider>
        </ProductProvider>
    )
};

export default function App() {
    return (
        <AppProviders>
            <NavigationContainer>
                <AppNavigator />
            </NavigationContainer>
        </AppProviders>
    );
}