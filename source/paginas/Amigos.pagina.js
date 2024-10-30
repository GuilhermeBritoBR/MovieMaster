import React, { useState, useEffect } from "react";
import {
  View,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  StatusBar,
} from "react-native";
//componentes importados
import Header from "../componentes/estruturais/Header.componente.js";
//textos
import H3 from "../componentes/textos/h3.componente";
//capas dos filmes
import CapaDoFilme from "../componentes/estruturais/CapaDoFilme.componente";
//CSS IMPORTADOS
import {
  ViewPrincipal,
  ViewCentralCorpoDoAPP,
} from "../estilos/EstilosEstruturais.estilos";
//NAVEGACAO
import { useNavigation } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
//matrix falsa de dados
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import MenorCapaDoFilme from "../componentes/estruturais/MenorCapaFilme.componente.js";
//icones
import AntDesign from "@expo/vector-icons/AntDesign";
import { local } from "../funçoes/IpOuLocalhost.js";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import Ionicons from '@expo/vector-icons/Ionicons';

// Estilos
const EstruturaDaPaginaDosAmigos = StyleSheet.create({
  ViewQueCentralizaCadaPostagem: {
    flex: 1,
    width: "100%",
    borderBottomWidth: 1,
    borderBottomColor: "#ffffff",
    paddingVertical: 10,
  },
  AreaSuperior: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
  },
  SecaoEsquerda: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  SecaoDireita: {
    flex: 2,
    flexDirection: "column",
    marginLeft: 10, // Espaço entre a capa do filme e as informações do usuário
  },
  Nome: {
    color: "#ffffff",
    fontSize: 16,
    marginLeft: 5,
  },
  NomeFoto: {
    flexDirection: "row",
    alignItems: "center",
  },
  headerImage: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight: 5,
  },
  comentarioEstilizacao: {
    fontSize: 13,
    color: "#ffffff",
    marginTop: 5,
  },
  ComentarioDoUsuarioView: {
    flex: 3,
  },
  UsuarioEsuasInformacoes: {
    flex: 1,
    textAlign: "left",
    marginLeft: 40,
  },
  Nome: {
    color: "#ffffff",
    fontSize: 16,
    marginLeft: 5,
    alignItems: "center",
  },
  NomeFoto: {
flexDirection: "row",
justifyContent: 'left',

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
  },
  ViewIconeDeFeedBack: {
    flex: 1,
    justifyContent: "left",
    alignItems: "center",
    padding: 3,
    flexDirection: 'row',
  },
  headerImage: {
    width: 30,
    height: 30,
    borderRadius: 60,
    marginRight: 2,
  },
});

// Componente funcional Corpo
const Corpo = ({ item, likes, DarLike, calcularCurtidas, verificarCurtida, curtiu, RemoverLike }) => {
  const [postCurtiu, setPostCurtiu] = useState(curtiu);
  useEffect(() => {
    calcularCurtidas(item.id);
    verificarCurtida(item.id).then(setPostCurtiu);
  }, [item.id]);
  const navigation = useNavigation();

  return (
    <View style={EstruturaDaPaginaDosAmigos.ViewQueCentralizaCadaPostagem}>
      <View style={EstruturaDaPaginaDosAmigos.AreaSuperior}>
        <TouchableOpacity onPress={() => navigation.navigate("InformaçoesFilme", { id: item.filme_id })}>
          <MenorCapaDoFilme 
            tamonhoMenorOuMaiorrStingVazia={"Menor"}
            propriedadeParaReceberAcapaDoFilme={item.capaDoFilme}
          />
        </TouchableOpacity>
        
        <View style={EstruturaDaPaginaDosAmigos.SecaoDireita}>
          <View style={EstruturaDaPaginaDosAmigos.NomeFoto}>
            <TouchableOpacity onPress={() => navigation.navigate("PerfilDosAmigos", { id: item.credenciais_id, nome: item.nomeDoUsuario })}>
              <Image
                source={{ uri: `http://${local}:3000/${item.foto}` }}
                style={EstruturaDaPaginaDosAmigos.headerImage}
              />
            </TouchableOpacity>
            <Text style={EstruturaDaPaginaDosAmigos.Nome}>{item.autor}</Text>
          </View>
          <Text style={[EstruturaDaPaginaDosAmigos.Nome, { fontSize: 10 }]}>{item.data_postagem}</Text>
          <Text style={EstruturaDaPaginaDosAmigos.comentarioEstilizacao}>{item.texto}</Text>
        </View>
      </View>
      <View style={EstruturaDaPaginaDosAmigos.AreaInferior}>
      
        <View style={EstruturaDaPaginaDosAmigos.ViewIconeDeFeedBack}>
          
          {postCurtiu === true ? (
            <TouchableOpacity
              style={[EstruturaDaPaginaDosAmigos.ViewIconeDeFeedBack,{flex:0}]}
              onPress={() => {RemoverLike(item.id); setPostCurtiu(false)}} // Remover o like
            >
             <Ionicons name="heart-sharp" size={24} color="#ab49cc" />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
            style={[EstruturaDaPaginaDosAmigos.ViewIconeDeFeedBack,{flex:0}]}
              onPress={() => {DarLike(item.id); setPostCurtiu(true)}} // Adicionar o like
            >
              <Ionicons name="heart-outline" size={24} color="#bbccdd" />
              
            </TouchableOpacity>
            
          )
          }
          <Text style={{ color: "white",marginLeft: 30 }}>{likes[item.id] || 0} </Text>
        </View>
      </View>
    </View>
  );
};

// Componente principal Amigos
const Amigos = () => {
  const [likes, setLikes] = useState({});
  const [data, setData] = useState([]);
  const [curtiu, setCurtiu] = useState(false);
  const navigation = useNavigation();

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
      return resposta.data.curtiu;
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
    const aEnviar = { idDoPost: id };
    try {
      await axios.post(
        `http://${local}:3000/Amigos/CurtirReviewDosAmigos`,
        aEnviar,
        config
      );
      calcularCurtidas(id);
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
    const aEnviar = { idDoPost};

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
  const buscarPostagens = async () => {
    const token = await AsyncStorage.getItem("@token");
    const config = {
      headers: { Authorization: `${token}` },
    };
    try {
      const resposta = await axios.get(
        `http://${local}:3000/Amigos/BuscarPostsDosMeusAmigos`,
        config
      );
      setData(resposta.data.publicacoes);
    } catch (err) {
      console.log(`Erro ao buscar postagens: ${err}`);
    }
  };

  useEffect(() => {
    buscarPostagens();
  }, []);

  return (
    <View style={ViewPrincipal.estilo}>
      <StatusBar />
      <Header ativarMenuTrueFalse={() => navigation.openDrawer()} />
      <View style={[ViewCentralCorpoDoAPP.estilo, { width: "100%" }]}>
        <FlatList
          data={data}
          renderItem={({ item }) => (
            <Corpo
              item={item}
              likes={likes}
              DarLike={DarLike}
              calcularCurtidas={calcularCurtidas}
              verificarCurtida={verificarCurtida}
              curtiu={curtiu}
              RemoverLike={RemoverLike}
            />
          )}
          keyExtractor={(item) => item.id.toString()}
        />
      </View>
    </View>
  );
};

export default Amigos;
