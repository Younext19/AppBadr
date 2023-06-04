import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from './app/Screens/Auth/Login';
import Signup from './app/Screens/Auth/Signup';
import BottomNavigation from './app/Screens/BottomBar/BottomNav';
import AuthNavigator from './app/Screens/Auth/AuthNavigator';
import auth from '@react-native-firebase/auth';

export default function App() {
  const Stack = createNativeStackNavigator();
  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  // Handle user state changes
  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  return (
    // If Connected : Go to Home ELSE :  go to Login
    <NavigationContainer>
      <Stack.Navigator>
        {!user ? (
          <Stack.Screen
            name="AuthNavigator"
            component={AuthNavigator}
            options={{headerShown: false}}
          />
        ) : (
          <Stack.Screen
            name="BottomNavigation"
            component={BottomNavigation}
            options={{headerShown: false}}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
