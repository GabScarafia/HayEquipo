import React, { useEffect, useState } from 'react';
import { Button, Text, View } from 'react-native';
import { styles } from './Welcome.style';
import Equipo from '../../classes/equipo';
import SupabaseService from '../../lib/supabase';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Persona from '../../classes/persona';
import Partido from '../../classes/partido';
import GameItem from './Welcome/GameItem';
import { Title } from 'react-native-paper';


//TENDRIA QUE MOSTRAR UN PARTIDO PROXIMO (LO VAMOS A HARDCODEAR AL PARTIDO PARA MOSTRAR EJEMPLO)
const Welcome = () => {
    const [teams, setTeams] = useState<Equipo[] | null>([]);
    const [partidos, setPartidos] = useState<Partido[] | null>([]);
    const [isLoad, setLoad] = useState(false);
    const supabaseService = new SupabaseService();
    
    useEffect(() => {
        if(!isLoad){
            getPartido()
            setLoad(true)
        }
    }, [])

    async function getPartido() {
        const tPartidos: Partido[]= [];
        var person = await GetPerson()
        if(person){
            var equiposLocales = await supabaseService.getEquipoByJugadorId(person.id as number)
            setTeams(equiposLocales);
            if(equiposLocales){
                await Promise.all(
                    equiposLocales.map(async x => {
                            var temp = await supabaseService.getGameByEquipoId(x.id as number);
                            console.log("temp")
                            console.log(temp)
                            if(temp && temp?.length > 0){
                                for (const partido of temp) {
                                    tPartidos.push(partido);
                                }
                            }
                        })
                )
            }
            setPartidos(tPartidos)
        }   
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
    <View style={styles.view} >
        <Title style={styles.pageTitle}>Futuros Partidos</Title>
       {partidos !== null && partidos.length > 0 ? (
        partidos.map((item, index) => (
            <GameItem key={index} idLocal={item.idEquipoLocal} idVisitante={item.idEquipoVisitante} fecha={item.fecha} />
        ))
        ) : (
        <>
            <Text style={styles.title}>No tiene partidos que asistir</Text>
            <Text style={styles.subtext}>Aquí aparecerán sus próximos partidos</Text>
        </>
        )} 
    </View>
);
}

export default Welcome