import React from 'react';
import { StatusBar } from "react-native";
import { StyleSheet, Text, View, ScrollView, Image, TouchableOpacity, FlatList } from "react-native";

// ESTILOS IMPORTADOS
import { ViewCentralCorpoDoAPP, ViewPrincipal } from "../estilos/EstilosEstruturais.estilos";

// Componentes
import HeaderRetorno from "../componentes/estruturais/HeaderRetorno.componente";

// Navegação
import { useNavigation } from "@react-navigation/native";

// Textos
import H3 from "../componentes/textos/h3.componente";

export default function Perfil() {
  // Constante de navegação
  const navigation = useNavigation();

  // Dados para a FlatList
  const filmesFavoritos = [
    { id: '1', title: 'Filme 1' },
    { id: '2', title: 'Filme 2' },
    { id: '3', title: 'Filme 3' },
  ];

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
          <H3 texto={"oi"} />
        </View>

        {/* View Filmes Favoritos */}
        <View>
          <Text style={styles.textoprincipal}>Filmes Favoritos</Text>
          <FlatList
            horizontal
            data={filmesFavoritos}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.filmeItem}>
                <Text>{item.title}</Text>
              </View>
            )}
          />
        </View>

        {/* View Atividade Recente */}
        <View>
          <Text style={styles.textoprincipal}>Atividade Recente</Text>
        </View>

        {/* View Informações */}
        <View>
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
});
