import React, { useState } from 'react';
import { Button, View, Alert } from 'react-native';
import { Text } from 'react-native-paper';
import SearchTeam from './Teams/Search';
import CreateTeam from './Teams/Create';
import OptionsTeam from "./Teams/Options"

const Teams = () => {
    const [mode, setMode] = useState(0);
    
    const handleCreate = () => {
        // Do something with the value received from the child component
        Alert.alert('Equipo Creado Correctamente');  
        setMode(0);
      };
    
    const handleOption = (value : number) => {
        setMode(value);
    }
return (

    <View>
        {mode === 0 && <OptionsTeam optionChoose={handleOption}/>}
        {mode === 1 && <CreateTeam onTeamCreated={handleCreate} back={handleOption} />}
        {mode === 2 && <SearchTeam />}
    </View>
);
}

export default Teams