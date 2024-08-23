import {StatusBar,  StyleSheet,  Text,  View } from 'react-native';
//componentes importados para a estruturação do aplicativo
import Header from '../componentes/estruturais/Header.componente.js';
//estilizações importadas
import { ViewCentralCorpoDoAPP, ViewPrincipal } from '../estilos/EstilosEstruturais.estilos.js';
import Footer from '../componentes/estruturais/Footer.componente.js';
//não remover status bar, para manter header bonito
//importando hook
import { useEffect, useState } from 'react';
///axios para a conexão
import axios from 'axios';
//importando as unidades responsivas do css
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
//endereço da api
import { local } from '../funçoes/IpOuLocalhost.js';
//armazenamento local
import AsyncStorage from '@react-native-async-storage/async-storage';


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
          setandoEmail(dadosDoUsuarioBRUTO.email);
          setandoNome(dadosDoUsuarioBRUTO.nome);
          setandoSenha(dadosDoUsuarioBRUTO.senha);
          console.log(`Segue os valores: ${nome, email, senha}`);
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
  },[]);
  return (
    <View style={ViewPrincipal.estilo}>
      <View style={ViewCentralCorpoDoAPP.estilo}>
          {/* Primeira View com os lançamentos */}
          <View style={EstilosDoInicio.ViewPrimariaQueCarregaOblocoDeLançamentos}>
              <View style={EstilosDoInicio.BlocoPrincipalDosLançamentos}>
                  <Text>FILME EXEMPLO</Text>
              </View>
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
}))