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
        drawerInactiveTintColor: '#ffffff',
        drawerActiveTintColor: '#ffffff',
        headerShown: false, 
        drawerActiveBackgroundColor: '#1C1C1C',
        drawerInactiveBackgroundColor: '#000000',
        drawerStyle:{
          backgroundColor: '#1C1C1C',
        },
        drawerLabelStyle: {
          fontSize: 18, // Tamanho da fonte dos itens
          fontWeight: 'regular', // Peso da fonte dos itens
          color: '#ffffff', // Cor da fonte dos itens
        },  
      }}
      >
        <Drawer.Screen 
        
        name="Inicio" component={Inicio} />
        
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

const EstilizaçãoBotoesDoMenu = StyleSheet.create(({
  botãoAselecionar:{
      borderBottomColor: '#ffffff',
      borderBottomWidth: 1,
      border: 'solid',
      backgroundColor: '#ffffff',
  }
}))

