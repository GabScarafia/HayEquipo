import React, { useEffect, useRef, useState } from 'react';
import { View } from 'react-native';

import { IconButton } from 'react-native-paper';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp, createNativeStackNavigator} from '@react-navigation/native-stack';

import AsyncStorage from '@react-native-async-storage/async-storage';

import Persona from './classes/persona';

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
  const loged = useRef(false);
  
  useEffect(() => {
    ifLoged();
    }, []);

  async function ifLoged() {
    console.log(loged)
    const value = await AsyncStorage.getItem('user');
    if(value != null)
    {
      loged.current = true
      
    }
    else{
      loged.current = false
    }
    console.log(loged.current)
  }

  async function CloseSesion( navigation :any){
    try {
      await AsyncStorage.removeItem('user');
      loged.current = false
      navigation.navigate('Login')
    } catch (error) {
      console.log("error")
    }
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
          {loged.current == false ? (
              <>
                <Stack.Screen name="Login" component={LoginScreen}/>
                <Stack.Screen name="Home" component={HomeScreen}
                options={({ navigation }) => ({ 
                title: "Hay Equipo",
                headerRight: () => (<IconButton icon="close" onPress={()=>CloseSesion(navigation)} />)})}/>
              </>
            ) : ( 
                <>
                  <Stack.Screen name="Home" component={HomeScreen}
                                                  options={({ navigation }) => ({ 
                                                  title: "Hay Equipo",
                                                  headerRight: () => (<IconButton icon="close" onPress={()=>CloseSesion(navigation)} />)})}/>
                  <Stack.Screen name="Login" component={LoginScreen}  />
                  <Stack.Screen name='Register' component={RegisterScreen} />
                </>
            )} 
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;