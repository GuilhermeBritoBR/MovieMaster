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
import { useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
export default function PerfilDosAmigos() {
  const route = useRoute();
  var id = route.params.id;
  // Constante de navegação
  const navigation = useNavigation();

  // Dados para a FlatList
  const filmesFavoritos = [
    { id: '1', title: 'Filme 1' },
    { id: '2', title: 'Filme 2' },
    { id: '3', title: 'Filme 3' },
  ];
  //hooks

  const BuscarDadosDoAmigo = async()=>{
    const token = await AsyncStorage.getItem("@token");
    const config = {
      headers: {
        Authorization: `${token}`,
      },};
  }

  //monitorar entrada de dados

  useEffect(()=>{
      const BuscarNomeLocal = async()=>{
          const nome = await BuscarNome();
          setNome(nome);
      };

      BuscarNomeLocal();
  },[nome]);

  return (
    <View style={ViewPrincipal.estilo}>
      <StatusBar backgroundColor={'#1A1A1A'} />
      <HeaderRetorno voltarApaginaAnterior={() => navigation.goBack()} />

      <ScrollView style={ViewCentralCorpoDoAPP.estilo}>

        <View style={styles.ViewComFotoDoPerfil}>
          <Image
            source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyLM6VhXMEu2gouo_heuwy_w1IQOZEGOMAIw&s' }} 
            style={styles.profileImage}
          />
          <Text style={styles.txtnome}>{nome}
          </Text>
        </View>

        {/* View Filmes Favoritos */}
        <View style={{borderBottomColor: '6F6D6D', borderBottomWidth: 1, padding: 10,}}>
          <Text style={styles.textoprincipal}>Filmes Favoritos</Text>
          <FlatList
            horizontal
            data={filmesFavoritos}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <CapaDoFilme style={styles.filmeItem}>
                <Text>{item.title}</Text>
              </CapaDoFilme>
            )}
          />
        </View>

        {/* View Atividade Recente */}
        <View style={{borderBottomColor: 'white', borderBottomWidth: 1,}}>
          <Text style={styles.textoprincipal}>Atividade Recente</Text>
        </View>

        {/* View Informações */}
        <View style={styles.atividadeRecente}>
          <TouchableOpacity>
            <Text style={styles.textoinfos}>Filmes</Text>
          </TouchableOpacity>

          <TouchableOpacity>
            <Text style={styles.textoinfos}>Reviews</Text>
          </TouchableOpacity>

          <TouchableOpacity>
            <Text style={styles.textoinfos}>Watchlist</Text>
          </TouchableOpacity>

          <TouchableOpacity>
            <Text style={styles.textoinfos}>Filmes curtidos</Text>
          </TouchableOpacity>

          <TouchableOpacity>
            <Text style={styles.textoinfos}>Seguindo</Text>
          </TouchableOpacity>

          <TouchableOpacity>
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
  atvrecente: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 10,
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