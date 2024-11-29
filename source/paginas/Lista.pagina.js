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
  }, [listas]);

  const pressionar = () => {
    navigation.navigate("CriarLista");
  };

  const renderizarCapa = ({ item }) => (
    <TouchableOpacity
      style={styles.capa}
      onPress={() => navigation.navigate("InformaçoesFilme", { id: item.id })}
    >
      <Image
        source={{ uri: `https://image.tmdb.org/t/p/w500${item.capaURL}` }}
        style={styles.capa}
      />
    </TouchableOpacity>
  );

  const renderizarLista = ({ item }) => (
    <View style={styles.listaContainer}>
      <TouchableOpacity
        style={styles.listaTouchable}
        onPress={() => navigation.navigate("ListaIndividual", { dados: item })}
      >
        <Text style={styles.listaTitulo}>{item.nome_lista}</Text>
        <FlatList
          data={item.lista}
          renderItem={renderizarCapa}
          keyExtractor={(filme, index) => index.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.capasContainer}
        />
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
    marginTop: 20,
    backgroundColor: "#1a1a1a",
    paddingVertical: 25,
    paddingHorizontal: 15,
    borderRadius: 10,
    marginVertical: 10,
    marginHorizontal: 20,
    elevation: 5,
    shadowColor: "#ffffff",
    shadowOpacity: 0.3,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  listaTouchable: {
    borderRadius: 10,
    overflow: "hidden",
  },
  listaTitulo: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#ffffff",
    marginBottom: 10,
  },
  capasContainer: {
    flexDirection: "row",
  },
  capa: {
    width: 80,
    height: 120,
    borderRadius: 5,
    marginRight: 10,
    backgroundColor: "#333333",
  },
  button: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#7100CA",
    position: "absolute",
    right: 20,
    bottom: 40,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#7100CA",
    shadowOpacity: 0.4,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 4 },
  },
  listaContainerStyle: {
    paddingBottom: 100,
  },
});

export default Lista;
