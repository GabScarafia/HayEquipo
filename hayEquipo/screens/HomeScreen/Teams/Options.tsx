import React, { useEffect, useState } from 'react';
import { Alert, Button, Image, Modal, TouchableOpacity, View } from 'react-native';
import { styles } from './Options.style';
import { Text } from 'react-native-paper';
import TeamItem from './TeamItem';
import Equipo from '../../../classes/equipo';
import SupabaseService from '../../../lib/supabase';
import Persona from '../../../classes/persona';
import DatePicker from 'react-native-date-picker'
import AsyncStorage from '@react-native-async-storage/async-storage';
import PlayerItem from './PlayerItem';

interface OptionsTeamProps 
{
    optionChoose: (success: number) => void;
}

const OptionsTeam : React.FC<OptionsTeamProps> = ({ optionChoose })=> {
    const [teams, setTeams] = useState<Equipo[] | null>([]);
    const [isLoad, setLoad] = useState(false);
    const supabaseService = new SupabaseService();
    const [selectedTeam, setSelectedTeam] = useState<Equipo | null>(null); // Estado para almacenar el ID del equipo seleccionado
    const [jugadores, setJugadores] = useState<Persona[] | null>([]);
    const [date, setDate] = useState(new Date())
    const [open, setOpen] = useState(false)
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
    
    async function getPlayer(id:number){
        const player = await supabaseService.getJugadores(id);
        setJugadores(player);
    }
    
    function handleOption(value: number){
        optionChoose(value); 
    }
    async function handleTeamItemPress(e: Equipo) {
        setSelectedTeam(e); // Guarda el ID del equipo seleccionado en el estado
        await getPlayer(e.id as number)
    }
    
    function handlePopUpClose() {
        setSelectedTeam(null); // Resetea el ID del equipo seleccionado para cerrar el pop-up
    }

    function handleGame(){
        setOpen(true); // Muestra el modal cuando se presiona el botón "Agregar Partido"
    }


    async function handleConfirm(date: Date) {
        await supabaseService.newGame(selectedTeam?.id as number, date)
        Alert.alert("Partido Creado")
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
            <TouchableOpacity key={index} onPress={() => handleTeamItemPress(item as Equipo)}>
                <TeamItem
                imageSource={item.escudo as string}
                name={item.nombre}
                joinable={false}
                id={item.id as number}
                />
            </TouchableOpacity>
            ))}
        </View>
         {/* Modal / Pop-up */}
        <Modal visible={selectedTeam !== null} transparent={true} animationType="fade">
            <View>
                <View style={styles.modalContent}>
                    <View style={styles.modalTeam}>
                        {selectedTeam?.escudo ? (
                            <Image source={{ uri:`data:image/png;base64,${selectedTeam?.escudo}` }} style={styles.image} />
                        ) : (
                            <Image source={require('../../../assets/default-logo.png')} style={styles.image} />
                        )} 
                        <Text style={styles.modalTextName} >{selectedTeam?.nombre}</Text>
                    </View>
                    <View style={styles.separator} /> 
                    <View style={styles.modalMid} >
                        <Text> <Text style={styles.boldText}>Puntaje: </Text> 0/10</Text>
                        <Text> <Text style={styles.boldText}>Genero:  </Text> Mixto</Text>
                    </View>
                    <View style={styles.separator} /> 
                    <View style={styles.modalMid}>
                        <Text>Jugadores: </Text>
                        {jugadores !== null && jugadores.map((item, index) => (
                        <View key={index}>
                             <PlayerItem
                                imageSource={item.image as string}
                                name={item.nombre +" "+item.apellido+" "}
                                />
                        </View>
                        ))}
                    </View>
                    <View style={styles.separator} /> 
                    <View style={styles.modalMid}>
                        <Button title='Agregar Partido' onPress={handleGame}  />
                        <DatePicker
                            modal
                            open={open}
                            date={date}
                            onConfirm={(date) => {
                                setOpen(false)
                                setDate(date)
                                handleConfirm(date)
                            }}
                            onCancel={() => {
                                setOpen(false)
                            }}
                        />
                    </View>
                    <TouchableOpacity style={styles.closeButton} onPress={handlePopUpClose}>
                        <Text style={styles.closeButtonText}>CERRAR</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>

        {/* <Modal visible={isModalVisible} transparent={true} animationType="fade">
                <View>
                    <View style={styles.modalDateContent}>
                    <DatePicker
                        modal
                        open={open}
                        date={date}
                        onConfirm={(date) => {
                            setOpen(false)
                            setDate(date)
                            handleConfirm()
                        }}
                        onCancel={() => {
                            setOpen(false)
                        }}
                    />
                    <Button title="Confirmar" onPress={()=>setOpen(true)} />
                    <Button title="Cancelar" onPress={handleCancel} />
                    </View>
                </View>
            </Modal> */}
    </View>
);
}

export default OptionsTeam