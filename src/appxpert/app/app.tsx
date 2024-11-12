import { DefaultTheme, PaperProvider } from 'react-native-paper';
import React, { useState } from 'react';

import Home from './home/home';
import LoginScreen from "./login";
import { SafeAreaProvider } from 'react-native-safe-area-context';
import SignUpScreen from './signup';
import { auth } from '@/config/fb-config';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

export type RootStackParamList = {
  Home: undefined;
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
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  auth.onAuthStateChanged((user) => {
    if (user != null) {
      setIsLoggedIn(true)
    } else {
      setIsLoggedIn(false);
    }
  });

  return (
    <SafeAreaProvider>
        <PaperProvider theme={theme}>
            <Stack.Navigator initialRouteName="Login">
              {isLoggedIn ? (
                   <Stack.Screen name="Home" component={Home} options={{ headerShown : false}}/>
                ) : (
                  <>
                    <Stack.Screen 
                          name="Login" 
                          component={LoginScreen} 
                          options={{ headerShown : false }} 
                      />
                      <Stack.Screen 
                          name="SignUp" 
                          component={SignUpScreen} 
                          options={{ headerShown : false }} 
                      />
                  
                  </>
                )
              }
    
            </Stack.Navigator>
        </PaperProvider>
    </SafeAreaProvider>
  );
}