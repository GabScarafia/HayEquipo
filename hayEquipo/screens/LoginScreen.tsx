import React, { useState } from 'react';
import { View, TextInput, Button, Alert, Pressable, Text, TouchableOpacity } from 'react-native';
import { styles } from './LoginScreen.style';
import supabase from '../lib/supabase';
import SupabaseService from '../lib/supabase';
import User from "../classes/user"
import { useNavigation } from '@react-navigation/native';
import { RootStackParams } from '../App';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

const LoginScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [responseData, setResponse] = useState<User | null>(null);
  const supabaseService = new SupabaseService();

  async function handleLogin(){
    setResponse(await supabaseService.getUserByUsername(username))
    if (username === responseData?.username && password === responseData?.password) {
      Alert.alert('Inicio de sesión exitoso');
    } else {
      Alert.alert('Error de inicio de sesión');
    }
  };
  
  const handleNavigate = () => {
    navigation.navigate("Register");
  };

  return (
    <>
      <View style={styles.view}>
        <TextInput 
          style={styles.input}
          placeholder="Usuario"
          value={username}
          onChangeText={setUsername}/>
        <TextInput
          placeholder="Contraseña"
          value={password}
          onChangeText={setPassword}
          secureTextEntry/>
        <Button title="Iniciar sesión" onPress={handleLogin} />

        <View style={styles.registerButtonContainer}>
          <TouchableOpacity style={styles.registerButton} onPress={handleNavigate} >
            <Text>Registrarse</Text>
          </TouchableOpacity >
        </View>
      </View>
    </>
  );
};


  
export default LoginScreen;
