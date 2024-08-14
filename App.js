import * as React from 'react';
//para a construção da navegação o container
import { NavigationContainer } from '@react-navigation/native';
//componentes do react
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
//linear para o degrade
import { LinearGradient } from "expo-linear-gradient";
//para importar icones 
import Feather from '@expo/vector-icons/Feather';
//paginas
import Inicio from './source/paginas/Incio.pagina';
import Login from './source/paginas/login.pagina';
import Usuario from './source/paginas/Usuario.pagina';

//importando as unidades responsivas do css
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

//fontes de texto
import H3 from './source/componentes/textos/h3.componente';

//O Drawer trabalha a barra lateral
import { createDrawerNavigator  } from '@react-navigation/drawer';
const Drawer = createDrawerNavigator();

export default function App() {
  
  return (
    <NavigationContainer>
      
      <Drawer.Navigator initialRouteName="inicio"
      screenOptions={{
        headerShown: false, //remove o header padrão
        drawerActiveBackgroundColor: '#242424', // poe cor preta no background dos botoes
        drawerStyle:{
          backgroundColor: '#242424', // é o background de toda a barra lateral
        },
        drawerLabelStyle: {
          fontSize: 18, // Tamanho da fonte dos itens
          fontWeight: 'regular', // Peso da fonte dos itens
          color: '#ffffff', // Cor da fonte dos itens
        }, 
      }}
      >
        

        <Drawer.Screen 
         options={{
          drawerIcon: () => (
            <Image 
              source={require('./source/arquivos/icones/home.png')} 
              style={EstilosDoDrawer.iconeImageEsuaConfiguracao} 
            />)}} name="Inicio" component={Inicio}  />
        
        <Drawer.Screen 
         options={{
          drawerIcon: () => (
            <Image 
              source={require('./source/arquivos/icones/home.png')} 
              style={EstilosDoDrawer.iconeImageEsuaConfiguracao} 
            />)}} name="Login" component={Login}  />

      </Drawer.Navigator>
    </NavigationContainer>
  );
}

//css da rota drawer
const EstilosDoDrawer = StyleSheet.create(({
  ViewiconeDoDrawer:{
    width: 24,
    height: 24,
  },
  iconeImageEsuaConfiguracao:{
    width: 32,
    height: 32,
  },
  ViewPrincipal:{
    justifyContent: 'center',
    alignItems: 'center',
    width: wp('100%'),
    height: wp('20%'), 
},
}))