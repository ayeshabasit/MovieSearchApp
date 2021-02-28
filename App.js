/**
A simple movie search app 
**/
import React,  { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, Image } from "react-native";
import { SearchBar } from 'react-native-elements';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from 'react-native-splash-screen'

import HomePage from "./pages/home";
import MoviePage from "./pages/movie";
import AllResultsPage from "./pages/allresults";


const Stack = createStackNavigator();

const App: () => React$Node = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomePage} />
        <Stack.Screen name="Movies" component={MoviePage} />
        <Stack.Screen name="Allresults" component={AllResultsPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};



export default App;
