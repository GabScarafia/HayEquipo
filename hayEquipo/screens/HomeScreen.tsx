import React, { useState } from 'react';
import { View, TextInput, Button, Alert, Pressable, Text, TouchableOpacity } from 'react-native';
import { styles } from './HomeScreen.style';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParams } from '../App';

import AsyncStorage from '@react-native-async-storage/async-storage';

const HomeScreen = () => {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParams>>();
    const [loged, setLoged]  = useState(false);

    const ifLoged = async() : Promise<Boolean> => {
        //console.log(loged)
        const value = await AsyncStorage.getItem('user');
        if(value != null)
        {
            setLoged(true)
        }
        else{
            setLoged(false)
            navigation.navigate("Login");
        }
        return(loged)
    }
    
    return (
        
        <View style={styles.view} >
            <Button title='opciones'/>
            <Button title='perfil'/>
        </View>
    )
}

export default HomeScreen;