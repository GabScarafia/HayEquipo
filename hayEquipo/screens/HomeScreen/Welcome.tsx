import React, { useEffect, useState } from 'react';
import { Button, Image, Modal, Text, TouchableOpacity, View } from 'react-native';
import { styles } from './Welcome.style';
import Equipo from '../../classes/equipo';
import SupabaseService from '../../lib/supabase';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Persona from '../../classes/persona';
import Partido from '../../classes/partido';
import GameItem from './Welcome/GameItem';
import { Title } from 'react-native-paper';
import dayjs from 'dayjs';
import PlayerItem from './Teams/PlayerItem';


//TENDRIA QUE MOSTRAR UN PARTIDO PROXIMO (LO VAMOS A HARDCODEAR AL PARTIDO PARA MOSTRAR EJEMPLO)
const Welcome = () => {
    const [teams, setTeams] = useState<Equipo[] | null>([]);
    const [partidos, setPartidos] = useState<Partido[] | null>([]);
    const [isLoad, setLoad] = useState(false);
    const supabaseService = new SupabaseService();
    const [selectedPartido, setSelectedPartido] = useState<Partido | null>(null); // Estado para almacenar el ID del equipo seleccionado
    const [equipoLocal, setEquipoLocal] = useState<Equipo| null>(null);
    const [equipoVisitante, setEquipoVisitante] = useState<Equipo| null>(null);
    var formattedDate = dayjs(selectedPartido?.fecha).format("MM/DD/YYYY HH:mm"); // 03/19/2022
    const [jugadoresLocal, setJugadoresLocal] = useState<Persona[] | null>([]);
    const [jugadoresVisitante, setJugadoresVisitante] = useState<Persona[] | null>([]);
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
    async function handleGameItemPress(p: Partido) {
        setSelectedPartido(p); // Guarda el ID del equipo seleccionado en el estado
        await getEquipos(p);
        formattedDate = dayjs(selectedPartido?.fecha).format("MM/DD/YYYY HH:mm"); 
    }
    function handlePopUpClose() {
        setSelectedPartido(null); // Resetea el ID del equipo seleccionado para cerrar el pop-up
    }

    async function getEquipos(p:Partido){
        const local = await supabaseService.getEquipoById(p.idEquipoLocal);
        const visitante = await supabaseService.getEquipoById(p.idEquipoVisitante);
        setEquipoLocal(local as Equipo);
        setEquipoVisitante(visitante as Equipo);
        const playerL = await supabaseService.getJugadores(p.idEquipoLocal);
        setJugadoresLocal(playerL);
        const playerV = await supabaseService.getJugadores(p.idEquipoVisitante);
        setJugadoresVisitante(playerV);
    }

return (
    <View style={styles.view} >
        <Title style={styles.pageTitle}>Futuros Partidos</Title>
       {partidos !== null && partidos.length > 0 ? (
        partidos.map((item, index) => (
            <TouchableOpacity key={index} onPress={() => handleGameItemPress(item as Partido)}>
                <GameItem key={index} idLocal={item.idEquipoLocal} 
                            idVisitante={item.idEquipoVisitante} 
                            fecha={item.fecha} />
            </TouchableOpacity>
        ))
        ) : (
        <>
            <Text style={styles.title}>No tiene partidos que asistir</Text>
            <Text style={styles.subtext}>Aquí aparecerán sus próximos partidos</Text>
        </>
        )}
         <Modal visible={selectedPartido !== null} transparent={true} animationType="fade">
            <View>
                <View style={styles.modalContent}>
                    <View style={styles.modalTeam}>
                        <View style={styles.escudos}>
                            {equipoLocal?.escudo ? (
                                <Image source={{ uri:`data:image/png;base64,${equipoLocal?.escudo}` }} style={styles.image} />
                            ) : (
                                <Image source={require('../../assets/default-logo.png')} style={styles.image} />
                            )} 
                            {equipoVisitante?.escudo ? (
                                <Image source={{ uri:`data:image/png;base64,${equipoVisitante?.escudo}` }} style={styles.image} />
                            ) : (
                                <Image source={require('../../assets/default-logo.png')} style={styles.image} />
                            )} 
                        </View>
                        <Text style={styles.modalTextName} >{equipoLocal?.nombre} vs {equipoVisitante?.nombre}</Text>
                    </View>
                    <View style={styles.separator} /> 
                    <View style={styles.modalMid} >
                        <Text> <Text style={styles.boldText}>Fecha: </Text> {formattedDate}hrs</Text>
                    </View>
                    <View style={styles.separator} /> 
                    <View style={styles.modalMid}>
                        <Text>Jugadores: </Text>
                        <View style={styles.modalPlayer}>
                            <View style={styles.modalPlayerChild}>
                                <Text>Local: </Text>
                                {jugadoresLocal !== null && jugadoresLocal.map((item, index) => (
                                <View key={index}>
                                    <PlayerItem
                                        imageSource={item.image as string}
                                        name={item.nombre +" "+item.apellido+" "}
                                        />
                                </View>
                                ))}
                            </View>
                            <View style={styles.modalPlayerChild}>
                                <Text>Visitante: </Text>
                                    {jugadoresVisitante !== null && jugadoresVisitante.map((item, index) => (
                                    <View key={index}>
                                        <PlayerItem
                                            imageSource={item.image as string}
                                            name={item.nombre +" "+item.apellido+" "}
                                            />
                                    </View>
                                    ))}
                            </View>
                        </View>
                    </View>
                    {/* <View style={styles.separator} />  */}
                    <TouchableOpacity style={styles.closeButton} onPress={handlePopUpClose}>
                        <Text style={styles.closeButtonText}>CERRAR</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    </View>
);
}

export default Welcome