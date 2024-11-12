import { DefaultTheme, PaperProvider } from 'react-native-paper';

import LoginScreen from "./login";
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import SignUpScreen from './signup';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

export type RootStackParamList = {
  Login: undefined;
  SignUp: undefined;
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
              <Stack.Navigator initialRouteName="SignUp" screenOptions={{headerShown: false}}>
              
              <Stack.Screen
                  name="Login"
                  component={LoginScreen}
              />
              <Stack.Screen
                  name="SignUp"
                  component={SignUpScreen}
              />
              </Stack.Navigator>
        </PaperProvider>
    </SafeAreaProvider>
  );
}