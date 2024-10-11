import React from 'react';
import { useState, useEffect } from 'react';
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
import { local } from '../funçoes/IpOuLocalhost.js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

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
    headerImage: {
        width: 30,
        height: 30,
        borderRadius: 60, // deixa a imagem redonda
        marginRight: 2, 
      },
}));
    
 const Amigos = () =>{
    const [data, setData] = useState([]);
    const buscarPostagens = async()=>{
        const token = await AsyncStorage.getItem("@token");
    const config = {
      headers: {
        Authorization: `${token}`,
      },};
       
        
                try {
                   const resposta = await axios.get(`http://${local}:3000/Amigos/BuscarPostsDosMeusAmigos`,config);
                   setData(resposta.data.publicacoes);
                } catch (err) {
                    console.log(`Segue o erro: ${err}`);
                }
                console.log("dados buscados");
            
    }
    useEffect(()=>{
         buscarPostagens();
    },[data])
    const Corpo = ({item})=>(
                <View style={EstruturaDaPaginaDosAmigos.ViewQueCentralizaCadaPostagem}>
                    <View style={EstruturaDaPaginaDosAmigos.AreaSuperior}>
                    
                    <View style={EstruturaDaPaginaDosAmigos.SecaoEsquerda}>
                    <Image
            source={
            {uri: `http://${local}:3000/${item.foto}`}
            }
            style={EstruturaDaPaginaDosAmigos.headerImage}
          />
                    <Text style={[EstruturaDaPaginaDosAmigos.Nome,{textAlign: 'center', marginRight: 10}]}>{item.Nomefilme}</Text>
                        <MenorCapaDoFilme 
                        tamonhoMenorOuMaiorrStingVazia={"Menor"}
                        propriedadeParaReceberAcapaDoFilme={item.capaDoFilme}/>
        
                    </View>

                    <View style={EstruturaDaPaginaDosAmigos.SecaoDireita}>
                    
                        <View style={EstruturaDaPaginaDosAmigos.UsuarioEsuasInformacoes}>
                            
                            {/* Informações do usuário */} 
                            <Text style={EstruturaDaPaginaDosAmigos.Nome}>{item.autor}</Text>
                            <Text style={[EstruturaDaPaginaDosAmigos.Nome,{fontSize: 10}]}>{item.data_postagem}</Text>
                        </View>
                        <View style={EstruturaDaPaginaDosAmigos.ComentarioDoUsuarioView}>
                            {/* Comentário do usuário */}
                            <Text style={EstruturaDaPaginaDosAmigos.comentarioEstilizacao}>{item.texto}</Text> 
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
        keyExtractor={item => item.id.toString()}/>
        </View>
        </View>
    )
}

export default Amigos;
