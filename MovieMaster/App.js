import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from "expo-linear-gradient";
import Feather from '@expo/vector-icons/Feather';
import Header from './source/componentes/estruturais/Header.componente'; // import your header component
import Inicio from './source/paginas/Incio.pagina';


      ///* <Header ativarMenuTrueFalse={() => navigation.openDrawer()} /> 
  



const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="inicio"
      screenOptions={{
        headerShown: false, 
        
      }}>
        <Drawer.Screen name="Inicio" component={Inicio} />
        
      </Drawer.Navigator>
    </NavigationContainer>
  );
}


