import React, { useState} from 'react';
import { View, TextInput, Button, Text, ScrollView } from 'react-native';
import { styles } from './RegisterScreen.style';

const RegistrationScreen = () => {
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
    genero: '',
  });


  const handleRegister = () => {

    if (!username) {
      setErrors((prevErrors) => ({ ...prevErrors, username: 'Este Campo no puede estar Vacio' }));
    }
    if (!email) {
      setErrors((prevErrors) => ({ ...prevErrors, email: 'Este Campo no puede estar Vacio' }));
    }
    if (!password) {
      setErrors((prevErrors) => ({ ...prevErrors, password: 'Este Campo no puede estar Vacio' }));
    }
    if (!nombre) {
      setErrors((prevErrors) => ({ ...prevErrors, nombre: 'Este Campo no puede estar Vacio' }));
    }
    if (!apellido) {
      setErrors((prevErrors) => ({ ...prevErrors, apellido: 'Este Campo no puede estar Vacio' }));
    }
    if (!dni) {
      setErrors((prevErrors) => ({ ...prevErrors, dni: 'Este Campo no puede estar Vacio' }));
    }
    if (Object.values(errors).some((error) => error !== null && error !== '')) {
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
    console.log(user);
  };

  return (
      <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={styles.container}>
        <View>
          <View style={styles.inputContainer}>
            <TextInput 
              style={styles.input}
              placeholder="Username"
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
            />{errors.email ? <Text style={styles.errorText}>{errors.email}</Text> : null}
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Password"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
            />{errors.password ? <Text style={styles.errorText}>{errors.password}</Text> : null}
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