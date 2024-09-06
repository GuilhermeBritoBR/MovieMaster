import React from 'react';
import {View, Text, StyleSheet, ScrollView, TouchableOpacity, Modal} from 'react-native';
//css 
import { ViewPrincipal } from '../estilos/EstilosEstruturais.estilos';
import { ViewCentralCorpoDoAPP } from '../estilos/EstilosEstruturais.estilos';
//componentes
import Header from '../componentes/estruturais/Header.componente.js';
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
import HeaderPesquisar from '../componentes/estruturais/HeaderPesquisar.componente.js';
import { FlatList } from 'react-native-gesture-handler';
import HeaderRetornoEPesquisar from '../componentes/estruturais/HeaderRetornoEPesquisar.componente.js';
import Matrix from '../arquivos/Matrix_Nomes_.json'; 



export default function Pesquisar() {
    useEffect(()=>{

    },[])
    const BlocoDosGeneros = ({nomeDoGenero, iconeRespectivo, }) => (
        <TouchableOpacity style={[EstilosDoPesquisar.BlocosComGenero,{ flexDirection: 'row', margin: 15}]}>
        <LinearGradient
        style={[EstilosDoPesquisar.BlocosComGenero,{ flexDirection: 'row'}]}
        colors={['#9754CB', '#6237A0']} 
        start={{ x: 0, y: 0 }}
        end={{ x: 0.68, y: 0.68 }} 

        >
          <View style={{flex: 1.2, marginLeft: 15,}}>
        <Text style={{fontSize: 16, color: '#ffffff'}}>{nomeDoGenero}</Text>
        </View>  
        <View style={{flex: 0.8, marginRight: 10, justifyContent: 'center', alignItems: 'center'}}>
            {iconeRespectivo}
        </View>
        </LinearGradient>
        </TouchableOpacity>
);

    const navigation = useNavigation();
    //visibilidade do modal, aqui estamos controlando a tal por uma use state
    //constantes para o modal de pesquisa
    const [ModalDePesquisa, setandoModalDePesquisa] = useState(false);
    const [DadosRecebidos, setandoDadosRecebidos] = useState({});
    //função de pesquisa
    function AtivarModalDePesquisa(texto){   
            setandoModalDePesquisa(true);
    }
    //função para fechar modal de pesquisa
    function FecharModal(){
        setandoModalDePesquisa(false);
    }
    //constante para pesquisar
    const [palavraPesquisada, setandoPalavraPesquisada] = useState("");
    const FrontModalDePesquisar = (texto, dadosDaApi)=>(
        <View style={ViewPrincipal.estilo}>
        <HeaderRetornoEPesquisar voltarApaginaAnterior={()=>FecharModal()} VariavelDaPesquisa={palavraPesquisada} 
        funcaoAsetarVariavelDaPesquisa={(texto)=>setandoPalavraPesquisada(texto)}/>
        <View style={[ViewCentralCorpoDoAPP.estilo,{width: '100%'}]}>
            
                {Matrix.filter((valor)=> {
                    if(palavraPesquisada === ""){
                        return valor;
                    }else if(valor.nome.toLowerCase().includes(palavraPesquisada.toLowerCase())){
                        return valor;
                    }}
                ).map((item, index)=>(
                <View style={EstilosDoPesquisar.OpcaoDePesquisa}>
                <TouchableOpacity style={[EstilosDoPesquisar.OpcaoDePesquisa]}>
                <Text style={{color: '#ffffff', fontSize: 18}} key={index}>{item.nome}</Text>
                </TouchableOpacity>
                </View>
                ))} 
              
                
             </View>
             </View>
        )
    return(
        <View style={ViewPrincipal.estilo}>     
      <StatusBar backgroundColor={'#000000'}/>
      <HeaderPesquisar ativarMenuTrueFalse={() => navigation.openDrawer()} ativarPesquisa={(texto)=> AtivarModalDePesquisa(texto)} />
            <Modal visible={ModalDePesquisa}>
                <FrontModalDePesquisar/>
            </Modal>

            <View style={ViewCentralCorpoDoAPP.estilo}>

                    <View style={EstilosDoPesquisar.DivHorizontalCabeDoisBlocos}>
                        <BlocoDosGeneros nomeDoGenero={"Ação"} 
                        iconeRespectivo={<Fontisto name="helicopter" size={36} color="white" />}
                        />
                        <BlocoDosGeneros nomeDoGenero={"Corrida"} 
                        iconeRespectivo={<AntDesign name="car" size={36} color="white" />}
                        />              
                    </View>

                    <View style={EstilosDoPesquisar.DivHorizontalCabeDoisBlocos}>
                        <BlocoDosGeneros nomeDoGenero={"Aventura"} 
                        iconeRespectivo={<MaterialCommunityIcons name="sword" size={36} color="white" />}
                        />
                        <BlocoDosGeneros nomeDoGenero={"Guerra"} 
                        iconeRespectivo={<FontAwesome name="bomb" size={36} color="white" />}
                        />  
                    </View>

                    <View style={EstilosDoPesquisar.DivHorizontalCabeDoisBlocos}>
                        <BlocoDosGeneros nomeDoGenero={"Ficção"} 
                        iconeRespectivo={<Entypo name="rocket" size={36} color="white" />}
                        />
                        <BlocoDosGeneros nomeDoGenero={"Terror"} 
                        iconeRespectivo={<MaterialCommunityIcons name="knife" size={36} color="white" />}
                        />  
                    </View>
                    
                    <View style={EstilosDoPesquisar.DivHorizontalCabeDoisBlocos}>
                        <BlocoDosGeneros nomeDoGenero={"Drama"} 
                        iconeRespectivo={<FontAwesome6 name="sad-cry" size={36} color="white" />}
                        />
                        <BlocoDosGeneros nomeDoGenero={"Mistério"} 
                        iconeRespectivo={<AntDesign name="search1" size={36} color="white" />}
                        /> 
                    </View>
                    <View style={EstilosDoPesquisar.DivHorizontalCabeDoisBlocos}>
                        <BlocoDosGeneros nomeDoGenero={"Comédia"} 
                        iconeRespectivo={<FontAwesome5 name="laugh-squint" size={36} color="white" />}
                        />
                        <BlocoDosGeneros nomeDoGenero={"Romance"} 
                        iconeRespectivo={<AntDesign name="heart" size={36} color="white" />}
                        /> 
                    </View>

                   

                
            </View>
        </View>
    );
};

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
}))
