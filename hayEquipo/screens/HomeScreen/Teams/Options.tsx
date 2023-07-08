import React, { useEffect, useState } from 'react';
import { Button, View } from 'react-native';
import { styles } from './Options.style';
import { Text } from 'react-native-paper';
import TeamItem from './TeamItem';
import Equipo from '../../../classes/equipo';
import SupabaseService from '../../../lib/supabase';
import Persona from '../../../classes/persona';

import AsyncStorage from '@react-native-async-storage/async-storage';

interface OptionsTeamProps 
{
    optionChoose: (success: number) => void;
}

const OptionsTeam : React.FC<OptionsTeamProps> = ({ optionChoose })=> {
    const [teams, setTeams] = useState<Equipo[] | null>([]);
    const [isLoad, setLoad] = useState(false);
    const supabaseService = new SupabaseService();
    
    useEffect(() => {
        if(!isLoad){
            getEquipos()
            setLoad(true)
        }
    }, [])

    async function getEquipos() {
        console.log(teams)
        if (teams && teams.length > 0) {
            return; // Si ya tienes equipos cargados, no hagas nada
        }
        var person = await GetPerson()
        if(person){
            var equipos = await supabaseService.getEquipoByJugadorId(person.id as number)
            setTeams(equipos);
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
    
    function handleOption(value: number){
        optionChoose(value); 
    }

return (
    <View style={styles.view}>
        <View style={styles.startView}>
            <Button title="Buscar un equipo" onPress={()=>handleOption(2)} />
            <Button title="Crear nuevo equipo" onPress={()=>handleOption(1)} />
        </View>
        <View style={styles.separator} /> 
        <View style={styles.bottomView}>
            <Text>Tus Equipos</Text> 
            {teams !== null && teams.map((item, index) => (
                <TeamItem key={index} imageSource={item.escudo as string} name={item.nombre} joinable={false} id={item.id as number}/>
            ))} 
        </View>
    </View>
);
}

export default OptionsTeam