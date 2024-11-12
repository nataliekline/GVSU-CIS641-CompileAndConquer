import { DefaultTheme, PaperProvider } from 'react-native-paper';

import BackgroundScreen from './background';
import LoginScreen from "./login";
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import SignUpScreen from './SignUpScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

export type RootStackParamList = {
  Login: undefined;
  SignUp: undefined;
  Background: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: 'blue',
      accent: 'green',
    },
  };

export default function App() {
  return (
    <SafeAreaProvider>
        <PaperProvider theme={theme}>
            <Stack.Navigator initialRouteName="Background">
                
            <Stack.Screen 
                name="Login" 
                component={LoginScreen} 
                options={{ headerShown : false }} 
            />
            <Stack.Screen 
                name="SignUp" 
                component={SignUpScreen} 
                options={{ title: 'Sign Up' }} 
            />
            <Stack.Screen 
                name="Background" 
                component={BackgroundScreen} 
                options={{ headerShown : false }} 
            />
            </Stack.Navigator>
        </PaperProvider>
    </SafeAreaProvider>
  );
}