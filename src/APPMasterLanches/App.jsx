import React from 'react';
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