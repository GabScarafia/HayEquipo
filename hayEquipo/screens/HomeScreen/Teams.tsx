import React, { useState } from 'react';
import { Button, View } from 'react-native';
import { styles } from '../HomeScreen.style';
import { Text } from 'react-native-paper';
import SearchTeam from './Teams/Search';
import CreateTeam from './Teams/Create';

const Teams = () => {
    const [mode, setMode] = useState(0);
    
    const handleChildValue = (value: boolean) => {
        // Do something with the value received from the child component
        console.log('Received value from child:', value);
      };
    
return (
    <View style={styles.view} >
        <CreateTeam onTeamCreated={handleChildValue} />
        {/* Search component*/}
        {/*If search nulo, muestro boton Create component*/}
        
    </View>
    //<SearchTeam>
    //<CreateTeam>
);
}

export default Teams