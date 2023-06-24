import React, { useState } from 'react';
import { View, TextInput, Button, Alert } from 'react-native';
import { styles } from './LoginScreen.style';

const LoginScreen = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  let responseData: any;

  async function handleLogin(){
   // await fetchData()
    // Aquí puedes realizar la lógica de autenticación, como enviar una solicitud al servidor o verificar los datos localmente.
    if (username === responseData.nombre && password === responseData.password) {
      Alert.alert('Inicio de sesión exitoso');
    } else {
      Alert.alert('Error de inicio de sesión');
    }
  };

  // const fetchData = async () => {
    
  //     responseData = await supabase
  //     .from('Persona')
  //     .select('1')
  // };

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
