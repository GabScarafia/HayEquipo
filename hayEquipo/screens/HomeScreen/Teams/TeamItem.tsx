import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
import { Alert, Button, Image, StyleSheet, Text, View } from 'react-native';
import { IconButton } from 'react-native-paper';
import Persona from '../../../classes/persona';
import SupabaseService from '../../../lib/supabase';
// import { styles } from '../HomeScreen.style';

interface Item{
    imageSource:String,
    name:String,
    joinable: boolean,
    id:number
}

const TeamItem : React.FC<Item> = ({ imageSource, name, joinable, id }) => {
  const supabaseService = new SupabaseService();
  
  async function handleClick(){
    var persona = await GetPerson();
    var message = await supabaseService.newPlayerOnTeam(id, persona?.id as number)
    Alert.alert(message as string);
    joinable = false
    //LA FUNCION DE SUPABASE Tengo que pasar el idEquipo y idPersona, buscar el JugadorEquipo 
    //si existe (retornar si existe o insertar si no) 
  }

  const GetPerson = async() => {  
    const value = await AsyncStorage.getItem('user');
    if(value != null)
    {
        const data = JSON.parse(value)
        const { id, nombre, apellido, dni, genero, User, image } = data;
        return new Persona(id, nombre,apellido,dni,genero,User,image)
    }
  }
  return (
      <View style={styles.card}>
       {imageSource ? (
            <Image source={{ uri:`data:image/png;base64,${imageSource}` }} style={styles.image} />
        ) : (
            <Image source={require('../../../assets/default-logo.png')} style={styles.image} />
        )} 
        <View style={styles.content}>
          <Text style={styles.name}>{name}</Text>
        </View>
        {joinable && <IconButton icon="plus" onPress={handleClick} /> } 
      </View>
    );
  };
  
const styles = StyleSheet.create({
    card: {
      flexDirection: 'row',
      backgroundColor: '#fff',
      borderRadius: 8,
      padding: 16,
      marginBottom: 12,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 2,
      zIndex:2,
    },
    image: {
      width: 50,
      height: 50,
      borderRadius: 40,
      marginRight: 16,
    },
    content: {
      flex: 1,
      justifyContent: 'center',
    },
    name: {
      fontSize: 16,
      fontWeight: 'bold',
    },
  });
  
  export default TeamItem;