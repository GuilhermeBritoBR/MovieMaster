import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ImageBackground,
  FlatList,
  ScrollView,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import axios from "axios";
import { ChaveAPI } from "../../funçoes/ChaveAPI.funcao";
import Ionicons from "@expo/vector-icons/Ionicons";
import AvaliaçaoModal from "../../componentes/estruturais/AvaliacaoModal.componente";
import { local } from "../../funçoes/IpOuLocalhost";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AntDesign from "@expo/vector-icons/AntDesign";

const { height } = Dimensions.get("window");

const InformaçoesFilme = () => {
  const route = useRoute();
  const id = route.params.id;
  const navigation = useNavigation();
  const [infoDoFilme, setandoInfoDoFilme] = useState([]);
  const [postagens, setPostagens] = useState({});
  const [likes, setLikes] = useState({});
  const [modalVisible, setModalVisible] = useState(false);
  const [dadosCarregados, setDadosCarregados] = useState(false);
  const nota = parseFloat(infoDoFilme.vote_average).toFixed(1);
  const ano = infoDoFilme.release_date?.split("-")[0] || "Desconhecido";

  // Função para definir a cor da nota
  const getNotaColor = (nota) => {
    return nota <= 5 ? "red" : "#FFD700"; // Vermelho para nota <= 5, Dourado para nota > 5
  };

  const BuscarDadosDoFilme = async (id) => {
    try {
      const resposta = await axios.get(
        `https://api.themoviedb.org/3/movie/${id}?api_key=${ChaveAPI}&language=pt-BR`
      );
      setandoInfoDoFilme(resposta.data);
    } catch (err) {
      console.log(`Erro ao buscar informações sobre o filme: ${err}`);
    }
  };

  const BuscarReviews = async () => {
    const token = await AsyncStorage.getItem("@token");
    try {
      const resposta = await axios.get(
        `http://${local}:3000/Filme/BuscarReviewsDosFilmes/${id}`,
        { headers: { Authorization: `${token}` } }
      );
      setPostagens(resposta.data.postagens);
    } catch (err) {
      console.log(`Erro ao buscar reviews: ${err}`);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      if (!dadosCarregados) {
        await BuscarDadosDoFilme(id);
        await BuscarReviews();
        setDadosCarregados(true);
      }
    };
    fetchData();
  }, [id]);

  const Corpo = ({ item }) => {
    const [curtiu, setCurtiu] = useState(false);

    const DarLike = async (id) => {
      const token = await AsyncStorage.getItem("@token");
      try {
        await axios.post(
          `http://${local}:3000/Amigos/CurtirReviewDosAmigos`,
          { idDoPost: item.id },
          { headers: { Authorization: `${token}` } }
        );
        setLikes((prev) => ({ ...prev, [id]: (likes[id] || 0) + 1 }));
        setCurtiu(true);
      } catch (err) {
        console.log(`Erro ao curtir post: ${err}`);
      }
    };

    const RemoverLike = async (id) => {
      const token = await AsyncStorage.getItem("@token");
      try {
        await axios.post(
          `http://${local}:3000/Amigos/DescurtirReviewDosAmigos`,
          { idDoPost: item.id },
          { headers: { Authorization: `${token}` } }
        );
        setLikes((prev) => ({ ...prev, [id]: (likes[id] || 0) - 1 }));
        setCurtiu(false);
      } catch (err) {
        console.log(`Erro ao remover curtida: ${err}`);
      }
    };

    return (
      <View style={EstruturaDaPaginaDosAmigos.ViewQueCentralizaCadaPostagem}>
        <View style={EstruturaDaPaginaDosAmigos.AreaSuperior}>
          <TouchableOpacity
            style={EstruturaDaPaginaDosAmigos.headerImage}
            onPress={() =>
              navigation.navigate("PerfilDosAmigos", {
                id: item.credenciais_id,
                nome: item.nome,
              })
            }
          >
            <Image
              source={{ uri: `http://${local}:3000/${item.foto}` }}
              style={EstruturaDaPaginaDosAmigos.headerImage}
            />
          </TouchableOpacity>
          <Text style={EstruturaDaPaginaDosAmigos.Nome}>{item.autor}</Text>
          <Text style={EstruturaDaPaginaDosAmigos.Nome}>{item.data_postagem}</Text>
        </View>
        <View style={EstruturaDaPaginaDosAmigos.ComentarioDoUsuarioView}>
          <Text style={EstruturaDaPaginaDosAmigos.comentarioEstilizacao}>
            {item.texto}
          </Text>
        </View>
        <View style={EstruturaDaPaginaDosAmigos.AreaInferior}>
          <TouchableOpacity onPress={() => (curtiu ? RemoverLike(item.id) : DarLike(item.id))}>
            <AntDesign
              name={curtiu ? "like1" : "like2"}
              size={24}
              color={curtiu ? "white" : "gray"}
            />
          </TouchableOpacity>
          <Text style={{ color: "white", marginLeft: 5 }}>{likes[item.id] || 0}</Text>
        </View>
      </View>
    );
  };

  return (
    <ScrollView style={styles.container}>
      <ImageBackground
        style={[styles.imagemContainer, { height: height * 0.2 }]}
        resizeMode="cover"
        source={{ uri: `https://image.tmdb.org/t/p/w500${infoDoFilme.backdrop_path}` }}
      >
        <TouchableOpacity style={styles.backButton} onPress={() =>{{setDadosCarregados(false)}; {navigation.goBack()}}}>
          <Ionicons name="arrow-back" size={36} color="white" />
        </TouchableOpacity>
      </ImageBackground>
      <View style={[styles.infoContainer, { height: height * 0.2 }]}>
        <View style={styles.textContainer}>
          <Text style={styles.titulo}>{infoDoFilme.title}</Text>
          <Text style={styles.detalhes}>
            Estúdio: {infoDoFilme.production_companies?.[0]?.name || "Desconhecido"}
          </Text>
          <View style={styles.dataminuto}>
            <Text style={styles.detalhes}>{ano}</Text>
            <Text style={styles.detalhes}>{infoDoFilme.runtime + " mins"}</Text>
          </View>
          <View style={styles.notaContainer}>
            <Text style={[styles.nota, { color: getNotaColor(nota) }]}>
              {`Nota: ${nota}`}
            </Text>
          </View>
        </View>
        <Image
          source={{ uri: `https://image.tmdb.org/t/p/w500${infoDoFilme.poster_path}` }}
          style={styles.infoImage}
        />
      </View>
      <View style={styles.sinopseContainer}>
        <Text style={styles.sinopse}>{infoDoFilme.overview}</Text>
      </View>
      <View style={styles.reviewContainer}>
        <Text style={styles.reviewTitle}>Reviews</Text>
        <FlatList
          data={postagens}
          renderItem={({ item }) => <Corpo item={item} />}
          keyExtractor={(item) => item.id.toString()}
          extraData={likes}
        />
      </View>
      <TouchableOpacity style={styles.button} onPress={() => {{setDadosCarregados(false)};{setModalVisible(!modalVisible)}}}>
        <Ionicons name="add-sharp" size={30} color="white" />
      </TouchableOpacity>
      <AvaliaçaoModal visible={modalVisible} onClose={() => setModalVisible(!modalVisible)} id={id} dados={infoDoFilme} />
    </ScrollView>
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
  },
  infoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    paddingTop: 15,
    alignItems: "flex-start",
    width: "100%",
  },
  textContainer: {
    flex: 1,
  },
  infoImage: {
    width: 97,
    height: 150,
    marginLeft: 10,
  },
  titulo: {
    fontSize: 19,
    fontWeight: "bold",
    color: "white",
    paddingLeft: 5,
    paddingBottom: 5,
  },
  detalhes: {
    fontSize: 18,
    marginRight: 10,
    padding: 5,
    color: "#99aabb",
  },
  notaContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },
  nota: {
    fontSize: 18,
    fontWeight: "bold",
    paddingLeft: 5,
  },
  dataminuto: {
    flexDirection: "row",
  },
  sinopseContainer: {
    marginTop: 10,
    marginHorizontal: 10,
  },
  sinopse: {
    fontSize: 16,
    paddingTop: 10,
    paddingBottom: 10,
    paddingRight: 10,
    paddingLeft: 3,
    color: "#99aabb",
    textAlign: "justify",
  },
  reviewContainer: {
    flex: 1,
  },
  reviewTitle: {
    color: "#99aabb",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
  },
  button: {
    backgroundColor: '#6237A0',
    position: "absolute",
    bottom: 40,
    right: 20,
    width: 60,
    height: 60,
    backgroundColor: "#6237A0",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
  },
  backButton: {
    margin: 20,
  },
  likesText: {
    color: "white",
    marginLeft: 5,
  },
});




