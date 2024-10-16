import React, { useCallback, useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  FlatList,
   Image
} from "react-native";
//css
import { ViewPrincipal } from "../../estilos/EstilosEstruturais.estilos";
import { ViewCentralCorpoDoAPP } from "../../estilos/EstilosEstruturais.estilos";
//componentes
import Header from "../../componentes/estruturais/Header.componente.js";
//navegação
import { useNavigation } from "@react-navigation/native";
//hooks
import { useState } from "react";
import HeaderRetornoEPesquisar from "../../componentes/estruturais/HeaderRetornoEPesquisar.componente.js";
import Matrix from "../../arquivos/Matrix_Nomes_.json";
import axios from "axios";
import { ChaveAPI } from "../../funçoes/ChaveAPI.funcao.js";
import { local } from "../../funçoes/IpOuLocalhost.js";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function PesquisaDeTexto() {
  //variaveis
  const [PalavraSalvaNoHeader, setandoPalavraSalvaNoHeader] = useState("");
  const [usuarios, setUsuarios] = useState([]);
  const [filmes, setFilmes] = useState([]);
  const [resultadosUsuarios, setResultadosUsuarios] = useState([]);
  const [resultadosFilmes, setResultadosFilmes] = useState([]);
 
  const navigation = useNavigation();
  //função para pesquisar
  const buscarUsuarios = async (nome) => {
    const token = await AsyncStorage.getItem('@token');
    const config = {
      headers: {
        Authorization: `${token}`,
      },};
    try {
      const resposta = await axios.get(`http://${local}:3000/PesquisarNomesDeUsuarios?nome=${nome}`, config);
      setUsuarios(resposta.data);
    } catch (erro) {
      console.error('Erro ao buscar usuários:', erro);
    }
  };
  const buscarFilmes = async (query) => {
    
    try {
      const resposta = await axios.get(
        `https://api.themoviedb.org/3/search/movie?api_key=${ChaveAPI}&query=${query}&language=pt-BR`
      );
      setFilmes(resposta.data.results);
    } catch (erro) {
      console.error('Erro ao buscar filmes:', erro);
    }
  };
  useEffect(() => {
    if (PalavraSalvaNoHeader) {
      buscarFilmes(PalavraSalvaNoHeader);
    }
  }, [PalavraSalvaNoHeader]);
  useEffect(()=>{
    if (PalavraSalvaNoHeader) {
    buscarUsuarios(PalavraSalvaNoHeader);
    const filtrados = filmes.filter(filme =>
      filme.title.toLowerCase().includes(PalavraSalvaNoHeader.toLowerCase())
    );
    setResultadosFilmes(filtrados);
  } else {
    setResultadosFilmes(filmes);
    setUsuarios([PalavraSalvaNoHeader, filmes]);
  }},[PalavraSalvaNoHeader, filmes])
  return (
    <View style={ViewPrincipal.estilo}>
      <HeaderRetornoEPesquisar
        voltarApaginaAnterior={() => {navigation.goBack("Pesquisar"); setandoPalavraSalvaNoHeader("")} } 
        VariavelDaPesquisa={PalavraSalvaNoHeader}
        setandoVariavelDePesquisa={(texto) =>
          setandoPalavraSalvaNoHeader(texto)
        }
      />
      <View style={[ViewCentralCorpoDoAPP.estilo, { width: "100%" }]}>
        <ScrollView style={[{ width: "100%" }]}>
        <Text style={EstilosDoPesquisar.header}>Usuários</Text>
      <FlatList
        data={usuarios}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={EstilosDoPesquisar.OpcaoDePesquisa}>
             <TouchableOpacity onPress={()=>navigation.navigate('PerfilDosAmigos', {id: item.id, nome: item.nome})} style={EstilosDoPesquisar.OpcaoDePesquisa}>
             <Image
            source={
            {uri: `http://${local}:3000/${item.foto}`}
            }
            style={EstilosDoPesquisar.headerImage}
          />
            <Text style={EstilosDoPesquisar.fonteDETexto}>{item.nome}</Text>
            </TouchableOpacity>
          </View>
        )}
      />
      
      <Text style={EstilosDoPesquisar.header}>Filmes</Text>
      <FlatList
        data={resultadosFilmes}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={()=>navigation.navigate('InformaçoesFilme', {id: item.id})} style={EstilosDoPesquisar.OpcaoDePesquisa}>
            <Text style={EstilosDoPesquisar.fonteDETexto}>{item.title+ ' '+ parseFloat(item.release_date).toFixed(0)}</Text>
          </TouchableOpacity>
        )}
      />
        </ScrollView>
      </View>
    </View>
  );
}

const EstilosDoPesquisar = StyleSheet.create({
  ScrolViewParaOsGeneros: {
    flex: 1,
  },
  headerImage: {
    width: 40,
    height: 40,
    borderRadius: 80, // deixa a imagem redonda
    marginRight: 10, 
  },
  DivHorizontalCabeDoisBlocos: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  BlocosComGenero: {
    width: 150,
    backgroundColor: "#ffffff",
    alignItems: "center",
    justifyContent: "center",
    height: 75,
    borderRadius: 15,
  },
  BlocoGenero: {},
  OpcaoDePesquisa: {
    flexDirection: 'row',
    width: "100%",
    backgroundColor: "#1A1A1A",
    justifyContent: "center",
    alignItems: "center",
    borderBottom: "solid",
    borderBottomColor: "#ffffff",
    borderBottomWidth: 1,
    height: 60,
    padding: 2,
  },
  inputDePesquisa: {
    width: 200,
    height: 32,
    backgroundColor: "#ffffff",
    borderRadius: 10,
    textAlign: "center",
  },
  header: {
    fontSize: 20,
    marginVertical: 8,
    fontWeight: 'bold',
    color: 'white',
    margin: 5,
  },
  fonteDETexto:{
    color:'#ffffff',
    fontSize: 16,
  }
});
