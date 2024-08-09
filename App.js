import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from "expo-linear-gradient";
import Feather from '@expo/vector-icons/Feather';
import Header from './source/componentes/estruturais/Header.componente'; // import your header component
import Inicio from './source/paginas/Incio.pagina';
import Login from './source/paginas/login.pagina';



      ///* <Header ativarMenuTrueFalse={() => navigation.openDrawer()} /> 
  


const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Login"
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
        
<<<<<<< HEAD:App.js
      }}>
        <Drawer.Screen name="Login" component={Login} />
=======
        name="Inicio" component={Inicio} />
>>>>>>> 45c6885d6b14316d4476ca3fe956040ed42a3f81:MovieMaster/App.js
        
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

