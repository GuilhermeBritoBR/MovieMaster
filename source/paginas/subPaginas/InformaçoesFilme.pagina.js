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
import { useIsFocused } from "@react-navigation/native";
const { height } = Dimensions.get("window");
import { useFocusEffect } from '@react-navigation/native';

const InformaçoesFilme = () => {
  const route = useRoute();
  const id = route.params.id;
  const navigation = useNavigation();
  
  const [infoDoFilme, setandoInfoDoFilme] = useState({});
  const [postagens, setPostagens] = useState([]);
  const [likes, setLikes] = useState({});
  const [modalVisible, setModalVisible] = useState(false);
  const [dadosCarregados, setDadosCarregados] = useState(false);

  const nota = parseFloat(infoDoFilme.vote_average).toFixed(1);
  const ano = infoDoFilme.release_date?.split("-")[0] || "Desconhecido";

  // Função para definir a cor da nota
  const getNotaColor = (nota) => (nota <= 5 ? "red" : "#ab49cc");

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
  const isFocused = useIsFocused();
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
    const carregar = async () => {
      await BuscarDadosDoFilme(id);
      await BuscarReviews();
      
      setDadosCarregados(true);
    };
    carregar();
  }, [id]);
  

  const Corpo = ({ item }) => {
    const [curtiu, setCurtiu] = useState(false);
    const [likes, setLikes] = useState({});
    const [curtidas, setCurtidas] = useState(0);
  
    // Função para verificar se o usuário já curtiu o post
    const verificarCurtida = async () => {
      const token = await AsyncStorage.getItem("@token");
      try{
      const resposta = await axios.get(
        `http://${local}:3000/Amigos/VerificarCurtirDoPost/${item.id}`,
        { headers: { Authorization: `${token}` } }
      );
      setCurtiu(resposta.data.curtiu);
      QuantidadeDeCurtidasPorPost();
    }catch(err){
      console.log('erro ao curtir:', err)
    }
    };
    //:id'
    const QuantidadeDeCurtidasPorPost = async () => {
      const token = await AsyncStorage.getItem("@token");
      const idpost = item.id;
      try{
      const resposta = await axios.get(
        `http://${local}:3000/Amigos/QuantidadeDeCurtidasPorPost/${idpost}`,
        { headers: { Authorization: `${token}` } }
      );
      setCurtidas(resposta.data.totalCurtidas);
    }catch(err){
      console.log('erro ao curtir:', err)
    }
    };
    // Chama verificarCurtida quando o componente é montado
    useEffect(() => {
      verificarCurtida();
      QuantidadeDeCurtidasPorPost()
    }, [item.id]);
  
    // Função para dar like
    const DarLike = async (id) => {
      const token = await AsyncStorage.getItem("@token");
      try {
        await axios.post(
          `http://${local}:3000/Amigos/CurtirReviewDosAmigos`,
          { idDoPost: item.id },
          { headers: { Authorization: `${token}` } }
        );
        setLikes((prev) => ({ ...prev, [id]: (likes[id] || 0) + 1 }));
        setCurtidas(prev => prev + 1);
        setCurtiu(true);
      } catch (err) {
        console.log(`Erro ao curtir post: ${err}`);
      }
    };
  
    // Função para remover like
    const RemoverLike = async (id) => {
      const token = await AsyncStorage.getItem("@token");
      try {
        await axios.post(
          `http://${local}:3000/Amigos/DescurtirReviewDosAmigos`,
          { idDoPost: item.id },
          { headers: { Authorization: `${token}` } }
        );
        setLikes((prev) => ({ ...prev, [id]: (likes[id] || 0) - 1 }));
        setCurtidas(prev => prev - 1);
;

        setCurtiu(false);
      } catch (err) {
        console.log(`Erro ao remover curtida: ${err}`);
      }
    };
    
  
   
    return (
      <View style={styles.postContainer}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.headerImage}
            onPress={() =>
              navigation.navigate("PerfilDosAmigos", {
                id: item.credenciais_id,
                nome: item.nome,
              })
            }
          >
            <Image
              source={{ uri: `http://${local}:3000/${item.foto}` }}
              style={styles.headerImage}
            />
          </TouchableOpacity>
          <View style={styles.NomeData}>
            <Text style={styles.Nome}>{item.autor}</Text>
            <Text style={styles.Data}>{item.data_postagem}</Text>
          </View>
        </View>
        <View style={styles.ComentarioDoUsuarioView}>
          <Text style={styles.comentarioEstilizacao}>{item.texto}</Text>
        </View>
        <View style={styles.AreaInferior}>
          <TouchableOpacity onPress={() => (curtiu ? RemoverLike(item.id) : DarLike(item.id))}>
            <Ionicons
              name={curtiu ? "heart-sharp" : "heart-outline"}
              size={24}
              color={curtiu ? "#ab49cc" : "gray"}
            />
          </TouchableOpacity>
          <Text style={styles.likesText}>{curtidas}</Text>
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
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={() => { setDadosCarregados(false); navigation.goBack(); }}
        >
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
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <Corpo item={item} />}
          extraData={likes}
        />
      </View>

      <TouchableOpacity 
        style={styles.button} 
        onPress={() => { setDadosCarregados(false); setModalVisible(!modalVisible); }}
      >
        <Ionicons name="add-sharp" size={30} color="white" />
      </TouchableOpacity>

      <AvaliaçaoModal visible={modalVisible} onClose={() => setModalVisible(!modalVisible)} id={id} dados={infoDoFilme} titulo={infoDoFilme.title} data={ano} />
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
    paddingVertical: 10,
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
  postContainer: {
    width: "100%",
    flexDirection: "column",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
  },
  ComentarioDoUsuarioView: {
    flex: 1,
    paddingLeft: 10,
  },
  comentarioEstilizacao: {
    fontSize: 13,
    color: "#ffffff",
    textAlign: "left",
  },
  AreaInferior: {
    flexDirection: "row",
    width: "100%",
    padding: 10,
    justifyContent: 'flex-start',
  },
  headerImage: {
    width: 30,
    height: 30,
    borderRadius: 60,
    marginRight: 2,
  },
  Nome: {
    color: "#ffffff",
    fontSize: 16,
    marginHorizontal: 5,
    marginRight: 145,
  },
  Data: {
    color: "#ffffff",
    fontSize: 16,
    marginHorizontal: 5,

  },
  NomeData:{
    flexDirection: 'row',
  },
});

export default InformaçoesFilme;
