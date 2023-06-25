import React, { useState } from 'react';
import { View, TextInput, Button, Alert } from 'react-native';
import { styles } from './LoginScreen.style';
import supabase from '../lib/supabase';
import SupabaseService from '../lib/supabase';
import User from "../classes/user"

const LoginScreen = () => {
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

  // async function getUserById(username: string) {
  //   try {
  //     const { data, error } = await supabase
  //       .from('User')
  //       .select('*')
  //       .eq('username', username)
  //       .single();
  //     console.log(data)
  //     if (error) {
  //       throw new Error(error.message);
  //     }

  //     if (data) {
  //       const { id, username, email, password } = data;

  //       return new User(id, username, email, password);
  //     }

  //     return null;
  //   } catch {
  //     return null;
  //   }
  // }


  return (
    <>
      <View style={styles.view} >
        <TextInput 
          style={styles.input}
          placeholder="Usuario"
          value={username}
          onChangeText={setUsername}
        />
        <TextInput
          placeholder="Contraseña"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <Button title="Iniciar sesión" onPress={handleLogin} />
      </View>
    </>
  );
};


  
export default LoginScreen;
