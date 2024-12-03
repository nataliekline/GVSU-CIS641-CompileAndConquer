import { DefaultTheme, PaperProvider } from 'react-native-paper';
import React, { useState } from 'react';

import { AccountContextProvider } from '@/context/AccountContext';
import AppForm from './home/appForm';
import Applications from './home/applications';
import Calendar from './home/calendar';
import Dashboard from './home/dashboard';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LoginScreen from "./login";
import NewEvent from './home/newEvent';
import PersonalInformation from './home/personalInformation';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Settings from './home/settings';
import SignUpScreen from './signup';
import { auth } from '@/config/fb-config';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

export type RootStackParamList = {
  Home: undefined;
  Dashboard: undefined;
  Login: undefined;
  SignUp: undefined;
  PersonalInformation: undefined;
  AppForm: undefined;
  ApplicationsHome: undefined;
  SettingsHome: undefined;
  CalendarHome: undefined;
  NewEvent: undefined;
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
        component={ApplicationsStack}
        options={{
          tabBarIcon: ({ focused, color }: TabBarIconProps) => getTabBarIcon(focused, color, "Applications"),
        }}
      />
      <Tab.Screen
        name="Calendar"
        component={EventsStack}
        options={{
          tabBarIcon: ({ focused, color }: TabBarIconProps) => getTabBarIcon(focused, color, "Calendar"),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsStack}
        options={{
          tabBarIcon: ({ focused, color }: TabBarIconProps) => getTabBarIcon(focused, color, "Settings"),
        }}
      />
    </Tab.Navigator>
  );
}

function ApplicationsStack() {
  return(
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ApplicationsHome" component={Applications} />
      <Stack.Screen name="AppForm" component={AppForm}/>
    </Stack.Navigator>
  );
}

function SettingsStack() {
  return(
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="SettingsHome" component={Settings} />
      <Stack.Screen name="PersonalInformation" component={PersonalInformation}/>
    </Stack.Navigator>
  );
}

function EventsStack() {
  return(
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="CalendarHome" component={Calendar} />
      <Stack.Screen name="NewEvent" component={NewEvent}/>
    </Stack.Navigator>
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
      <AccountContextProvider>
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
      </AccountContextProvider>
    </SafeAreaProvider>
  );
}