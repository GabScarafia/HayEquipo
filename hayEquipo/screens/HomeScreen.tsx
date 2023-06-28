import React, { useState } from 'react';
import { View, TextInput, Button, Alert, Pressable, Text, TouchableOpacity } from 'react-native';
import { styles } from './HomeScreen.style';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParams } from '../App';

import AsyncStorage from '@react-native-async-storage/async-storage';

const HomeScreen = () => {
    const [loged, setLoged]  = useState(false);

    const ifLoged = async() : Promise<Boolean> => {
        console.log(loged)
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

  const navigation = useNavigation<NativeStackNavigationProp<RootStackParams>>();
    return (
        <View>
            <View>
                <Text>Home</Text>
                <Button title='opciones'/>
                <Button title='perfil'/>
            </View>
        </View>
    )
}

export default HomeScreen;