import React from 'react';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Welcome  from "./Welcome"
import Profile  from "./Profile"
import Teams  from "./Teams"
const BottomTabs = () => {
    const Tab = createBottomTabNavigator();
    return (
        <Tab.Navigator  screenOptions={{ headerShown: false }}>
            <Tab.Screen name = "Bienvenido" component={ Welcome }   options={{
                                                                    tabBarLabel: 'Inicio',
                                                                    tabBarIcon: ({ color }) => (
                                                                        <MaterialCommunityIcons name="home" color={color} size={26} />
                                                                    ),
                                                                    }} />
            <Tab.Screen  name = "Equipo" component={ Teams } options={{ unmountOnBlur: true ,
                                                              tabBarLabel: 'Equipos',
                                                              tabBarIcon: ({ color }) => (
                                                                <MaterialCommunityIcons name="account-group" color={color} size={26} />
                                                              ),
                                                              }} />
            <Tab.Screen name = "Perfil" component={ Profile } options={{
                                                              tabBarLabel: 'Perfil',
                                                              tabBarIcon: ({ color }) => (
                                                                <MaterialCommunityIcons name="account" color={color} size={26} />
                                                              ),
                                                              }} />
        </Tab.Navigator>

    )

}

export default BottomTabs