import React, { useState } from 'react';
import { Button, Text, View } from 'react-native';
import { styles } from '../HomeScreen.style';


//TENDRIA QUE MOSTRAR UN PARTIDO PROXIMO (LO VAMOS A HARDCODEAR AL PARTIDO PARA MOSTRAR EJEMPLO)
const Welcome = () => {
return (
    <View style={styles.view} >
        <Text>BIENVENIDO</Text>
        {/* <Button title='opciones'/>
        <Button title='perfil'/> */}
    </View>
);
}

export default Welcome