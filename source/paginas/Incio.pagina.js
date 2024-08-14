import {StatusBar,  StyleSheet,  Text,  View, FlatList, ScrollView} from 'react-native';
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

//importando as unidades responsivas do css
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
//componentes importados
import CapaDoFilme from '../componentes/estruturais/CapaDoFilme.componente.js'
//fontes de texto
import H3 from '../componentes/textos/h3.componente.js';

const filmesRecebidosDaAPI = [
  {"id":3,"titulo": "Vasco" ,"capa": "https://th.bing.com/th/id/R.3fd2a5976b2bc397e1cfbb7a8fbba074?rik=1IycZos1LrB1Ew&pid=ImgRaw&r=0"},
  {"id":3,"titulo": "Vasco" ,"capa": "https://th.bing.com/th/id/R.3fd2a5976b2bc397e1cfbb7a8fbba074?rik=1IycZos1LrB1Ew&pid=ImgRaw&r=0"},
  {"id":3,"titulo": "Vasco" ,"capa": "https://th.bing.com/th/id/R.3fd2a5976b2bc397e1cfbb7a8fbba074?rik=1IycZos1LrB1Ew&pid=ImgRaw&r=0"},
  {"id":3,"titulo": "Vasco" ,"capa": "https://th.bing.com/th/id/R.3fd2a5976b2bc397e1cfbb7a8fbba074?rik=1IycZos1LrB1Ew&pid=ImgRaw&r=0"},
  {"id":3,"titulo": "Vasco" ,"capa": "https://th.bing.com/th/id/R.3fd2a5976b2bc397e1cfbb7a8fbba074?rik=1IycZos1LrB1Ew&pid=ImgRaw&r=0"},
  {"id":3,"titulo": "Vasco" ,"capa": "https://th.bing.com/th/id/R.3fd2a5976b2bc397e1cfbb7a8fbba074?rik=1IycZos1LrB1Ew&pid=ImgRaw&r=0"},
  {"id":3,"titulo": "Vasco" ,"capa": "https://th.bing.com/th/id/R.3fd2a5976b2bc397e1cfbb7a8fbba074?rik=1IycZos1LrB1Ew&pid=ImgRaw&r=0"},
  {"id":3,"titulo": "Vasco" ,"capa": "https://th.bing.com/th/id/R.3fd2a5976b2bc397e1cfbb7a8fbba074?rik=1IycZos1LrB1Ew&pid=ImgRaw&r=0"},
  {"id":3,"titulo": "Vasco" ,"capa": "https://th.bing.com/th/id/R.3fd2a5976b2bc397e1cfbb7a8fbba074?rik=1IycZos1LrB1Ew&pid=ImgRaw&r=0"},
  {"id":3,"titulo": "Vasco" ,"capa": "https://th.bing.com/th/id/R.3fd2a5976b2bc397e1cfbb7a8fbba074?rik=1IycZos1LrB1Ew&pid=ImgRaw&r=0"},
  {"id":3,"titulo": "Vasco" ,"capa": "https://th.bing.com/th/id/R.3fd2a5976b2bc397e1cfbb7a8fbba074?rik=1IycZos1LrB1Ew&pid=ImgRaw&r=0"},
  {"id":3,"titulo": "Vasco" ,"capa": "https://th.bing.com/th/id/R.3fd2a5976b2bc397e1cfbb7a8fbba074?rik=1IycZos1LrB1Ew&pid=ImgRaw&r=0"},

]
console.log(filmesRecebidosDaAPI[1].capa);
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
      {/* Flat list para carregar toda a página home */}
      <View style={ViewCentralCorpoDoAPP.estilo}>
      <ScrollView>
          {/* Primeira View com os lançamentos */}
          <View style={EstilosDoInicio.ViewPrimariaQueCarregaOblocoDeLançamentos}>

          <H3 texto={"Lançamentos"}/>
          {/* A flat List é chamada posteriormente sem o texto para não renderizar o mesmo várias vezes */}

          <FlatList style={EstilosDoInicio.EstilizacaoDaFlatList}
          data={filmesRecebidosDaAPI}
          keyExtractor={(dadosExtraidos ) => dadosExtraidos.id}
          horizontal={true}
          renderItem={({item}) => (
            <View style={EstilosDoInicio.ViewQueSeguraInternamenteAflatList}>
              <CapaDoFilme propriedadeParaReceberAcapaDoFilme={item.capa} tamonhoMenorOuMaiorrStingVazia={""}/>
            </View>
          )}
          />
          
          
          </View>
          
          {/* Segunda View com outra seção */}
          <View style={EstilosDoInicio.ViewPrimariaQueCarregaOblocoDeLançamentos}>
          <H3 texto={"Guerra"}/>
          <FlatList style={EstilosDoInicio.EstilizacaoDaFlatList}
          data={filmesRecebidosDaAPI}
          keyExtractor={(dadosExtraidos ) => dadosExtraidos.id}
          horizontal={true}
          renderItem={({item}) => (
            <View style={EstilosDoInicio.ViewQueSeguraInternamenteAflatList}>
              <CapaDoFilme propriedadeParaReceberAcapaDoFilme={item.capa} tamonhoMenorOuMaiorrStingVazia={"Menor"}/>
            </View>
          )}
          />
          </View>   
          <View style={EstilosDoInicio.ViewPrimariaQueCarregaOblocoDeLançamentos}>
          <H3 texto={"Ação"}/>
          <FlatList style={EstilosDoInicio.EstilizacaoDaFlatList}
          data={filmesRecebidosDaAPI}
          keyExtractor={(dadosExtraidos ) => dadosExtraidos.id}
          horizontal={true}
          renderItem={({item}) => (
            <View style={EstilosDoInicio.ViewQueSeguraInternamenteAflatList}>
              <CapaDoFilme propriedadeParaReceberAcapaDoFilme={item.capa} tamonhoMenorOuMaiorrStingVazia={"Menor"}/>
            </View>
          )}
          />
          </View>   
      
      </ScrollView>
      </View>
      

    </View>
  );
}

const EstilosDoInicio = StyleSheet.create(({
  ViewPrimariaQueCarregaOblocoDeLançamentos:{
    flex:3,
    paddingTop: 20,
    paddingLeft: 20,
    backgroundColor: '#1A1A1A',
    justifyContent: 'center',
    
  },
  BlocoPrincipalDosLançamentos:{
    width: wp('48%'),
    height: wp('66%'),
    backgroundColor: 'purple',
    borderRadius: 20,
  },
  EstilizacaoDaFlatList:{
    flex:1,
    marginTop: 20,
  },
  ViewQueSeguraInternamenteAflatList:{
    flex: 2,
  },
}))