const EstruturaDaPaginaDosAmigos = StyleSheet.create({
  dadosDoUsuario:{
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'left',
  },
  ViewQueCentralizaCadaPostagem: {
    
    width: "100%",
    flexDirection: "column",
   
  },
  SecaoEsquerda: {
    flex: 1,
  },
  SecaoDireita: {
    flex: 1,
    flexDirection: "column",
  },
  comentarioEstilizacao: {
    fontSize: 13,
    color: "#ffffff",
    textAlign: "left",
   
  },
  ComentarioDoUsuarioView: {
    flex: 1,
  },
  UsuarioEsuasInformacoes: {
    flex: 1,
    textAlign: "left",
    
  },
  Nome: {
    color: "#ffffff",
    fontSize: 16,
  },
  AreaSuperior: {
    flex: 10,
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
  AreaInferior: {
  
    flex: 1,
    flexDirection: "row",
    width: "100%",
    padding: 3,
    justifyContent: 'left',
  },
  ViewIconeDeFeedBack: {
    flexDirection: 'row',
    justifyContent: "center",
    alignItems: "center",
    padding: 3,
  },
  headerImage: {
    width: 30,
    height: 30,
    borderRadius: 60,
    marginRight: 2,
    flexDirection: 'row',
  },
});
export default InformaçoesFilme;
