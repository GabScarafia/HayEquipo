import React, { useState} from 'react';
import { View, TextInput, Button, Text, ScrollView, Alert } from 'react-native';
import { styles } from './RegisterScreen.style';
import {NewUser, User} from '../classes/user';
import Persona from '../classes/persona';
import SupabaseService from '../lib/supabase';
import { useNavigation } from '@react-navigation/native';
import { RootStackParams } from '../App';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

const RegistrationScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const supabaseService = new SupabaseService();
  const [mode, setMode] = useState(0);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [dni, setDni] = useState('');
  const [genero, setGenero] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({
    username: '',
    email: '',
    password: '',
    nombre: '',
    apellido: '',
    dni: '',
  });


  const handleRegister = async() => {
    setErrors({
      username: '',
      email: '',
      password: '',
      nombre: '',
      apellido: '',
      dni: '',
    });
    var cError = false
    if (!username || username === "") {
      cError = true
      setErrors((prevErrors) => ({ ...prevErrors, username: 'Este Campo no puede estar Vacio' }));
    }
    if (!email || email === "") {
      cError = true
      setErrors((prevErrors) => ({ ...prevErrors, email: 'Este Campo no puede estar Vacio' }));
    }
    if (!password || password === "") {
      cError = true
      setErrors((prevErrors) => ({ ...prevErrors, password: 'Este Campo no puede estar Vacio' }));
    }
    if (!nombre || apellido === "") {
      cError = true
      setErrors((prevErrors) => ({ ...prevErrors, nombre: 'Este Campo no puede estar Vacio' }));
    }
    if (!apellido || apellido === "") {
      cError = true
      setErrors((prevErrors) => ({ ...prevErrors, apellido: 'Este Campo no puede estar Vacio' }));
    }
    if (!dni || dni === "") {
      cError = true
      setErrors((prevErrors) => ({ ...prevErrors, dni: 'Este Campo no puede estar Vacio' }));
    }
    if ( cError === true) {
       return;
    }
    setIsLoading(true);
    const user = {
      username,
      email,
      password,
      nombre,
      apellido,
      dni: parseInt(dni),
      genero,
    };

    //COMPROBAR QUE EXISTE EL USUARIO
    var nUser =  new NewUser(user.username,user.email,user.password);
    var nPersona = new Persona(null,user.nombre,user.apellido,user.dni,user.genero,null, null);
    var result = await supabaseService.newRegister(nUser,nPersona)
    if(result){
      const jsonData = JSON.stringify(result);
      await AsyncStorage.setItem('user', jsonData);
      Alert.alert('Registro exitoso');
      navigation.navigate("Home")
    }
  };

  return (
      <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={styles.container}>
        <View>
          <View style={styles.inputContainer}>
            <TextInput 
              style={styles.input}
              placeholder="Usuario"
              value={username}
              onChangeText={setUsername}
            />
            {errors.username ? <Text style={styles.errorText}>{errors.username}</Text> : null}
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
            />
            {errors.email ? <Text style={styles.errorText}>{errors.email}</Text> : null}
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Password"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
            />
            {errors.password ? <Text style={styles.errorText}>{errors.password}</Text> : null}
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Nombre"
              value={nombre}
              onChangeText={setNombre}
            />
            {errors.nombre ? <Text style={styles.errorText}>{errors.nombre}</Text> : null}
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Apellido"
              value={apellido}
              onChangeText={setApellido}
            />
            {errors.apellido ? <Text style={styles.errorText}>{errors.apellido}</Text> : null}
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="DNI"
              value={dni}
              onChangeText={setDni}
              keyboardType="numeric"
            />
            {errors.dni ? <Text style={styles.errorText}>{errors.dni}</Text> : null}
          </View>
          <View style={styles.inputContainer}>
            <TextInput style={styles.input}
              placeholder="Genero"
              value={genero}
              onChangeText={setGenero}
            />
          </View>
          <Button title={isLoading ? 'Creando Cuenta...' : 'Crear Cuenta'}
                  onPress={handleRegister}
                  disabled={isLoading} />
        </View>
      </ScrollView>
  );
};

export default RegistrationScreen;