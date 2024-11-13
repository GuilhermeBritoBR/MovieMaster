import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { ViewCentralCorpoDoAPP, ViewPrincipal } from "../estilos/EstilosEstruturais.estilos";
import axios from "axios";
import { local } from "../funçoes/IpOuLocalhost";
import AsyncStorage from "@react-native-async-storage/async-storage";
// import { HeaderCheck } from "<CAMINHO_DO_COMPONENTE>";
import HeaderRetorno from "../componentes/estruturais/HeaderRetorno.componente";
export default function CriarLista({ navigation }) {
  const [lista, setLista] = useState("");
  const [descricao, setDescricao] = useState("");

  const criarLista = async () => {
    const filmesArray = [];
    const config = { lista, filmesArray, descricao };
    const token = await AsyncStorage.getItem("@token");
    const tokens = {
      headers: {
        Authorization: `${token}`,
      },
    };
    try {
      await axios.post(`http://${local}:3000/Listas/CriarListaDeFilmes`, config, tokens);
      alert("Lista criada com sucesso!");
    } catch (err) {
      console.log(`Erro ao criar lista: ${err}`);
    }
  };

  return (
    <View style={[ViewPrincipal.estilo, { width: "100%" }]}>
      {/* <HeaderCheck voltarApaginaAnterior={() => navigation.goBack()} /> */}

      <HeaderRetorno voltarApaginaAnterior={() => navigation.goBack()} />
      <View style={[ViewCentralCorpoDoAPP.estilo, { width: "100%", padding: 20 }]}>
        <TextInput
          style={styles.input1}
          placeholder="Nome da Lista"
          placeholderTextColor="white"
          value={lista}
          onChangeText={(text) => setLista(text)}
        />
        <TextInput
          style={styles.input2}
          placeholder="Descrição"
          placeholderTextColor="white"
          value={descricao}
          onChangeText={(text) => setDescricao(text)}
        />
        <View style={styles.adicionarFilmeContainer}>
          <TouchableOpacity style={styles.button} onPress={()=>criarLista()}>
          <LinearGradient
            colors={["#9754CB", "#6237A0"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 0.68, y: 0.68 }}
            style={styles.btnDegradw}
          >
            <Text style={styles.buttonText}>Criar lista</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  btnredirecionamento: {
    paddingBottom: 50,
    paddingTop: 20,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
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
  input1: {
    height: 40,
    borderColor: "gray",
    borderBottomColor: "white",
    borderBottomWidth: 1,
    marginBottom: 20,
    paddingLeft: 10,
    color: "#C7BEBE",
  },
  input2: {
    height: 50,
    borderColor: "gray",
    borderBottomColor: "white",
    borderBottomWidth: 1,
    marginBottom: 20,
    paddingLeft: 10,
    color: "#C7BEBE",
  },
  adicionarFilmeContainer: {
    borderBottomColor: 'white', 
    borderBottomWidth: 0,
    alignItems: "center",
    marginTop: 20,
  },
  adicionarFilme: {
    height: 400,
    backgroundColor: "#1a1a1a",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    borderRadius: 5,
    flexDirection: "row",
    padding: 10,
  },
  imageContainer: {
    width: "100%",
    padding: 10,
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10,
  },
  filmeImagem: {
    width: 100,
    height: 150,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  adicionarFilmeTexto: {
    color: "white",
    fontSize: 14,
    marginBottom: 10,
    justifyContent: "center",
    textAlign: "center",
  },
  adicionarFilmeTextoBotao: {
    color: "black",
    fontSize: 20,
  },
});
