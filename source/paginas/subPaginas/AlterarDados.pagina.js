import {StatusBar,  StyleSheet,  Text,  View, TextInput, TouchableOpacity } from 'react-native';
//componentes importados para a estruturação do aplicativo
import Header from '../../componentes/estruturais/Header.componente.js';
//estilizações importadas
import { ViewCentralCorpoDoAPP, ViewPrincipal } from '../../estilos/EstilosEstruturais.estilos.js';
import Footer from '../../componentes/estruturais/Footer.componente.js';
//não remover status bar, para manter header bonito
//importando hook
import { useEffect, useState } from 'react';
///axios para a conexão
import axios from 'axios';
//importando as unidades responsivas do css
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
//endereço da api
import { local } from '../../funçoes/IpOuLocalhost.js';
//armazenamento local
import AsyncStorage from '@react-native-async-storage/async-storage';
//degrade
import { LinearGradient } from 'expo-linear-gradient';
import { SalvarNome } from '../../funçoes/SalvarNomeDoUsuario.funcao.js';
import H2 from '../../componentes/textos/h2.componente.js';
import { useNavigation } from '@react-navigation/native';
import HeaderRetorno from '../../componentes/estruturais/HeaderRetorno.componente.js';


export default function Usuario() {
  //constantes que vão receber os dados
  const [dadosDoUsuarioBRUTO, setandoDadosDoUsuarioBRUTO] = useState({});
  const [nome, setandoNome]= useState("");
  const [email, setandoEmail]= useState("");
  const [senha, setandoSenha] = useState("");
  //função
  async function ColetandoDadosDoUsuario(){
    //COLETANDO O TOKEN PARA ENVIAR JUNTAMENTE
    const token = await AsyncStorage.getItem('@token');
    const config = {
      headers: {
          'Authorization': token
      }
  };
    try{
        //buscando na API
        const resposta = await axios.get(`http://${local}:3000/UserPage/ColetarDadosDoUsuario`, config);
        if( resposta.status === 200){
          //setando os dados bruto
          setandoDadosDoUsuarioBRUTO(resposta.data);
          setandoEmail(resposta.data.email);
          setandoNome(resposta.data.nome);
        }
        else{
          //se retornar 0, removo o token e vou para o login
          console.log(`Token invalido`);
        }
    }catch(err){
        console.log(`Segue o erro ao buscar os dados na API ${err}`);
        alert(`Erro na aplicação, tente novamente!`);
      }
    }
  //monitoradas por um useEffect
  useEffect(()=>{
    //FUNÇÃO PARA SER RODADA 
    ColetandoDadosDoUsuario();
    //monitorando 
    console.log(`Segue os valores: ${nome, email}`);
  },[]);

  //funções para alterar os dados existentes
  const AlterandoValorDoInputNome = (novoValor)=>{
    setandoNome(novoValor);
  }
  const AlterandoValorDoInputEmail = (novoValor)=>{
    setandoEmail(novoValor);
  }
  //verificar valores
  async function FuncaoParaAlterarDados(nome, email){
    //coletando token
    const token = await AsyncStorage.getItem('@token');
    //json com os dados alterados
    const DadosAlterados = {
      nome, email
    };
    const config = {
      headers: {
          'Authorization': token
      }}

    try{
      await axios.put(`http://${local}:3000/UserPage/AtualizarDadosDoUsuario`, DadosAlterados, config);
      SalvarNome(DadosAlterados.nome);
      alert("Informações alteradas com sucesso!");
    }catch(err){
      console.log(`Segue o erro: ${err}`);
      alert("Erro! Tente novamente!");
    }
  }

  //navegação
  const navigation = useNavigation("");
    //FRONT END
  return (
    <View style={ViewPrincipal.estilo}>
       <StatusBar backgroundColor={'#000000'}/>
       <HeaderRetorno voltarApaginaAnterior={() => navigation.goBack()}/>
      <View style={ViewCentralCorpoDoAPP.estilo}>
     
          {/* Primeira View com os lançamentos */}
          <View style={EstilosDoInicio.ViewPrimariaQueCarregaOblocoDeLançamentos}>
            <H2 texto={"Altere suas informações pessoais"}/>
          <TextInput
          style={EstilosDoInicio.InputDeTexto}
            placeholder={"Altere seu nome.."}
            value={nome}  
            onChangeText={(texto)=>AlterandoValorDoInputNome(texto)}  
          />
          <TextInput
          style={EstilosDoInicio.InputDeTexto}
            placeholder={"Altere seu email.."}
            value={email}  
            onChangeText={(texto)=>AlterandoValorDoInputEmail(texto)}  
          />
          <TouchableOpacity onPress={()=>FuncaoParaAlterarDados(nome, email)}
          style={EstilosDoInicio.botaoAlterar}>
          <LinearGradient 
            colors={['#9754CB', '#6237A0']} 
            start={{ x: 0, y: 0 }}
            end={{ x: 0.68, y: 0.68 }} 
            style={EstilosDoInicio.btnDegradw}
          >
            <Text style={EstilosDoInicio.textoBotao}>Alterar dados</Text>
          </LinearGradient>
          </TouchableOpacity>
          </View>
          {/* Segunda View com outra seção */}
      </View>

    </View>
  );
}

const EstilosDoInicio = StyleSheet.create(({
  ViewPrimariaQueCarregaOblocoDeLançamentos:{
    flex:1,
    justifyContent: 'center',
    alignItems: 'center',
    
  },
  BlocoPrincipalDosLançamentos:{
    width: wp('48%'),
    height: wp('66%'),
    backgroundColor: 'purple',
    borderRadius: 20,
  },
  InputDeTexto:{
    height: 50,
    width: '100%',
    maxWidth: 350, 
    borderBottomWidth: 2, 
    borderBottomColor: 'white',
    marginVertical: 10,
    color: 'white',
    paddingHorizontal: 10,
    backgroundColor: 'transparent', 
  },
  botaoAlterar:{
    width: 250,
    borderRadius: 15,
    backgroundColor: '#6237A0',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  btnDegradw:{
    width: 250,
    backgroundColor: '#6237A0',
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    borderRadius: 15,
  },
  textoBotao:{
    color: 'white',
    fontSize: 16,
  },

}))