import React, {useState} from 'react';
import { Button, View, TextInput, Image } from 'react-native';
// import { styles } from '../HomeScreen.style';
import { Text, Title } from 'react-native-paper';
import { styles } from './Create.style';
import ImagePicker, { Asset,launchImageLibrary, ImagePickerResponse } from 'react-native-image-picker';
import InputComponent from '../../../component/InputComponent';
import Persona from '../../../classes/persona';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SupabaseService from '../../../lib/supabase';
import Equipo from '../../../classes/equipo';


interface CreateTeamProps 
{
    onTeamCreated: (success: boolean) => void;
}

//EN EL HANDLE DEL SAVE, tengo que "insert" el equipo como tal con nombre/escudo/idAdmin y a su vez crear el JugadorEquipo con jugadorid(idAdmin) y equipoId(del recien insertado)
const CreateTeam : React.FC<CreateTeamProps> = ({ onTeamCreated })=> {
    const supabaseService = new SupabaseService();

    const [logoImage, setLogoImage] = useState<string | null>(null);
    const [nombre, setNombre] = useState('');
    const [nombreError, setNombreError] = useState<string | null>(null);
    
    const GetData = async() => {  /*: (Promise<Boolean>)*/
        const value = await AsyncStorage.getItem('user');
        if(value != null)
        {
            const data = JSON.parse(value)
            const { id, nombre, apellido, dni, genero, User, image } = data;
            return new Persona(id, nombre,apellido,dni,genero,User,image)
        }
    }
    const handleChooseLogo = () => {
        launchImageLibrary({mediaType: 'photo', includeBase64: true}, (response: ImagePickerResponse) => {
            if (!response.didCancel && response.assets && response.assets.length > 0) {
              const image: Asset = response.assets[0];
              const photito = image.base64 || null
              setLogoImage(photito);
            }
        });
        };
    const handleNameChange = (text: string) => {
        setNombre(text);
        // Perform any validation and set the error message if necessary
        setNombreError(text.trim() === '' ? 'Este Campo no puede estar Vacio' : null);
        };

    async function handleSave(){
        nombre.trim() === '' ? setNombreError('Este Campo no puede estar Vacio') : setNombreError("");
        if(nombreError == null && nombre != ''){
            var persona = await GetData()
            if(persona){
                const equipo = new Equipo(null, nombre,logoImage, persona.id as number)
                var result = await supabaseService.newTeam(equipo)
                onTeamCreated(result as boolean);
            }
        }
    }
return (
    <View style={styles.view}>
        {/*Nombre, Poder subir un Escudo*/}
        <Title style={styles.title}>Crear equipo</Title>
        <InputComponent
            label="Nombre"
            value={nombre}
            onChangeText={handleNameChange}
            error={nombreError}
        />
        <Button title="Seleccionar logotipo" onPress={handleChooseLogo} />

        {/* {logoImage !== '' && <Image source={{  uri:`data:image/png;base64,${logoImage}`}} style={styles.logo}/> } */}
        {logoImage ? (
            <Image source={{ uri:`data:image/png;base64,${logoImage}` }} style={styles.logo} />
        ) : (
            <Image source={require('../../../assets/default-logo.png')} style={styles.logo} />
        )} 
        <Button title="Crear" onPress={handleSave}></Button>
        
    </View>
    //<SearchTeam>

);
}

export default CreateTeam