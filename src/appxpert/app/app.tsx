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
import Ionicons from 'react-native-vector-icons/Ionicons';

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

type TabBarIconProps = {
  focused: boolean;
  color: string;
  size: number;
};

function getTabBarIcon(focused: boolean, color: string, name: string): JSX.Element {
  const iconMap: { [key: string]: string } = {
    Dashboard: 'analytics',
    Applications: 'documents',
    Calendar: 'calendar',
    Settings: 'settings',
  };

  const iconName = iconMap[name];
  return (
    <Ionicons
      name={focused ? `${iconName}-sharp` : `${iconName}-outline`}
      size={24}
      color={color}
    />
  );
}

function DashboardTabs() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen
        name="Dashboard"
        component={Dashboard}
        options={{
          tabBarIcon: ({ focused, color }: TabBarIconProps) => getTabBarIcon(focused, color, "Dashboard"),
        }}
      />
      <Tab.Screen
        name="Applications"
        component={Applications}
        options={{
          tabBarIcon: ({ focused, color }: TabBarIconProps) => getTabBarIcon(focused, color, "Applications"),
        }}
      />
      <Tab.Screen
        name="Calendar"
        component={Calendar}
        options={{
          tabBarIcon: ({ focused, color }: TabBarIconProps) => getTabBarIcon(focused, color, "Calendar"),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={Settings}
        options={{
          tabBarIcon: ({ focused, color }: TabBarIconProps) => getTabBarIcon(focused, color, "Settings"),
        }}
      />
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