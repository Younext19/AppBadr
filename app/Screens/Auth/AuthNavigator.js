import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Signup from './Signup';
import Login from './Login';
import FirstSign from './FirstSign';

export default function AuthNavigator() {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name="Login"
        component={Login}
      />
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name="Signup"
        component={Signup}
      />
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name="FirstSign"
        component={FirstSign}
      />
    </Stack.Navigator>
  );
}
