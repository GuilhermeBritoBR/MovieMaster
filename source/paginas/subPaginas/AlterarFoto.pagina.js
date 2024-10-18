import {StatusBar,  StyleSheet,  Text,  View, TextInput, TouchableOpacity , Image } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import { ViewCentralCorpoDoAPP, ViewPrincipal } from '../../estilos/EstilosEstruturais.estilos';
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
export default function AlterarFoto(){

  //função
  
  //funções para alterar os dados existentes
  
  //verificando validade da senha em caracteres
  const [foto, setFoto] = useState(null);
  
  const selecionarImagem = () => {
    launchImageLibrary(
      { 
        mediaType: 'photo', 
        includeBase64: true, 
        quality: 1,  // 1 é a qualidade máxima
        maxWidth: 8000, // Define o limite de largura (exemplo 8K)
        maxHeight: 8000 // Define o limite de altura (exemplo 8K)
      },  // Adiciona `includeBase64`
      (response) => {
        if (response.didCancel) {
          console.log('Usuário cancelou a seleção da imagem');
        } else if (response.error) {
          console.log('Erro ao selecionar a imagem:', response.error);
        } else {
          console.log(response.assets[0]); // Exibe a imagem selecionada
          setFoto(response.assets[0].base64); // Salva a imagem em Base64 no estado
        }
      }
    );
  };
  //verificar valores
  async function FuncaoParaAlterarDados(foto){
    //coletando token
    const token = await AsyncStorage.getItem('@token');
    //json com os dados alterados
    const DadosAlterados = {
      foto
    };
    //enviar token para a validação se o usuário está logadfo
    const config = {
      headers: {
          'Authorization': token
      }}

    try{
      await axios.put(`http://${local}:3000/Configuracoes/AlterarImagem`, DadosAlterados, config);
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
       {/* Observe que este header retorna a página anterior */}
       <HeaderRetorno voltarApaginaAnterior={()=> navigation.goBack("")}/>
       
      <View style={ViewCentralCorpoDoAPP.estilo}>

          {/* Primeira View com os lançamentos */}
          <View style={EstilosDoInicio.ViewPrimariaQueCarregaOblocoDeLançamentos}>
            <H2 texto={"Altere sua foto"}/>
            <TouchableOpacity onPress={selecionarImagem} style={{ padding: 10, backgroundColor: '#007BFF', borderRadius: 5 }}>
            <Text style={{ color: '#fff', fontSize: 16 }}>Selecionar Imagem</Text>
            {/* Aqui você pode adicionar um ícone personalizado */}
        </TouchableOpacity>
        {foto && (
        <Image 
          source={{ uri: `data:image/jpeg;base64,${foto}` }} 
          style={{ width: 200, height: 200, marginTop: 20, borderRadius: 10 }} 
        />
      )}
          <TouchableOpacity onPress={()=>FuncaoParaAlterarDados(foto)}
          style={EstilosDoInicio.botaoAlterar}>
          <LinearGradient 
            colors={['#9754CB', '#6237A0']} 
            start={{ x: 0, y: 0 }}
            end={{ x: 0.68, y: 0.68 }} 
            style={EstilosDoInicio.btnDegradw}
          >
            <Text style={EstilosDoInicio.textoBotao}>Alterar foto</Text>
          </LinearGradient>
          </TouchableOpacity>
          </View>
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

