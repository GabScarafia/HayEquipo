import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { Alert, Button, Image, StyleSheet, Text, View } from 'react-native';
import { IconButton } from 'react-native-paper';
import Persona from '../../../classes/persona';
import SupabaseService from '../../../lib/supabase';
import dayjs from "dayjs";
import Equipo from '../../../classes/equipo';

interface Item{
    idLocal: number,
    idVisitante: number | null,
    fecha: Date,
}

const GameItem : React.FC<Item> = ({ idLocal, idVisitante,fecha}) => {
  const supabaseService = new SupabaseService();
  const [local, setLocal] = useState<Equipo | null>(null);
  const [visitante, setVisitante] = useState<Equipo | null>(null);
  const [isLoad, setLoad] = useState(false)
  // const formattedDate = fecha.toLocaleString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric' })

  const formattedDate = dayjs(fecha).format("DD/MM/YYYY HH:mm"); // 03/19/2022
  

  useEffect(() => {
    if(!isLoad){
        getEquipos()
        setLoad(true)
    }
  }, [])

    async function getEquipos() {
        var l = await supabaseService.getEquipoById(idLocal)
        if(l)
            setLocal(l)
        if(idVisitante){
        var v = await supabaseService.getEquipoById(idVisitante)
        if(v)
            setVisitante(v)}
    } 
    
  return (
      <View style={styles.card}>
       {local?.escudo ? (
            <Image source={{ uri:`data:image/png;base64,${local.escudo}` }} style={styles.image} />
        ) : (
            <Image source={require('../../../assets/default-logo.png')} style={styles.image} />
        )} 
        <View style={styles.content}>
          <Text style={styles.name}>{local?.nombre} {visitante ? "-" : ""} {visitante?.nombre}</Text>
          <Text style={styles.date}>{formattedDate}</Text> 
        </View>
        {visitante ? (visitante?.escudo ? (
            <Image source={{ uri:`data:image/png;base64,${visitante.escudo}` }} style={styles.image} />
        ) : (
            <Image source={require('../../../assets/default-logo.png')} style={styles.image}/>
        )):(<></>)} 
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
      textAlign: 'center',
    },
    name: {
      fontSize: 12,
      fontWeight: 'bold',
    },
    date:{
      fontSize:11,
    }
  });
  
  export default GameItem;