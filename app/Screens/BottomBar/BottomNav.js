import React from 'react';
import {Image, View} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from './Home';
import Profile from './Profile';
import Virement from './Virement';

export default function BottomNavigation() {
  const Tab = createBottomTabNavigator();

  return (
    <View style={{flex: 1}}>
      <Tab.Navigator
        initialRouteName={'Home'}
        screenOptions={{
          activeTintColor: '#9DC08B',
          keyboardHidesTabBar: true,
          headerShown: false,
        }}>
        <Tab.Screen
          options={{
            tabBarLabel: 'Accueil',
            tabBarIcon: ({color, size}) => (
              <Image
                style={{width: 25, height: 25}}
                source={require('../../../assets/accueil.png')}
              />
            ),
          }}
          name="Home"
          component={Home}
        />
        <Tab.Screen
          options={{
            tabBarLabel: 'Virement',
            tabBarIcon: ({color, size}) => (
              <Image
                style={{width: 25, height: 25}}
                source={require('../../../assets/vir.png')}
              />
            ),
          }}
          name="Virement"
          component={Virement}
        />

        <Tab.Screen
          options={{
            tabBarLabel: 'Profile',
            tabBarIcon: ({color, size}) => (
              <Image
                style={{width: 25, height: 25}}
                source={require('../../../assets/profile.png')}
              />
            ),
          }}
          name="Profile"
          component={Profile}
        />
      </Tab.Navigator>
    </View>
  );
}
