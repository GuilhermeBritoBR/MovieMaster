
import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ImageBackground,
  FlatList,
  ScrollView

} from "react-native";
import { useState, useEffect } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
const { height } = Dimensions.get("window");
import axios from "axios";
import { ChaveAPI } from "../../funçoes/ChaveAPI.funcao";
import RetornoTransparente from "../../componentes/estruturais/RetornoTransparente.componente";
import Ionicons from '@expo/vector-icons/Ionicons';
import AvaliaçaoModal from "../../componentes/estruturais/AvaliacaoModal.componente";
import { local } from "../../funçoes/IpOuLocalhost";
import AsyncStorage from "@react-native-async-storage/async-storage";
import MenorCapaDoFilme from "../../componentes/estruturais/MenorCapaFilme.componente";
import AntDesign from '@expo/vector-icons/AntDesign';
const InformaçoesFilme = () => {
  
  const route = useRoute();
  var id = route.params.id;
  //variavel com a informação do filme
  const [infoDoFilme, setandoInfoDoFilme] = useState([]);
  const capa = infoDoFilme.poster_path;
  
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
  const [postagens, setPostagens] = useState({});
  const toggleModal = () => {
    setModalVisible(!modalVisible); // Alterna a visibilidade do modal
  };
  
  const BuscarReviews = async()=>{
    const token = await AsyncStorage.getItem("@token");
    const config = {
      headers: {
        Authorization: `${token}`,
      },
    };
    try{
      const resposta = await axios.get(`http://${local}:3000/Filme/BuscarReviewsDosFilmes/${id}`, config);
      setPostagens(resposta.data.postagens);
    }catch(err){
      console.log(`Segue o erro: ${err}`)
    }
  }
const [likes, setLikes] = useState({});
  
  
 

  
  
  const Corpo = ({
    item
  }) => {
    
    const [postCurtiu, setPostCurtiu] = useState(false);
    const [carregado, setCarregado] = useState(false);
    const [curtiu, setCurtiu] = useState(false);
    const verificarCurtida = async (id) => {
      const token = await AsyncStorage.getItem("@token");
      const config = {
        headers: {
          Authorization: `${token}`,
        },
      };
      try {
        const resposta = await axios.get(
          `http://${local}:3000/Amigos/VerificarCurtirDoPost/${id}`,
          config
        );
        setCurtiu(resposta.data.curtiu);
      } catch (err) {
        console.log(`Erro ao verificar curtida: ${err}`);
      }
    };
  
    const calcularCurtidas = async (id) => {
      const token = await AsyncStorage.getItem("@token");
      const config = {
        headers: {
          Authorization: `${token}`,
        },
      };
      try {
        const resposta = await axios.get(
          `http://${local}:3000/Amigos/QuantidadeDeCurtidasPorPost/${id}`,
          config
        );
        setLikes((prev) => ({ ...prev, [id]: resposta.data.totalCurtidas }));
      } catch (err) {
        console.log(`Erro ao contar curtidas: ${err}`);
      }
    };
  
    const DarLike = async (id) => {
      const token = await AsyncStorage.getItem("@token");
      const config = {
        headers: {
          Authorization: `${token}`,
        },
      };
      const idLocal = item.id;
      const aEnviar = { idDoPost: idLocal };
      try {
        await axios.post(
          `http://${local}:3000/Amigos/CurtirReviewDosAmigos`,
          aEnviar,
          config
        );
        calcularCurtidas(id);
        setCurtiu(true);
        
      } catch (err) {
        console.log(`Erro ao curtir post: ${err}`);
      }
    };
    //remover
    const RemoverLike = async (id) => {
      const token = await AsyncStorage.getItem("@token");
      const idDoPost = id;
      const config = {
        headers: {
          Authorization: `${token}`,
        },
      };
      const idLocal = item.id;
      const aEnviar = { idDoPost: idLocal };
  
      try {
        await axios.post(
          `http://${local}:3000/Amigos/DescurtirReviewDosAmigos`,
          aEnviar,
          config
        );
        calcularCurtidas(id); // Atualiza o número de curtidas
        setCurtiu(false); // Atualiza o estado para "não curtido"
      } catch (err) {
        console.log(`Erro ao remover curtida: ${err}`);
      }
    };
    const navigation = useNavigation();
    useEffect(() => {
      
      const fetchData = async () => {
        if (!carregado) {
          await calcularCurtidas(item.id);
          const resultado = await verificarCurtida(item.id);
          setPostCurtiu(resultado);
          setCarregado(true);
        }
      };
      fetchData();
  }, [
    carregado, verificarCurtida, calcularCurtidas, item.id, curtiu, postCurtiu
  ]);
    return (
      <View style={EstruturaDaPaginaDosAmigos.ViewQueCentralizaCadaPostagem}>
        <View style={EstruturaDaPaginaDosAmigos.AreaSuperior}> 
          <View style={EstruturaDaPaginaDosAmigos.SecaoDireita}>
          
            <View style={EstruturaDaPaginaDosAmigos.UsuarioEsuasInformacoes}>
              <View style={EstruturaDaPaginaDosAmigos.dadosDoUsuario}>
              
              <TouchableOpacity  style={EstruturaDaPaginaDosAmigos.headerImage} onPress={()=>navigation.navigate("PerfilDosAmigos", {id:item.credenciais_id, nome: item.nome})} >
              
            <Image
              source={{ uri: `http://${local}:3000/${item.foto}` }}
              style={EstruturaDaPaginaDosAmigos.headerImage}
            />
            </TouchableOpacity>
            
              <Text style={[EstruturaDaPaginaDosAmigos.Nome, {flexDirection: 'row', margin: 5}]}>{item.autor}</Text>
              <Text style={[EstruturaDaPaginaDosAmigos.Nome, { fontSize: 10, margin: 5 }]}>
                {item.data_postagem}
              </Text>
            </View>
              </View>
              
            <View style={EstruturaDaPaginaDosAmigos.ComentarioDoUsuarioView}>
              <Text style={EstruturaDaPaginaDosAmigos.comentarioEstilizacao}>
                {item.texto}
              </Text>
            </View>
          </View>
        </View>
        <View style={EstruturaDaPaginaDosAmigos.AreaInferior}>
          <View style={EstruturaDaPaginaDosAmigos.ViewIconeDeFeedBack}>
            
            {postCurtiu === true ? (
              
              <TouchableOpacity
                style={EstruturaDaPaginaDosAmigos.AreaInferior}
                onPress={() => {RemoverLike(item.id); setPostCurtiu(false)}} // Remover o like
              >
                <AntDesign name="like1" size={24} color="white" />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={EstruturaDaPaginaDosAmigos.AreaInferior}
                onPress={() => {DarLike(item.id); setPostCurtiu(true)}} // Adicionar o like
              >
                <AntDesign name="like2" size={24} color="gray" />
              </TouchableOpacity>
            )}
            <Text style={{ color: "white", marginLeft: 5, }}>{likes[item.id] || 0}</Text>
          </View>
        </View>
      </View>
    );
  };

  const [dadosCarregados, setDadosCarregados] = useState(false);

useEffect(() => {
   const fetchData = async () => {
    if(!dadosCarregados){
      try {
        const resposta = await axios.get(
          `https://api.themoviedb.org/3/movie/${id}?api_key=${ChaveAPI}&language=pt-BR`
        );
        BuscarDadosDoFilme(id);
        BuscarReviews();
        setandoInfoDoFilme(resposta.data);
       
         setDadosCarregados(true); 
      } catch (error) {
         console.error("Erro ao buscar dados:", error);
      }
    }
   };
   fetchData();
}, [id]);
  return (
    <ScrollView style={styles.container}>
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
          <Text style={styles.detalhes}>
            Estúdio:{" "}
            {infoDoFilme.production_companies?.[0]?.name || "Desconhecido"}
          </Text>
          <View style={styles.dataminuto}>
          <Text style={styles.detalhes}>{ano}</Text>
          <Text style={styles.detalhes}>{infoDoFilme.runtime + " mins"}</Text>
          
          </View>
          
          <Text style={[styles.detalhes]}>{`Nota: ${nota_arredondada}`}</Text>
        
        </View>
        <Image
          source={{
            uri: `https://image.tmdb.org/t/p/w500${capa}`,
          }}
          style={styles.infoImage}
        />
      </View>

      {/* 15% da tela para a sinopse */}
      <View style={styles.sinopseContainer}>
        <Text style={styles.sinopse}>{infoDoFilme.overview}</Text>
      </View>

      {/* Reviews */}
      <View style={styles.reviewContainer} >
        <Text style={{ color: "#99aabb", textAlign: 'center',fontWeight: 'bold', fontSize: 16, }}>Reviews</Text>
        <FlatList
          data={postagens}
          renderItem={({ item }) => (
            <Corpo
              item={item}
            />
          )}
          keyExtractor={(item) => item.id.toString()}
          extraData={likes}
        />
      </View>
      <TouchableOpacity style={styles.button} onPress={toggleModal}>
      <Ionicons name="add-sharp" size={30} color="white" />
      </TouchableOpacity>
      <AvaliaçaoModal visible={modalVisible} onClose={toggleModal} id={id} dados={infoDoFilme} />
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
  imagem: {
    width: "100%",
    height: "100%",
  },
  infoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    paddingTop: 15,
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
    marginRight: 10,
    color: "#99aabb",
  },
  autor: {
    fontSize: 16,
    marginVertical: 2,
    color: "#99aabb",
    fontWeight: "bold",
  },
  sinopseContainer: {
    paddingRight: 10,
    paddingLeft: 10,
    paddingBottom: 15,
    paddingTop:15,
    flexGrow: 0, // Permite que o contêiner expanda conforme necessário
  
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
