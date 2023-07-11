import React, { useState, useRef } from 'react';
import { Button, Text, View, FlatList } from 'react-native';
import { styles } from './Search.style';
import BackButton from '../../../component/BackButton';
import { Title } from 'react-native-paper';
import InputComponent from '../../../component/InputComponent';
import Equipo from '../../../classes/equipo';
import SupabaseService from '../../../lib/supabase';
import TeamItem from './TeamItem';

interface CreateTeamProps 
{
    // onTeamCreated: (success: boolean) => void;
    back: (success: number) => void;
}
const SearchTeam : React.FC<CreateTeamProps> = ({ back })=>  {
    const [data, setData] = useState<Equipo[] | null>([]);
    const [query, setQuery] = useState("")
    const [searching, setSearching] = useState(false);
    const supabaseService = new SupabaseService();
    const timerRef = useRef<NodeJS.Timeout | null>(null);
    
    const handleBackButton = () => {
        back(0)
    };  

    const handleQueryChange = (text: string) => {
        setQuery(text)
        if (searching) {
            clearTimeout(timerRef.current as NodeJS.Timeout);
          }
          if (text !== '') {
            timerRef.current = setTimeout(() => {
              handleSearch(text);
            }, 500);
            setSearching(true);
          } else {
            setSearching(false);
          }
    };      
    
    const handleSearch = async (text: string) => {
        const equipos = await supabaseService.getEquiposByNombre(text);
        console.log("setData")
        setData(equipos);
        setSearching(false);
    };

return (
    <View style={styles.view} >
        <BackButton onPress={handleBackButton}/>
        <Title style={styles.title}>Buscar equipo</Title>
        <InputComponent
            label="Nombre"
            value={query}
            onChangeText={handleQueryChange}
            error={null}
        />
        {/* <Button title="Buscar" onPress={handleSearch} />  */}
        {data !== null && (query !== '' ? (data.length > 0 ? (data.map((item, index) => (
            <TeamItem key={index} imageSource={item.escudo as string} name={item.nombre} joinable={true} id={item.id as number}  />
            ))
            ) : (
              <Text>No se encontraron resultados</Text>
            )
          ) : null)}
    </View>
);
}

export default SearchTeam