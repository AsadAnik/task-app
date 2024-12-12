import React from 'react';
import { Tabs } from 'expo-router';
import { AppProvider, useAppContext } from '../context/AppContext';
import { FontAwesome5, MaterialIcons } from '@expo/vector-icons';

const Layout = () => {
  const { state } = useAppContext();

  return (
    <AppProvider>
      <Tabs
        screenOptions={{
          headerStyle: { backgroundColor: state.theme === 'dark' ? '#333' : '#fff' },
          headerTintColor: state.theme === 'dark' ? '#fff' : '#000',
          tabBarStyle: { backgroundColor: state.theme === 'dark' ? '#333' : '#fff' },
          tabBarActiveTintColor: state.theme === 'dark' ? '#fff' : '#000',
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            headerShown: false,
            tabBarIcon: ({ color, size }) => (
              <FontAwesome5 name="tasks" size={size} color={color} />
            ),
          }}
        />

        <Tabs.Screen
          name="posts"
          options={{
            headerShown: false,
            tabBarIcon: ({ color, size }) => (
              <MaterialIcons name="local-post-office" size={size} color={color} />
            )
          }}
        />

        <Tabs.Screen
          name="forms"
          options={{
            headerShown: false,
            tabBarIcon: ({ color, size }) => (
              <MaterialIcons name="description" size={size} color={color} />
            )
          }}
        />
      </Tabs>
    </AppProvider>
  );
};

export default Layout;
