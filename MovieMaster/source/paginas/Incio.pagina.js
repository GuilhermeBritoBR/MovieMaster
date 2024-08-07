import {StatusBar,  View } from 'react-native';
//componentes importados para a estruturação do aplicativo
import Header from '../componentes/estruturais/Header.componente.js';
//estilizações importadas
import { ViewCentralCorpoDoAPP, ViewPrincipal } from '../estilos/EstilosEstruturais.estilos.js';
import Footer from '../componentes/estruturais/Footer.componente.js';
//não remover status bar, para manter header bonito
//importando hook
import { useState } from 'react';
//importando o menu que vai aparecer ao clicar
import Menu from '../componentes/estruturais/Menu.componente.js';
//importando para a navegação
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';

export default function Inicio() {
    const Drawer = createDrawerNavigator();
    const navigation = useNavigation();
    //visibilidade do modal, aqui estamos controlando a tal por uma use state
    const [visibilidadeModal, setandoVisibilidadeModal] = useState(false);    
  return (
    <View style={ViewPrincipal.estilo}>
        {/* Não remover STATUS BAR!!!!!!!!!!!!!*/}
        <Menu visibilidadeDoModalTrueFalse={visibilidadeModal} propriedadeParaFecharModal={()=>setandoVisibilidadeModal(false)}/>
      <StatusBar backgroundColor={'#000000'}/>
      <Header ativarMenuTrueFalse={() => navigation.openDrawer()} />

      <View style={ViewCentralCorpoDoAPP.estilo}>

      </View>

    </View>
  );
}
