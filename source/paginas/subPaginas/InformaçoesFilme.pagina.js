import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { useState, useEffect } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
const { height } = Dimensions.get("window");
import axios from "axios";
import { ChaveAPI } from "../../funçoes/ChaveAPI.funcao";
import RetornoTransparente from "../../componentes/estruturais/RetornoTransparente.componente";
import Ionicons from '@expo/vector-icons/Ionicons';
import AvaliaçaoModal from "../../componentes/estruturais/AvaliacaoModal.componente";
const InformaçoesFilme = () => {
  const route = useRoute();
  var id = route.params.id;
  //variavel com a informação do filme
  const [infoDoFilme, setandoInfoDoFilme] = useState({});
  const BuscarDadosDoFilme = async (id) => {
    console.log(`Valor do ID: ${id}`);
    try {
      const resposta = await axios.get(
        `https://api.themoviedb.org/3/movie/${id}?api_key=${ChaveAPI}&language=pt-BR`
      );
      setandoInfoDoFilme(resposta.data);
      console.log(`Sucesso ao buscar informações sobre o filme:  `);
    } catch (err) {
      console.log(`Erro ao buscar informações sobre o filme: ${err}`);
      alert(`Erro ao buscar informações sobre o filme: ${err}`);
    }
  };

  const navigation = useNavigation("");
  const nota = infoDoFilme.vote_average;
  const nota_arredondada = parseFloat(nota).toFixed(1);
  const ano = infoDoFilme.release_date?.split("-")[0] || "Desconhecido";
  const [modalVisible, setModalVisible] = useState(false); 
  const toggleModal = () => {
    setModalVisible(!modalVisible); // Alterna a visibilidade do modal
  };
  useEffect(() => {
    BuscarDadosDoFilme(id);
    
  }, [id, modalVisible]);
  return (
    <View style={styles.container}>
      {/* 20% da tela para a imagem do filme */}
        <ImageBackground
        style={[styles.imagemContainer, { height: height * 0.2 }]}
        resizeMode="cover"
          source={{
            uri: `https://image.tmdb.org/t/p/w500${infoDoFilme.backdrop_path}`,
          }}
        > 
          <TouchableOpacity style={{margin:20}} onPress={() => navigation.goBack("")}>
            <Ionicons name="arrow-back" size={36} color="white" />
            </TouchableOpacity>
        </ImageBackground>

      {/* Container para informações do filme e imagem do lado */}
      <View style={[styles.infoContainer, { height: height * 0.2 }]}>
        <View style={styles.textContainer}>
          <Text style={styles.titulo}>{infoDoFilme.title}</Text>
          <Text style={styles.detalhes}>{infoDoFilme.runtime + " mins"}</Text>
          <Text style={styles.detalhes}>
            Estúdio:{" "}
            {infoDoFilme.production_companies?.[0]?.name || "Desconhecido"}
          </Text>
          <Text style={[styles.detalhes]}>{`Nota: ${nota_arredondada}`}</Text>
          <Text style={styles.detalhes}>{ano}</Text>
          <View style={styles.dataminuto}></View>
        </View>
        <Image
          source={{
            uri: `https://image.tmdb.org/t/p/w500${infoDoFilme.poster_path}`,
          }}
          style={styles.infoImage}
        />
      </View>

      {/* 15% da tela para a sinopse */}
      <View style={[styles.sinopseContainer, { height: height * 0.15 }]}>
        <Text style={styles.sinopse}>{infoDoFilme.overview}</Text>
      </View>

      {/* Reviews */}
      <View style={{ flex: 1 }}>
        <Text style={{ color: "white" }}>Reviews</Text>
      </View>
      <TouchableOpacity style={styles.button} onPress={toggleModal}>
      <Ionicons name="add-sharp" size={30} color="white" />
      </TouchableOpacity>
      <AvaliaçaoModal visible={modalVisible} onClose={toggleModal} id={id} dados={infoDoFilme} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1a1a1a",
  },
  imagemContainer: {
    width: "100%",
    height: "100%",
    alignItems: "start",
    flex: 1,
  },
  imagem: {
    width: "100%",
    height: "100%",
  },
  infoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    flex: 1,
    alignItems: "center",
  },
  textContainer: {
    flex: 1,
  },
  infoImage: {
    width: 87,
    height: 112,
    marginLeft: 10,
  },
  titulo: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
  detalhes: {
    fontSize: 16,
    marginVertical: 2,
    color: "#99aabb",
  },
  autor: {
    fontSize: 16,
    marginVertical: 2,
    color: "#99aabb",
    fontWeight: "bold",
  },
  sinopseContainer: {
    padding: 10,
    flex: 1,
    borderBottomColor: "white",
    borderBottomWidth: 1,
  },
  sinopse: {
    fontSize: 14,
    fontStyle: "italic",
    color: "#99aabb",
  },
  dataminuto: {
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  button: {
    borderRadius: 180,
  },
  button: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#7100CA',
    position: 'absolute',
    right: 20,
    bottom: 40,
    justifyContent: 'center',
    alignItems: 'center', }

});

export default InformaçoesFilme;
