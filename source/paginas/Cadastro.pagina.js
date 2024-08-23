import React, { useState } from 'react'; //HOOKS
import { View, TextInput, ImageBackground, StyleSheet, Text, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
//axios
import axios from 'axios';
//token funcionalidades
import { SalvarNome } from '../funçoes/SalvarNomeDoUsuario.funcao.js';
import { SalvarToken } from '../funçoes/SalvarToken.funcao.js';
//navegação entre páginas
import { useNavigation } from '@react-navigation/native';
//ip ou localhost
  //ip da rede celular celular 192.168.35.157
  import { local } from '../funçoes/IpOuLocalhost.js';
export default function Cadastro() {
  //constante para navegação
  const navigation = useNavigation("");
  
  //coletando dados do formulário
  const [nome, setandoNome] = useState("");
  const [senha, setandoSenha] = useState("");
  const [email, setandoEmail] = useState("");

  // função para verificar a procedência dos dados
  function VerificarSeTemDados() {
    if (nome.length >= 3 && senha.length >= 8) {
      // no mínimo 3 letras em um nome e 8 caracteres na senha
      console.log(
        `Segue o valor dos dados das constantes Nome: ${nome}, Senha ${senha}, Email: ${email}`
      );
      RealizarCadastro();
    } else {
      alert("Por gentileza, preencha os campos corretamente! Nome deve minimamente 3 caracteres e senha 8 caracteres");
    }
  }
  //sistema de cadastro de dados
  //vamos conectar com a api externa para o funcionamento primario
  //usaremos o axios como intermediario, como o fetch do js
  const RealizarCadastro = async()=>{
    //jsonficando os dados para a transferencia via axios e posterirmente ate api
    const dadosParaEnviar = {
      nome, email, senha,
    };
    try{
    const resposta = await axios.post(`http://${local}:3000/registerPage/cadastro`, dadosParaEnviar);
    const {token, nome } = resposta.data;
    //salva token
    await SalvarToken(token);
    await SalvarNome(dadosParaEnviar.nome);
    alert("Cadastro realizado! Bem vindo ao MovieMaster!");
    //enviar para a pagina inicio
    navigation.navigate("Inicio");

    }catch(err){
      alert("Erro ao se cadastrar!");
      console.log(`Segue o erro ao se cadastrar: ${err}`);
    }
  }

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../arquivos/imagensDeFundo/maxxxine.jpg")}
        style={styles.image}
      >
        <LinearGradient
          colors={["rgba(0,0,0,0)", "rgba(0,0,0,0.9)"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
          style={styles.gradient}
        >
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Junte-se ao Movie Master!</Text>
          </View>
        </LinearGradient>
      </ImageBackground>

      <View style={styles.areadoinput}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          keyboardType="email-address"
          placeholderTextColor="white"
          value={email}
          onChangeText={(textodigitado) => setandoEmail(textodigitado)}
        />
        <TextInput
          style={styles.input}
          placeholder="Nome de Usuário"
          keyboardType="default"
          placeholderTextColor="white"
          value={nome}
          onChangeText={(textodigitado) => setandoNome(textodigitado)}
        />
        <TextInput
          style={styles.input}
          placeholder="Senha"
          secureTextEntry
          placeholderTextColor="white"
          value={senha}
          onChangeText={(textodigitado) => setandoSenha(textodigitado)}
        />
        <TouchableOpacity
          style={styles.button}
          onPress={() => VerificarSeTemDados()}
        >
          <LinearGradient
            colors={["#9754CB", "#6237A0"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 0.68, y: 0.68 }}
            style={styles.btnDegradw}
          >
            <Text style={styles.buttonText}>Registrar</Text>
          </LinearGradient>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.btnredirecionamento}
          onPress={() => navigation.navigate("Login")}
        >
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: "center",
  },
  image: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
  },
  gradient: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: "40%",
    justifyContent: "center",
    alignItems: "center",
  },
  titleContainer: {
    height: 100,
    justifyContent: "center",
    marginTop: 50,
  },
  title: {
    fontSize: 28,
    color: "white",
    textAlign: "center",
    marginTop: 20,
  },
  areadoinput: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "black",
    borderBottomWidth: 1,
    borderBottomColor: "#1a1a1a",
  },
  input: {
    height: 50,
    width: "100%",
    maxWidth: 350,
    borderBottomWidth: 2,
    borderBottomColor: "white",
    marginVertical: 10,
    color: "white",
    paddingHorizontal: 10,
    backgroundColor: "transparent",
  },
  button: {
    width: 250,
    borderRadius: 15,
    backgroundColor: "#6237A0",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
  btnDegradw: {
    width: 250,
    backgroundColor: "#6237A0",
    alignItems: "center",
    justifyContent: "center",
    height: 50,
    borderRadius: 15,
  },
  btnredirecionamento: {
    paddingBottom: 50,
    paddingTop: 20,
  },
});
