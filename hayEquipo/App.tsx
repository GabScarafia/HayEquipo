import React from 'react';
import { View } from 'react-native';
import LoginScreen from './screens/LoginScreen';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import RegisterScreen from './screens/RegisterScreen';

export type RootStackParams = {
  Register : any;
  Login : any;
};
const Stack = createNativeStackNavigator();

const App = () => {
  
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{title: 'Iniciar Sesión'}}
        />
        <Stack.Screen name="Register" component={RegisterScreen} options={{title: 'Crear Cuenta'}} /> 
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;