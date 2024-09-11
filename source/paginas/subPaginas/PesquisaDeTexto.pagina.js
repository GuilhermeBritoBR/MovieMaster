import React, { useCallback, useRef } from 'react';
import {View, Text, StyleSheet, ScrollView, TouchableOpacity, Modal, TextInput} from 'react-native';
//css 
import { ViewPrincipal } from '../../estilos/EstilosEstruturais.estilos';
import { ViewCentralCorpoDoAPP } from '../../estilos/EstilosEstruturais.estilos';
//componentes
import Header from '../../componentes/estruturais/Header.componente.js';
//navegação
import { useNavigation } from '@react-navigation/native';
//hooks
import { useState, useEffect } from 'react';
import { StatusBar } from 'react-native';
//degrade
import { LinearGradient } from 'expo-linear-gradient';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import Fontisto from '@expo/vector-icons/Fontisto';
import AntDesign from '@expo/vector-icons/AntDesign';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Entypo from '@expo/vector-icons/Entypo';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import HeaderPesquisar from '../../componentes/estruturais/HeaderPesquisar.componente.js';
import HeaderRetornoEPesquisar from '../../componentes/estruturais/HeaderRetornoEPesquisar.componente.js';
import Matrix from '../../arquivos/Matrix_Nomes_.json'; 

export default function PesquisaDeTexto(){
    //variaveis
    const [PalavraSalvaNoHeader, setandoPalavraSalvaNoHeader] = useState("");
    const [palavraPesquisada, setandoPalavraPesquisada] = useState("");
    const [resultadosDaPesquisa, setandoResultadosDaPesquisa] = useState([]);
    const [ModalDePesquisa, setandoModalDePesquisa] = useState(false);
    const [DadosRecebidos, setandoDadosRecebidos] = useState({});
    const navigation = useNavigation();
    //função para pesquisar
    const SetarVariavelParaFiltrar = useCallback((texto) => {
        setandoPalavraSalvaNoHeader(texto);
        const resultadosFiltrados = Matrix.filter((valor) =>
          texto === "" ? valor : valor.nome.toLowerCase().includes(texto.toLowerCase())
        );
        setandoResultadosDaPesquisa(resultadosFiltrados);
      }, []);

    return(
        <View style={ViewPrincipal.estilo}>
        <HeaderRetornoEPesquisar voltarApaginaAnterior={()=> navigation.goBack("")} 
        FuncaoParaPesquisar={()=> SetarVariavelParaFiltrar(PalavraSalvaNoHeader)} VariavelDaPesquisa={PalavraSalvaNoHeader}
        setandoVariavelDePesquisa={(texto)=> setandoPalavraSalvaNoHeader(texto)}
        />
        <View style={[ViewCentralCorpoDoAPP.estilo,{width: '100%'}]}>
                <ScrollView  style={[{width: '100%'}]}>
                {resultadosDaPesquisa.map((item, index)=>(
                
                <TouchableOpacity style={[EstilosDoPesquisar.OpcaoDePesquisa]}>
                <Text style={{color: '#ffffff', fontSize: 18}} >{item.nome}</Text>
                </TouchableOpacity>
                
                ))} 
                </ScrollView>
              
                
             </View>
             </View>
        );
}

const EstilosDoPesquisar = StyleSheet.create(({
    ScrolViewParaOsGeneros:{
        flex: 1,
    },
    DivHorizontalCabeDoisBlocos:{
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',

    },
    BlocosComGenero:{
        
        width: 150,
        backgroundColor: '#ffffff',
        alignItems: 'center',
        justifyContent: 'center',
        height: 75,
        borderRadius: 15,
    },
    BlocoGenero:{
        
    },
    OpcaoDePesquisa:{
        width: '100%',
        backgroundColor: '#1A1A1A',
        justifyContent: 'center',
        alignItems: 'center',
        borderBottom: 'solid',
        borderBottomColor: '#ffffff',
        borderBottomWidth: 1,
        height: 60,
    },
    inputDePesquisa:{
        width: 200,
        height: 32,
        backgroundColor:'#ffffff',
        borderRadius: 10,
        textAlign: 'center',
    },
}))
