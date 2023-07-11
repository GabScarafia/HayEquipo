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
}

const PlayerItem : React.FC<Item> = ({ imageSource, name }) => {
  
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
      </View>
    );
  };
  
const styles = StyleSheet.create({
    card: {
      flexDirection: 'row',
      backgroundColor: '#fff',
      padding: 8,
      marginBottom: 12,
      elevation: 1,
      zIndex:2,
    },
    image: {
      width: 25,
      height: 25,
      borderRadius: 40,
      marginRight: 12,
    },
    content: {
      flex: 1,
      justifyContent: 'center',
    },
    name: {
      fontSize: 12,
      fontWeight: 'bold',
    },
  });
  
  export default PlayerItem;