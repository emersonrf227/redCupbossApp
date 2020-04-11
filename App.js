import React from 'react'
import { StyleSheet, Platform, Image, Text, View } from 'react-native'
import Home from './src/pages/home'
import Destaques from './src/pages/destaques'



import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
const AppNavigator = createStackNavigator({
  Home: {
    screen: Home,
  },
  Destaques: {
    screen: Destaques,
  },
},
{
  initialRouteName: 'Home',
  defaultNavigationOptions: {
    headerStyle: {
      backgroundColor: '#a00f01',
    },
    headerTintColor: '#333',
    headerBackTitleStyle: {
      fontWeight: 'bold',
    },
  },
}
);

export default createAppContainer(AppNavigator);