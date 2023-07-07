import React, { useEffect, useState } from 'react';
import { Alert, Button, TouchableOpacity, View } from 'react-native';
import { styles } from './Profile.style';
import { Text } from 'react-native-paper';
import InputComponent from '../../component/InputComponent';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { User } from '../../classes/user';
import Persona from '../../classes/persona';
import SupabaseService from '../../lib/supabase';
import Avatar from '../../component/Avatar';
//CAMBIAR PERFIL Y FOTO 
const Profile = () => {
    //Definiciones de Campo
    const supabaseService = new SupabaseService();
    
    const [id, setId] = useState('');
    const [photo, setPhoto] = useState<string | null>(null);
    const [User, setUser] = useState<User | null>(null);
    const [nombre, setNombre] = useState('');
    const [nombreError, setNombreError] = useState<string | null>(null);

    const [apellido, setApellido] = useState('');
    const [apellidoError, setApellidoError] = useState<string | null>(null);

    const [dni, setDni] = useState('');
    const [dniError, setDniError] = useState<string | null>(null);

    const [genero, setGenero] = useState('');

    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setPhoto(photo);
      }, [])
    
    //Errores
    const handleNameChange = (text: string) => {
        setNombre(text);
        // Perform any validation and set the error message if necessary
        setNombreError(text.trim() === '' ? 'Este Campo no puede estar Vacio' : null);
    };
    const handleSurnameChange = (text: string) => {
        setApellido(text);
        // Perform any validation and set the error message if necessary
        setApellidoError(text.trim() === '' ? 'Este Campo no puede estar Vacio' : null);
    };
    const handleDniChange = (text: string) => {
        setDni(text);
        // Perform any validation and set the error message if necessary
        setDniError(text.trim() === '' ? 'Este Campo no puede estar Vacio' : null);
    };
    const handleGeneroChange = (text: string) => {
        setGenero(text);
    };
    const handleImageChange = (text: string | null) => {
        console.log("estoy en image")
        setPhoto(text);
    };
    //GET VARIBLES EXISTENTES
    useEffect(() => {
        if(!isLoading)
        {
            GetData();
            setIsLoading(true);
        }
    }, []);
    const GetData = async() => {  /*: (Promise<Boolean>)*/
        const value = await AsyncStorage.getItem('user');
        if(value != null)
        {
            const data = JSON.parse(value)
            const { id, nombre, apellido, dni, genero, User, image } = data;
            setNombre(nombre)
            setApellido(apellido)
            setDni(dni.toString())
            setGenero(genero)
            setId(id.toString())
            setUser(User)
            setPhoto(image)
            // console.log("porque no cambia la imagen?")
            // console.log(image)
        }
    }
    //SET VARIBLES
    const handleSave = async() => {
        if(nombreError == null && apellidoError == null && dniError == null){
            const Person = new Persona(parseInt(id), nombre, apellido, parseInt(dni), genero, User,photo)
            //LLAMAR A SUPABASE
            const success =await supabaseService.setPersonById(Person)
            if(success){
                const jsonData = JSON.stringify(Person);
                await AsyncStorage.setItem('user', jsonData);
                Alert.alert('Cambio Realizado Correctamente');
            }else{
                Alert.alert('Error');
            }
        }
    }

return (
    <View style={styles.view} >
        <Avatar photo={photo} onChange={handleImageChange} />
        <InputComponent
            label="Nombre"
            value={nombre}
            onChangeText={handleNameChange}
            error={nombreError}
        />
         <InputComponent
            label="Apellido"
            value={apellido}
            onChangeText={handleSurnameChange}
            error={apellidoError}
        />
         <InputComponent
            label="DNI"
            value={dni}
            onChangeText={handleDniChange}
            error={dniError}
        />
        <InputComponent
            label="Genero"
            value={genero}
            onChangeText={handleGeneroChange}
            error={null}
        />
         <View style={styles.inputContainer}>
          <TouchableOpacity style={styles.registerButton} onPress={handleSave} >
            <Text style={styles.registerButtonText}>GUARDAR</Text>
          </TouchableOpacity >
        </View>
    </View>
);
}

export default Profile