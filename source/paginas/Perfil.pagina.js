import React from 'react';
import { StatusBar } from "react-native";
import { StyleSheet, Text, View, ScrollView, Image, TouchableOpacity, FlatList } from "react-native";

// ESTILOS IMPORTADOS
import { ViewCentralCorpoDoAPP, ViewPrincipal } from "../estilos/EstilosEstruturais.estilos";

// Componentes
import HeaderRetorno from "../componentes/estruturais/HeaderRetorno.componente";
import CapaDoFilme from '../componentes/estruturais/CapaDoFilme.componente';
import { useState, useEffect } from 'react';
// Navegação
import { useNavigation } from "@react-navigation/native";
import { BuscarNome } from '../funçoes/BuscarNome.funcao';
// Textos
import H3 from "../componentes/textos/h3.componente";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { local } from '../funçoes/IpOuLocalhost';
import axios from 'axios';

export default function Perfil() {
  //constanstes de dados
  const [meusFavoritos, setandoMeusFavoritos] = useState([]);
  const [fotoPerfil, setFotoPerfil]= useState('');
  const [amigos, setAmigos]= useState('');
  const [MeusSeguidores, setMeusSeguidores] = useState([]);
  // Constante de navegação
  const navigation = useNavigation();

  // Dados para a FlatList
  const BuscarFilmesFavoritos = async()=>{
    const token = await AsyncStorage.getItem("@token");
    const config = {
      headers: {
        Authorization: `${token}`,
      },};
      const zero = 0;
        try{
          const respostaMeusSeguidores = await axios.get(`http://${local}:3000/Perfil/BuscarOsQueMeSeguem/${zero}`, config );
          const resposta = await axios.get(`http://${local}:3000/Perfil/BuscarMeusFilmesFavoritos`, config);
          const foto = await axios.get(`http://${local}:3000/Perfil/BuscarFotoDePerfil`, config);
          const amigos = await axios.get(`http://${local}:3000/Amigos/VerificarMeusAmigos`, config);
          
          setMeusSeguidores(respostaMeusSeguidores.data.seguidores);
          setandoMeusFavoritos(resposta.data.resposta);
          setFotoPerfil(foto.data.foto);
          setAmigos(amigos.data.amigos);
          
          
        }catch(err){
          console.error(`Erro ao buscar treinos: segue o tal ${err}`);
        }
      
  }
  //hooks

  const [nome, setNome] = useState("");

  //monitorar entrada de dados

  useEffect(()=>{
      const BuscarNomeLocal = async()=>{
          const nome = await BuscarNome();
          setNome(nome);
      };
      BuscarFilmesFavoritos();
      BuscarNomeLocal();
  },[ fotoPerfil, ]);

  return (
    <View style={[ViewPrincipal.estilo,{width: '100%'}]}>
      <StatusBar backgroundColor={'#1A1A1A'} />
      <HeaderRetorno voltarApaginaAnterior={() => navigation.goBack()} />

      <ScrollView style={[ViewCentralCorpoDoAPP.estilo,{width: '100%'}]}>

        <View style={styles.ViewComFotoDoPerfil}>
          <Image
            source={{ uri:`http://${local}:3000/${fotoPerfil}`}} 
            style={styles.profileImage}
          />
          <Text style={styles.txtnome}>{nome}
          </Text>
        </View>

        {/* View Filmes Favoritos */}
        <View style={styles.favoritos}>
          <Text style={styles.textoprincipal}>Filmes Favoritos</Text>
          <FlatList
            horizontal
            data={meusFavoritos}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={()=>navigation.navigate("InformaçoesFilme",{id: item.filme_id})}>
              <CapaDoFilme propriedadeParaReceberAcapaDoFilme={item.capa}/>
              </TouchableOpacity>
            )}
          />
        </View>

    

        {/* View Informações */}
        <View style={styles.atividadeRecente}>
    

        <TouchableOpacity onPress={()=>navigation.navigate('Minhas Postagens',{id: 0})}>
              <Text style={styles.textoinfos}>Reviews</Text>
            </TouchableOpacity>
          

          <TouchableOpacity onPress={()=>navigation.navigate('MeusAmigos',{amigos: amigos})}>
            <Text style={styles.textoinfos}>Seguindo</Text>
          </TouchableOpacity>
          
          <TouchableOpacity onPress={()=>navigation.navigate('MeusSeguidores',{seguidores: MeusSeguidores})}>
            <Text style={styles.textoinfos}>Seguidores</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40, // Ajustado para manter a imagem redonda
    marginRight: 20,
    
  },
  ViewComFotoDoPerfil: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    borderBottomColor: 'white', 
    borderBottomWidth: 1,
    padding: 10,
  },
  textoprincipal: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
    color: "white",
  },
  favoritos: {
    borderBottomColor: 'white',
     borderBottomWidth: 1,
      padding: 10,
       width: '100%',
       justifyContent: 'flex-start',
  },
  textoinfos: {
    fontSize: 16,
    color: '#C7BEBE',
    paddingVertical: 10,
  },
  filmeItem: {
    marginRight: 15,
    padding: 10,
    backgroundColor: '#eee',
    borderRadius: 5,
  },
  txtnome: {
    fontSize: 20,
    color: 'white',
  },
  atividadeRecente:{
    padding: 10, 
  },
});
