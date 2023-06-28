import React, { useEffect, useRef, useState } from 'react';
import { View } from 'react-native';

import { IconButton } from 'react-native-paper';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import HomeScreen from "./screens/HomeScreen";

export type RootStackParams = {
  Register : any;
  Login : any;
  Home : any;
};
const Stack = createNativeStackNavigator();  

const App = () => {
  async function CloseSesion( navigation :any){
    try {
      await AsyncStorage.removeItem('user');
      // loged.current = false
      navigation.navigate('Login')
    } catch (error) {
      console.log("error")
    }
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
              <Stack.Screen name="Login" component={LoginScreen}/>             
              <Stack.Screen name='Register' component={RegisterScreen} />
              <Stack.Screen name="Home" component={HomeScreen} options={({ navigation }) => ({ 
                                                                        headerBackVisible: false,
                                                                        title: "Hay Equipo",
                                                                        headerRight: () => (<IconButton icon="close-circle-outline" onPress={()=>CloseSesion(navigation)} />)})}/>

      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;