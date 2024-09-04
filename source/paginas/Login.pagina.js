import React, { useState } from 'react';
import { View, TextInput, ImageBackground, StyleSheet, Text, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
//axios
import axios from 'axios';
//para o salvalmento dos tokens
import { SalvarNome } from '../funçoes/SalvarNomeDoUsuario.funcao';
import { SalvarToken } from '../funçoes/SalvarToken.funcao';
//navegação entre páginas
 //ip ou localhost
  //ip da rede celular celular 192.168.35.157
  import { useNavigation } from '@react-navigation/native';
  import { local } from '../funçoes/IpOuLocalhost';
export default function Login() {
  //para a navegação
  const navigation = useNavigation("");
 
  //constante dos dados
  const [emailEnome, setandoEmailEnome]= useState("");
  const [senha, setandoSenha] = useState("");
  function VerificarSeTemDados(){
    if(emailEnome.length >= 3 && senha.length >= 5  ){
      //no minino 3 letras em um nome e 8 caracteres na senha
      console.log(`Segue o valor dos dados das constantes NomeOUEmail: ${emailEnome}, Senha ${senha}`);
      RealizarLogin(emailEnome, senha);
    }else{
      alert("Por gentileza, preencha os campos corretamente!");
    }
  } 
   //sistema de login de dados
  //vamos conectar com a api externa para o funcionamento primario
  //usaremos o axios como intermediario, como o fetch do js
  const RealizarLogin = async (emailEnome, senha) =>{
    //jsonficando os dados para a transferencia via axios e posterirmente ate api
    const dadosParaEnviar = {
      emailEnome, senha,
    };
    try{
    const resposta = await axios.post(`http://${local}:3000/loginPage/login`, dadosParaEnviar);
    const {token, nomeResposta} = resposta.data;
    //salva token
    await SalvarToken(token);
    await SalvarNome(nomeResposta);
    //enviar para a pagina inicio
    
    alert("Login realizado! Bem vindo ao MovieMaster!");
    navigation.navigate("Inicio");
    }catch(err){
      if (err.response && err.response.status === 401) {
        alert("Dados incorretos! Tente novamente!");
      } else {
        alert("Erro ao se logar!");
        console.log(`Segue o erro ao se logar: ${err}`);
      }
    }
    
  }
  return (
    //imagem de fundo com degrade//
    <View style={styles.container}>
      <ImageBackground
        source={require('../arquivos/imagensDeFundo/iluminado.jpg')}
        style={styles.image}
      >
        <LinearGradient
          colors={['rgba(0,0,0,0)', 'rgba(0,0,0,0.9)']}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
          style={styles.gradient}
        >
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Entre no Movie Master!</Text>
          </View>
        </LinearGradient>
      </ImageBackground>

      <KeyboardAvoidingView
        style={styles.areadoinput}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <TextInput 
          style={styles.input}
          placeholder='Nome de Usuário/Email'
          keyboardType='email-address'
          placeholderTextColor='white'
          value={emailEnome}
          onChangeText={(textoDigitado)=>setandoEmailEnome(textoDigitado)}
        />
        <TextInput 
          style={styles.input}
          placeholder='Senha'
          secureTextEntry
          placeholderTextColor='white'
          value={senha}
          onChangeText={(textoDigitado)=>setandoSenha(textoDigitado)}
        />
        <TouchableOpacity style={styles.button} onPress={() => VerificarSeTemDados()}>
          <LinearGradient 
            colors={['#9754CB', '#6237A0']} 
            start={{ x: 0, y: 0 }}
            end={{ x: 0.68, y: 0.68 }} 
            style={styles.btnDegradw}
          >
            <Text style={styles.buttonText}>Entrar</Text>
          </LinearGradient>
        </TouchableOpacity>
       
        <TouchableOpacity style={styles.btnredirecionamento} onPress={() => navigation.navigate("Cadastro")}>
          <Text style={styles.buttonText}>Cadastro</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  gradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '40%',  
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleContainer: {
    height: 100, // Fixando a altura do contêiner do título
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    color: 'white',
    textAlign: 'center',
  },
  areadoinput: {
    width: '100%',
    height: '40%',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20, 
    backgroundColor: 'black',
    borderBottomWidth: 1,
    borderBottomColor: '#1a1a1a',
  },
  input: {
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
  button: {
    width: 250,
    borderRadius: 15,
    backgroundColor: '#6237A0',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  btnredirecionamento: {
    paddingTop: 20,
    paddingBottom:0,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  btnDegradw:{
    width: 250,
    backgroundColor: '#6237A0',
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    borderRadius: 15,
  },
});