import React, { useState } from 'react';
import { View, TextInput, Button, Alert, Pressable, Text, TouchableOpacity } from 'react-native';
import { styles } from './HomeScreen.style';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParams } from '../App';

const HomeScreen = () => {
    
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