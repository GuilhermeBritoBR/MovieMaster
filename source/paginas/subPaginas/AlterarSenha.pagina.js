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


export default function AlterarSenha() {
  //constantes que vão receber os dados
  const [senha, setandoSenha] = useState("");
  //função
  
  //funções para alterar os dados existentes
  const AlterandoValorDoInputSenha = (novoValor)=>{
    setandoSenha(novoValor);
  }
  //verificando validade da senha em caracteres
  function VerificarCaracteres(){
    if(senha.length >= 8){
     FuncaoParaAlterarDados(senha);
    }else{
      alert("Por favor, preencha corretamente o campo, são no mínimo 8 caracteres!");
    }
  }
  //verificar valores
  async function FuncaoParaAlterarDados(senha){
    //coletando token
    const token = await AsyncStorage.getItem('@token');
    //json com os dados alterados
    const DadosAlterados = {
      senha
    };
    const config = {
      headers: {
          'Authorization': token
      }}

    try{
      await axios.put(`http://${local}:3000/UserPage/AtualizarSenhaDoUsuario`, DadosAlterados, config);
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
       <HeaderRetorno voltarApaginaAnterior={()=> navigation.goBack("")}/>
      <View style={ViewCentralCorpoDoAPP.estilo}>
     
          {/* Primeira View com os lançamentos */}
          <View style={EstilosDoInicio.ViewPrimariaQueCarregaOblocoDeLançamentos}>
            <H2 texto={"Altere suas informações pessoais"}/>
          <TextInput
          style={EstilosDoInicio.InputDeTexto}
            placeholder={"Altere sua senha.."}
            value={senha}  
            onChangeText={AlterandoValorDoInputSenha}  
          />
          
          <TouchableOpacity onPress={()=>VerificarCaracteres()}
          style={EstilosDoInicio.botaoAlterar}>
          <LinearGradient 
            colors={['#9754CB', '#6237A0']} 
            start={{ x: 0, y: 0 }}
            end={{ x: 0.68, y: 0.68 }} 
            style={EstilosDoInicio.btnDegradw}
          >
            <Text style={EstilosDoInicio.textoBotao}>Alterar senha</Text>
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