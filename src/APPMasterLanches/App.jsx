import React from 'react';
import { NavigationContainer } from "@react-navigation/native";
import Login from "./app/pages/login";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { CartProvider } from "./app/contexts/CartContext";
import HomeScreen from "./app/pages/telaPrincipal";
import SearchScreen from "./app/pages/search";
import Cart from "./app/pages/shoppingCart";

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
                <Stack.Navigator 
                    initialRouteName="Home" 
                    screenOptions={{ animation: 'fade', headerShown: false }} 
                >
                    <Stack.Screen name="Login" component={Login} />
                    <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
                    <Stack.Screen name="Search" component={SearchScreen} options={{ headerShown: false }} />
                    <Stack.Screen name="Cart" component={Cart} options={{ headerShown: false }} />
                </Stack.Navigator>
            </NavigationContainer>
        </AppProviders>
    );
}
