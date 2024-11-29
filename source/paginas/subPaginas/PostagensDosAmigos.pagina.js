import { View, Text, TouchableOpacity, FlatList, StyleSheet, Image } from "react-native";
import { useEffect, useState } from "react";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { local } from "../../funçoes/IpOuLocalhost";
import { useNavigation, useRoute } from "@react-navigation/native";
import MenorCapaDoFilme from "../../componentes/estruturais/MenorCapaFilme.componente";
import { ViewCentralCorpoDoAPP, ViewPrincipal } from "../../estilos/EstilosEstruturais.estilos";
import HeaderRetorno from "../../componentes/estruturais/HeaderRetorno.componente";
import AntDesign from "@expo/vector-icons/AntDesign";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function PostagensDosAmigos() {
    const route = useRoute();
    const id = route.params.id;
    const navigation = useNavigation();
    const [posts, setandoMeusPosts] = useState([]);
    const [likes, setLikes] = useState({}); // Armazena as curtidas para cada post
    const [curtiuState, setCurtiuState] = useState({}); // Armazena o estado de curtida (true/false) de cada post

    // Função para receber as postagens
    const ReceberMinhasPostagens = async () => {
        const token = await AsyncStorage.getItem("@token");
        const config = {
            headers: {
                Authorization: `${token}`,
            },
        };
        try {
            const resposta = await axios.get(`http://${local}:3000/Amigos/ReceberPublicacoesDosOutrosPerfils/${id}`, config);
            setandoMeusPosts(resposta.data.publicacoes);
        } catch (err) {
            console.error(`Erro ao buscar publicações: ${err}`);
        }
    };


    useEffect(() => {
        ReceberMinhasPostagens();
    }, [id]);

    // Função para renderizar a publicação
    const Publicacao = ({ item, resposta,nomeDoUsuario, data_postagem, filme_id, texto, id_do_post, capaDoFilme, TituloDoFilme, foto }) => {
       
        const [curtidas, setCurtidas] = useState(0);
        const [curti, setCurti] = useState(false);
        const DarLike = async (id) => {
          const token = await AsyncStorage.getItem("@token");
          const config = {
              headers: {
                  Authorization: `${token}`,
              },
          };
          const aEnviar = { idDoPost: item.id };
          try {
              await axios.post(
                  `http://${local}:3000/Amigos/CurtirReviewDosAmigos`,
                  aEnviar,
                  config
              );
              // Atualiza o estado de curtida do post
              setCurtiuState((prev) => ({ ...prev, [id]: true }));
              calcularCurtidas(id); // Atualiza a contagem de curtidas
          } catch (err) {
              console.log(`Erro ao curtir post: ${err}`);
          }
      };
  
      // Função para remover like
      const RemoverLike = async () => {
          const token = await AsyncStorage.getItem("@token");
          const idDoPost = item.id;
          const config = {
              headers: {
                  Authorization: `${token}`,
              },
          };
          const aEnviar = { idDoPost };
  
          try {
              await axios.post(
                  `http://${local}:3000/Amigos/DescurtirReviewDosAmigos`,
                  aEnviar,
                  config
              );
              // Atualiza o estado de curtida do post
              setCurtiuState((prev) => ({ ...prev, [id]: false }));
              calcularCurtidas(id); // Atualiza a contagem de curtidas
          } catch (err) {
              console.log(`Erro ao remover curtida: ${err}`);
          }
      };
  
      // Função para calcular a quantidade de curtidas para um post
      const calcularCurtidas = async () => {
          const token = await AsyncStorage.getItem("@token");
          const config = {
              headers: {
                  Authorization: `${token}`,
              },
          };
          try {
              const resposta = await axios.get(
                  `http://${local}:3000/Amigos/QuantidadeDeCurtidasPorPost/${item.id}`,
                  config
              );
              setCurtidas(resposta.data.totalCurtidas);
              return resposta.data.totalCurtidas;
          } catch (err) {
              console.log(`Erro ao contar curtidas: ${err}`);
          }
      };
  
      // Função para verificar se o post já foi curtido
      const verificarCurtida = async () => {
          const token = await AsyncStorage.getItem("@token");
          const config = {
              headers: {
                  Authorization: `${token}`,
              },
          };
          try {
              const resposta = await axios.get(
                  `http://${local}:3000/Amigos/VerificarCurtirDoPost/${item.id}`,
                  config
              );
              return resposta.data.curtiu;
          } catch (err) {
              console.log(`Erro ao verificar curtida: ${err}`);
          }
      };
      useEffect(() => {
        const checkCurtida = async () => {
            const curtiu = await verificarCurtida(item.id);
            const curtidas = await calcularCurtidas(item.id);
            setCurti(curtiu);
            setCurtidas(curtidas);
        };
        checkCurtida();
    }, [item.id]);
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
                    <Text style={EstruturaDaPaginaDosAmigos.Nome}>{nomeDoUsuario}</Text>
                    <Text style={[EstruturaDaPaginaDosAmigos.Nome, { fontSize: 10 }]}>{data_postagem}</Text>
                  </TouchableOpacity>
                </View>
    
                <Text style={EstruturaDaPaginaDosAmigos.comentarioEstilizacao}>{texto}</Text>
              </View>
            </View>
    
            <View style={EstruturaDaPaginaDosAmigos.AreaInferior}>
              <TouchableOpacity onPress={() => (curti ? RemoverLike() : DarLike())}>
                <Ionicons
                  name={curti ? "heart-sharp" : "heart-outline"}
                  size={24}
                  color={curti ? "#ab49cc" : "gray"}
                />
              </TouchableOpacity>
              <Text style={EstruturaDaPaginaDosAmigos.likesText}>{curtidas}</Text>
            </View>
         
        
      </View>
    );
    };
    const verificarTextoOuNome = (nome) => {
      return nome && nome.trim() !== "" ? nome : "nenhuma postagem com Text";
    };
    return (
        <View style={ViewPrincipal.estilo}>
            <HeaderRetorno voltarApaginaAnterior={() => navigation.goBack("")} />
            <View style={[ViewCentralCorpoDoAPP.estilo, { width: '100%' }]}>
                <FlatList
                    data={posts}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) =>
                        item.length === 0 ? (
                            <View style={EstruturaDaPaginaDosAmigos.ViewQueCentralizaCadaPostagem}>
                                <Image
                                    source={{ uri: `http://${local}:3000/${item.foto}` }}
                                    style={EstruturaDaPaginaDosAmigos.headerImage}
                                />
                                <Text style={{ textAlign: 'center', marginRight: 10, color: '#ffffff', fontSize: 32 }}>
                                    Nada por aqui..
                                </Text>
                            </View>
                        ) : (
                            <Publicacao
                                nomeDoUsuario={item.autor}
                                data_postagem={item.data_postagem}
                                filme_id={item.filme_id}
                                texto={item.texto}
                                id_do_post={item.id}
                                capaDoFilme={item.capaDoFilme}
                                TituloDoFilme={item.tituloDoFilme}
                                foto={item.foto}
                                item={item}
                                resposta={posts}
                            />
                        )
                    }
                />
            </View>
        </View>
    );
}

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

    likesText: {
      color: "white",
      marginLeft: 5,
    },
});
