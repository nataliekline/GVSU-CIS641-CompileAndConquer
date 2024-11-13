import { DefaultTheme, PaperProvider } from 'react-native-paper';
import React, { useState } from 'react';
import LoginScreen from "./login";
import { SafeAreaProvider } from 'react-native-safe-area-context';
import SignUpScreen from './signup';
import { auth } from '@/config/fb-config';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Dashboard from './home/dashboard';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Applications from './home/applications';
import Calendar from './home/calendar';
import Settings from './home/settings';

export type RootStackParamList = {
  Home: undefined;
  Dashboard: undefined;
  Login: undefined;
  SignUp: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator();

const theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: 'blue',
      accent: 'green',
    },
  };

function DashboardTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Dashboard" component={Dashboard} options={{ headerShown: false }} />
      <Tab.Screen name="Applications" component={Applications} options={{ headerShown: false }} />
      <Tab.Screen name="Calendar" component={Calendar} options={{ headerShown: false }} />
      <Tab.Screen name="Settings" component={Settings} options={{ headerShown: false }} />
    </Tab.Navigator>
  );
}

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
                   <Stack.Screen name="Home" component={DashboardTabs} options={{ headerShown : false}}/>
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