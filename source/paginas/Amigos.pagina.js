import React from 'react';
import { useState } from 'react';
import {View, FlatList, Image, StyleSheet, Text} from 'react-native';
//componentes importados
import Header from '../componentes/estruturais/Header.componente.js';
//textos
import H3 from '../componentes/textos/h3.componente';
//capas dos filmes
import CapaDoFilme from '../componentes/estruturais/CapaDoFilme.componente';
//CSS IMPORTADOS
import { ViewPrincipal, ViewCentralCorpoDoAPP } from '../estilos/EstilosEstruturais.estilos';
//NAVEGACAO
import { useNavigation } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
//barra do celulaer notificacoes
import { StatusBar } from 'react-native';
//matrix falsa de dados
//porcentagem
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import MenorCapaDoFilme from '../componentes/estruturais/MenorCapaFilme.componente.js';
import { TouchableOpacity } from 'react-native-gesture-handler';
//icones
import AntDesign from '@expo/vector-icons/AntDesign';
const data = [
    {
      id: '1',
      user: 'Neymar',
      comment: 'Eliud Kipchoge (Kapsisiywa, 5 de novembro de 1984) é um fundista queniano, bicampeão olímpico e campeão mundial especializado em provas de pista de longas distâncias e na maratona, e vencedor das ',
      filme: 'https://th.bing.com/th/id/OIP.iAf-VzZLAZXHOb2HFuP8dgHaLH?rs=1&pid=ImgDetMain',
      Nomefilme: 'Vingadores',
      data: '20/08/1970',
    },
    {
      id: '2',
      user: 'Ribamar',
      comment: 'Eliud Kipchoge (Kapsisiywa, 5 de novembro de 1984) é um fundista queniano, bicampeão olímpico e campeão mundial especializado em provas de pista de longas distâncias e na maratona, e vencedor das ',
      filme: 'https://th.bing.com/th/id/OIP.iAf-VzZLAZXHOb2HFuP8dgHaLH?rs=1&pid=ImgDetMain',
      Nomefilme: 'Vingadores',
      data: '20/08/1970',
    },
    {
        id: '2',
        user: 'Gabriel',
        comment: 'Eliud Kipchoge (Kapsisiywa, 5 de novembro de 1984) é um fundista queniano, bicampeão olímpico e campeão mundial especializado em provas de pista ',
        filme: 'https://th.bing.com/th/id/OIP.iAf-VzZLAZXHOb2HFuP8dgHaLH?rs=1&pid=ImgDetMain',
        Nomefilme: 'Vingadores',
        data: '20/08/1970',
      },
      {
        id: '2',
        user: 'Benilson',
        comment: 'Eliud Kipchoge (Kapsisiywa, 5 de novembro de 1984) é um fundista queniano, bicampeão olímpico e campeão mundial especializado em provas',
        filme: 'https://th.bing.com/th/id/OIP.iAf-VzZLAZXHOb2HFuP8dgHaLH?rs=1&pid=ImgDetMain',
        Nomefilme: 'Vingadores',
        data: '20/08/1970',
      },
      {
        id: '2',
        user: 'Antonio',
        comment: 'Eliud Kipchoge (Kapsisiywa, 5 de novembro de 1984) é um fundista queniano, bicampeão olímpico e campeão mundial especializado em provas',
        filme: 'https://th.bing.com/th/id/OIP.iAf-VzZLAZXHOb2HFuP8dgHaLH?rs=1&pid=ImgDetMain',
        Nomefilme: 'Vingadores',
        data: '20/08/1970',
      },
  ];
  //
const EstruturaDaPaginaDosAmigos = StyleSheet.create(({
    ViewQueCentralizaCadaPostagem:{
        flex: 1,
        width: '100%',
        flexDirection: 'column',
        borderBottomWidth: 1,
        borderBottomColor: '#ffffff',
        border: 'solid',
    },
       SecaoEsquerda:{
        flex: 1,
    },
    SecaoDireita:{
        flex: 2,
        flexDirection: 'column',
        
    },
    comentarioEstilizacao:{
        fontSize: 13,
        color: '#ffffff',
        textAlign: 'left',
        marginLeft: 40,
    },
    ComentarioDoUsuarioView:{
        flex:3, 
    },
    UsuarioEsuasInformacoes:{
        flex: 1,
        textAlign: 'left',
        marginLeft: 40,
    },
    Nome:{
        color: '#ffffff',
        fontSize: 16,
    },
    AreaSuperior:{
        flex:10,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
    },
    AreaInferior:{
        border: 'solid',
        borderTopWidth: 1,
        borderTopColor: '#ffffff',
        flex: 1,
        flexDirection: 'row',
        width:'100%',
        
        padding: 3,
    },
    ViewIconeDeFeedBack:{
        flex:1, 
        justifyContent: 'center',
        alignItems: 'center',
        padding: 3,
        
    },
}));
    
 const Amigos = () =>{

    const Corpo = ({item})=>(
                <View style={EstruturaDaPaginaDosAmigos.ViewQueCentralizaCadaPostagem}>
                    <View style={EstruturaDaPaginaDosAmigos.AreaSuperior}>
                    <View style={EstruturaDaPaginaDosAmigos.SecaoEsquerda}>
                    <Text style={[EstruturaDaPaginaDosAmigos.Nome,{textAlign: 'center', marginRight: 10}]}>{item.Nomefilme}</Text>
                        <MenorCapaDoFilme 
                        tamonhoMenorOuMaiorrStingVazia={"Menor"}
                        propriedadeParaReceberAcapaDoFilme={item.filme}/>
        
                    </View>

                    <View style={EstruturaDaPaginaDosAmigos.SecaoDireita}>

                        <View style={EstruturaDaPaginaDosAmigos.UsuarioEsuasInformacoes}>
                            
                            {/* Informações do usuário */} 
                            <Text style={EstruturaDaPaginaDosAmigos.Nome}>{item.user}</Text>
                            <Text style={[EstruturaDaPaginaDosAmigos.Nome,{fontSize: 10}]}>{item.data}</Text>
                        </View>
                        <View style={EstruturaDaPaginaDosAmigos.ComentarioDoUsuarioView}>
                            {/* Comentário do usuário */}
                            <Text style={EstruturaDaPaginaDosAmigos.comentarioEstilizacao}>{item.comment}</Text> 
                        </View>

                    </View>
                    </View>
                    <View style={EstruturaDaPaginaDosAmigos.AreaInferior}>
                        <View style={EstruturaDaPaginaDosAmigos.ViewIconeDeFeedBack}>
                            <TouchableOpacity style={EstruturaDaPaginaDosAmigos.ViewIconeDeFeedBack}>
                            <AntDesign name="like2" size={24} color="white" />
                            </TouchableOpacity>
                        </View>
                        <View style={EstruturaDaPaginaDosAmigos.ViewIconeDeFeedBack}>
                            <TouchableOpacity style={EstruturaDaPaginaDosAmigos.ViewIconeDeFeedBack}>
                            <AntDesign name="dislike2" size={24} color="white" />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
              
    
    );
    const Drawer = createDrawerNavigator();
    const navigation = useNavigation();
    return(
        <View style={ViewPrincipal.estilo}>
        <StatusBar/>
        <Header ativarMenuTrueFalse={() => navigation.openDrawer()} />
        <View style={[ViewCentralCorpoDoAPP.estilo,{width: '100%'}]}>
        <FlatList
        data={data}
        renderItem={Corpo}
        keyExtractor={item => item.id}/>
        </View>
        </View>
    )
}

export default Amigos;
