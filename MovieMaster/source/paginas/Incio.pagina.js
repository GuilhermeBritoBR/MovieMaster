import {StatusBar,  View } from 'react-native';
//componentes importados para a estruturação do aplicativo
import Header from '../componentes/estruturais/Header.componente.js';
//estilizações importadas
import { ViewCentralCorpoDoAPP, ViewPrincipal } from '../estilos/EstilosEstruturais.estilos.js';
import Footer from '../componentes/estruturais/Footer.componente.js';
//não remover status bar, para manter header bonito

export default function Inicio() {
  return (
    <View style={ViewPrincipal.estilo}>
        {/* Não remover STATUS BAR!!!!!!!!!!!!!*/}
      <StatusBar backgroundColor={'#000000'}/>
      <Header/>

      <View style={ViewCentralCorpoDoAPP.estilo}>

      </View>

    <Footer/>
    </View>
  );
}
