import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  TouchableOpacity,
  Image,
  FlatList,
} from "react-native";

import Header from "../componentes/estruturais/Header.componente.js";
import {
  ViewCentralCorpoDoAPP,
  ViewPrincipal,
} from "../estilos/EstilosEstruturais.estilos.js";
import { useNavigation } from "@react-navigation/native";
import Ionicons from "@expo/vector-icons/Ionicons";
import axios from "axios";
import { local } from "../funçoes/IpOuLocalhost.js";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Lista = () => {
  const navigation = useNavigation();
  const [listas, setListas] = useState([]);


  useEffect(() => {
    const fetchListas = async () => {
        const token = await AsyncStorage.getItem('@token');
      try {
        const response = await axios.get(`http://${local}:3000/Lista/BuscarMinhasListas`, {
          headers: { Authorization: `${token}` },
        });
        const listasComFilmes = response.data.map((item) => ({
            ...item,
            lista: JSON.parse(item.lista),
          }));
          setListas(listasComFilmes);
      } catch (error) {
        console.error("Erro ao buscar listas:", error);
      }
    };

    fetchListas();
  }, []);

  const pressionar = () => {
    navigation.navigate("CriarLista");
  };
  const renderizarCapa = ({ item }) => (
    <TouchableOpacity
    style={styles.capa}
    onPress={()=>navigation.navigate("InformaçoesFilme",{id: item.id})}>
    <Image
      source={{ uri: `https://image.tmdb.org/t/p/w500${item.capaURL}` }}
      style={styles.capa}
    />
    </TouchableOpacity>
  )

  const renderizarLista = ({ item }) => (
    <View style={styles.listaContainer}>
      <TouchableOpacity style={[styles.listaContainer,{borderWidth:0, padding: 0}]} onPress={()=> navigation.navigate("ListaIndividual", {dados: item})}>
      <Text style={styles.listaTitulo}>{item.nome_lista}</Text>
      <View style={styles.capasContainer}>
      <FlatList
        data={item.lista}
        renderItem={renderizarCapa}
        keyExtractor={(filme, index) => index.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.capasContainer}
      />
      </View>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={ViewPrincipal.estilo}>
      <StatusBar backgroundColor={"#000000"} />
      <Header ativarMenuTrueFalse={() => navigation.openDrawer()} />
      <View style={ViewCentralCorpoDoAPP.estilo}>
        <FlatList
          data={listas}
          renderItem={renderizarLista}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.listaContainerStyle}
        />
        <TouchableOpacity style={styles.button} onPress={pressionar}>
          <Ionicons name="add-sharp" size={30} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  listaContainer: {
    marginVertical: 10,
    padding: 15,
    backgroundColor: "#1a1a1a",
    elevation: 5,
  },
  listaTitulo: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#ffffff",
  },
  capasContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  capa: {
    width: 80,
    height: 120,
    marginRight: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  button: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#7100CA",
    position: "absolute",
    right: 20,
    bottom: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  listaContainerStyle: {
    paddingBottom: 80,
  },
});

export default Lista;
