import React, { useEffect, useState } from 'react';
import { View, TextInput, Button, Alert, Pressable, Text, TouchableOpacity } from 'react-native';
import { styles } from './LoginScreen.style';
import SupabaseService from '../lib/supabase';
import Persona from "../classes/persona"
import { useNavigation } from '@react-navigation/native';
import { RootStackParams } from '../App';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const supabaseService = new SupabaseService();
  const [loged, setLoged]  = useState(false);

   useEffect(() => {
     ifLoged();
    }, []);


  async function ifLoged() {
      console.log(loged)
      const value = await AsyncStorage.getItem('user');
      if(value != null)
      {
          setLoged(true)
          navigation.navigate("Home");
      }
      else{
          setLoged(false)
         
      }
      return(loged)
  }

  async function handleLogin(){
    setError('');
    if (username && password) {
      const responseData = await supabaseService.getUserByUsername(username);
  
      if (responseData && username === responseData.username && password === responseData.password) {
        const personData = await supabaseService.getPersonByUserId(responseData.id);
  
        if (personData && responseData) {
          const completePersona = new Persona(personData.id, personData.nombre, personData.apellido, personData.dni, personData.genero, responseData);
          const jsonData = JSON.stringify(completePersona);
          await AsyncStorage.setItem('user', jsonData);
          Alert.alert('Inicio de sesión exitoso');
          navigation.navigate("Home");
        } else {
          setError('Usuario o contraseña incorrecta');
        }
      } else {
        setError('Usuario o contraseña incorrecta');
      }
    } else {
      setError('Usuario o contraseña incorrecta');
    }
  };
  
  const handleNavigate = () => {
    navigation.navigate('Register');
  };

  return (
    <>
      <View style={styles.view}>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Usuario"
            value={username}
            onChangeText={setUsername}
          />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Contraseña"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
        </View>
        <View style={styles.inputContainer}>
          <Button title="Iniciar sesión" onPress={handleLogin} />
        </View>
        {error ? <Text style={styles.errorText}>{error}</Text> : null}
        <View style={styles.inputContainer}>
          <TouchableOpacity style={styles.registerButton} onPress={handleNavigate} >
            <Text style={styles.registerButtonText}>CREAR CUENTA</Text>
          </TouchableOpacity >
        </View>
      </View>
    </>
  );
};


  
export default LoginScreen;
