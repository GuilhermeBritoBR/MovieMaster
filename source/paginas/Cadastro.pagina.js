import React, { useState } from 'react'; //HOOKS
import { View, TextInput, ImageBackground, StyleSheet, Text, TouchableOpacity, KeyboardAvoidingView, Platform, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import axios from 'axios';
import { SalvarNome } from '../funçoes/SalvarNomeDoUsuario.funcao.js';
import { SalvarToken } from '../funçoes/SalvarToken.funcao.js';
import { useNavigation, useRoute } from '@react-navigation/native';
import { local } from '../funçoes/IpOuLocalhost.js';
import { launchImageLibrary } from 'react-native-image-picker';
import Feather from '@expo/vector-icons/Feather';
import * as ImagePicker from 'expo-image-picker';

export default function Cadastro() {
  const navigation = useNavigation("");
  const [nome, setandoNome] = useState("");
  const [senha, setandoSenha] = useState("");
  const [email, setandoEmail] = useState("");
  const [foto, setFoto] = useState(null);
  
  const selecionarImagem = async () => {
    // Solicita permissão para acessar a galeria de imagens
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert('Permissão para acessar a galeria foi negada!');
      return;
    }

    // Abre a galeria para selecionar a imagem
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaType: ImagePicker.MediaTypeOptions.Images,
      quality: 1, // Qualidade máxima
      base64: true, // Incluir Base64
    });

    if (!result.canceled) {
      console.log('Imagem selecionada:', result.assets[0]);
      setFoto(result.assets[0].base64);  // Salva o Base64 no estado
    } else {
      console.log('Usuário cancelou a seleção');
    }
  };
  function VerificarSeTemDados() {
    // Função para validar o email
    const validarEmail = (email) => {
      const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      return regex.test(email);
    };
  
    // Verificando os dados
    if (nome.length >= 3 && senha.length >= 8) {
      if (validarEmail(email)) {
        // Se os dados estiverem corretos e o email for válido
        console.log(`Segue o valor dos dados das constantes Nome: ${nome}, Senha: ${senha}, Email: ${email}`);
        RealizarCadastro();  // Função para realizar o cadastro
      } else {
        alert("Por gentileza, insira um email válido.");
      }
    } else {
      alert("Por gentileza, preencha os campos corretamente! Nome deve ter minimamente 3 caracteres, senha 8 caracteres e email válido!");
    }
  }
  
  const RealizarCadastro = async () => {
    // Crie um novo FormData
    const dadosParaEnviar = {
      nome: nome,
      email: email,
      senha: senha,
      foto: foto, // A imagem em Base64
    };

  
    try {
        console.log(dadosParaEnviar);
        const resposta = await axios.post(`http://${local}:3000/registerPage/cadastro`, dadosParaEnviar, 
          {headers: {
            'Content-Type': 'application/json',
          },}
        );
        const { token, nome } = resposta.data;
        await SalvarToken(token);
        await SalvarNome(nome);
        alert("Cadastro realizado! Bem vindo ao MovieMaster!");
        navigation.navigate("Inicio");
    } catch (err) {
        alert("Erro ao se cadastrar!");
        console.log(`Segue o erro ao se cadastrar: ${err}`);
    }
};
const route = useRoute();
  return (
    
      <View style={{flex: 1}}>
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
        <View style={{flexDirection: 'row'}}>
        <TextInput
          style={[styles.input, {width: 290, marginRight:10}]}
          placeholder="Senha"
          secureTextEntry
          placeholderTextColor="white"
          value={senha}
          onChangeText={(textodigitado) => setandoSenha(textodigitado)}
        />
        <LinearGradient
            colors={["#9754CB", "#6237A0"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 0.68, y: 0.68 }}
            style={{ justifyContent: 'center', alignItems: 'center', backgroundColor:'#9754CB', borderRadius: 5, padding: 10, height: 50 }}>
        <TouchableOpacity  onPress={selecionarImagem} >
        <Feather name="camera" size={24}  color="white" />
            {/* <Text style={{ color: '#fff', fontSize: 16 }}>Selecionar Imagem</Text> */}
            {/* Aqui você pode adicionar um ícone personalizado */}
        </TouchableOpacity>
        </LinearGradient>
        </View>
        <View style={{ alignItems: 'center', marginVertical: 20 }}>
        {/* Botão para selecionar imagem */}
        

        {/* Exibe a imagem selecionada, se houver */}
        
    </View>
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
    marginBottom: 100,
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
