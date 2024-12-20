import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Modal, Dimensions, TouchableOpacity } from "react-native";
import Feather from "@expo/vector-icons/Feather";
import AntDesign from "@expo/vector-icons/AntDesign";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Entypo from "@expo/vector-icons/Entypo";
import Ionicons from "@expo/vector-icons/Ionicons";
import axios from "axios";
import { local } from "../../funçoes/IpOuLocalhost";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";


const AvaliacaoModal = ({ visible, onClose, id, dados, titulo, data }) => {
  const navigation = useNavigation();
  const { height } = Dimensions.get("window");
  const [estrelaPreenchida, setEstrelaPreenchida] = useState(0); // Estado das estrelas
  const [olhoPreenchido, setOlhoPreenchido] = useState(false);
  const [coracaoPreenchido, setCoracaoPreenchido] = useState(false);
  const [relogioPreenchido, setRelogioPreenchido] = useState(false);
  const capa = `https://image.tmdb.org/t/p/w500${dados.poster_path}`;

   
  // Função para alternar entre favoritar e desfavoritar estrelas
  const clicarNaEstrela = async (index) => {
    const token = await AsyncStorage.getItem('@token');
    const nota = index + 1;
    const idDoFilme= id;
    try {
      await axios.put(`http://${local}:3000/Filme/AtualizarNota`, 
      { idDoFilme: idDoFilme, nota: nota, capa: capa, titulo: titulo }, 
      { headers: { Authorization: `${token}` } });
      setEstrelaPreenchida(nota); // Atualiza o estado local após favoritar
      console.log("Favorito atualizado com sucesso.");
      verificarFilme(idDoFilme);
    } catch (error) {
      console.error("Erro ao favoritar estrela:", error);
    }
  };

  const remover = async () => {
    const token = await AsyncStorage.getItem('@token');
    const filme_id= id;
    try {
        await axios.put(`http://${local}:3000/Filme/RemoverFavorito`, 
        { filme_id: filme_id }, 
        { headers: { Authorization: `${token}` } });
        setCoracaoPreenchido(false) // Atualiza o estado local para desfavoritar
        console.log("Favorito removido com sucesso.");
        verificarFilme(filme_id);
    } catch (error) {
        console.error("Erro ao remover favorito:", error);
    }
};
const favoritar = async () => {
  const filme_id= id;
  const token = await AsyncStorage.getItem('@token');
  try {
      await axios.put(`http://${local}:3000/Filme/Favoritar`, 
        {filme_id: filme_id ,capa: capa, titulo: titulo} , 
      { headers: { Authorization: `${token}` } });
      setCoracaoPreenchido(true) // Atualiza o estado local para indicar que foi favoritado
      console.log("Filme favoritado com sucesso.");
      verificarFilme(filme_id);
  } catch (error) {
      console.error("Erro ao favoritar filme:", error);
  }
};

const verificarDados = async (filme_id) => {
  const token = await AsyncStorage.getItem('@token');
  try {
      // Faz a requisição à API para verificar os dados de favorito, estrelas e se o filme está na lista "Assistir Mais Tarde"
      const response = await axios.get(`http://${local}:3000/Filme/VerificarDados/${filme_id}`, {
          headers: {
              Authorization: `${token}`,
          },
      });

      const { favorito, estrelas, filmeNaLista } = response.data;

      // Se o usuário nunca interagiu com o filme
      if (favorito === null && estrelas === null) {
          console.log('O usuário ainda não interagiu com esse filme.');
      } else {
          console.log(`Favorito: ${favorito}, Estrelas: ${estrelas}`);
      }

      // Retorna os dados do filme, incluindo o status de "Assistir Mais Tarde"
      return { favorito, estrelas, filmeNaLista };

  } catch (error) {
      console.error('Erro ao verificar dados:', error);
  }
};

// Exemplo de uso
const verificarFilme = async () => {
  const dados = await verificarDados(id);

  if (dados) {
      // Atualizando o estado das estrelas
      setEstrelaPreenchida(dados.estrelas);

      // Atualizando o estado do coração (favorito)
      if (dados.favorito === null) {
          setCoracaoPreenchido(false);
      }
      if (dados.favorito === 1) {
          setCoracaoPreenchido(true);
      }

      // Atualizando o estado do olho (Assistir Mais Tarde)
      if (dados.filmeNaLista) {
          setOlhoPreenchido(true); // O filme está na lista "Assistir Mais Tarde"
      } else {
          setOlhoPreenchido(false); // O filme não está na lista "Assistir Mais Tarde"
      }

      console.log(dados);  // Exibe os dados do filme (favorito, estrelas, filme na lista)
  }
};

const AdicionarFilmeAssistirMaisTarde = async () => {
  const idDoFilme= id;
  const token = await AsyncStorage.getItem("@token"); // Recuperando o token de autenticação do AsyncStorage
  const aEnviar = {
      idDoFilme: idDoFilme, // O ID do filme que você deseja adicionar
      capaURL: capa,   // A URL da capa do filme
      titulo: titulo    // O título do filme
  };

  const config = {
      headers: {
          'Authorization': token  // Adicionando o token no cabeçalho da requisição
      }
  };

  try {
      // Fazendo a requisição PUT para a API, passando os dados e as configurações
      await axios.put(`http://${local}:3000/Lista/AdicionarFilmeMaisTarde`, aEnviar, config);
      setOlhoPreenchido(!olhoPreenchido);
      alert("Filme adicionado à lista 'Assistir Mais Tarde' com sucesso!");
  } catch (err) {
      console.log(`Erro: ${err}`);
      alert("Erro ao adicionar o filme à lista 'Assistir Mais Tarde'. Tente novamente!");
  }
};
const RemoverFilmeAssistirMaisTarde = async () => {
  const token = await AsyncStorage.getItem("@token"); // Recuperando o token de autenticação do AsyncStorage
  const idDoFilme= id;
  const aEnviar = {
      idDoFilme: idDoFilme // O ID do filme que você deseja remover
  };

  const config = {
      headers: {
          'Authorization': token  // Adicionando o token no cabeçalho da requisição
      }
  };

  try {
      // Fazendo a requisição PUT para a API de remoção do filme
      await axios.put(`http://${local}:3000/Lista/RemoverFilmeMaisTarde`, aEnviar, config);
      setOlhoPreenchido(false);
      alert("Filme removido da lista 'Assistir Mais Tarde' com sucesso!");
  } catch (err) {
      console.log(`Erro: ${err}`);
      alert("Erro ao remover o filme da lista 'Assistir Mais Tarde'. Tente novamente!");
  }
};
useEffect(() => {
  // Verifica o filme assim que o id mudar ou o componente for montado
  if (id) {
    verificarFilme();
  }
}, [id]); 
// useEffect(()=>{verificarFilme()},[titulo,data,dados, coracaoPreenchido, olhoPreenchido])
  return (
    <Modal animationType="slide" transparent={true} visible={visible} onRequestClose={onClose}>
      <View style={[styles.modalContainer, { position: "absolute", bottom: 0, left: 0, height: height * 0.6 }]}>
        <View style={styles.modalContent1}>
          <View style={styles.titulodata}>
            <Text style={styles.titulofilme}>{titulo}</Text>
            <Text style={styles.datafilme}>{data}</Text>
          </View>
          <TouchableOpacity onPress={onClose} style={styles.fecharmodal}>
            <AntDesign name="arrowleft" size={24} color="#bbccdd" />
          </TouchableOpacity>
        </View>
        <View style={styles.modalContent2}>
          <View style={styles.elementos}>
            {/* Ícone Olho */}
            <TouchableOpacity 
        style={styles.iconesBotao} 
        onPress={() => olhoPreenchido ? RemoverFilmeAssistirMaisTarde() : AdicionarFilmeAssistirMaisTarde()}
      >
        <MaterialCommunityIcons
          name={olhoPreenchido ? "clock-plus" : "clock-plus-outline"}
          size={45}
          color={olhoPreenchido ? "#ab49cc" : "#bbccdd"}
        />
      </TouchableOpacity>
            {/* Ícone Coração */}
            {/*"heart-outline"* "#bbccdd"*/}
            {coracaoPreenchido === true ? (
              <TouchableOpacity style={styles.iconesBotao} onPress={() => remover()}>
            
              
              <Ionicons
                name={ "heart-sharp" }
                size={45}
                color={"#ab49cc"  }
              />

            </TouchableOpacity>
            ): 
            <TouchableOpacity style={styles.iconesBotao} onPress={()=> favoritar()}>
              
              <Ionicons
                name={ "heart-outline" }
                size={45}
                color={"#bbccdd"}
              />

            </TouchableOpacity>
}
            {/* Ícone Relógio */}
            
          </View>
        </View>
        <View style={styles.modalContent3}>
          <View style={styles.elementos}>
            {[...Array(5)].map((_, index) => (
              <TouchableOpacity key={index} onPress={() => clicarNaEstrela(index)}>
                <Entypo
                  name={index < estrelaPreenchida ? "star" : "star-outlined"}
                  size={45}
                  color={index < estrelaPreenchida ? "#ab49cc" : "#bbccdd"}
                />
              </TouchableOpacity>
            ))}
          </View>
        </View>
        <View style={styles.modalContent4}>
          {/* Botão de Fazer Review */}
          <TouchableOpacity onPress={() => { onClose(); navigation.navigate('PublicarPostagem', { id: id, dados: dados }); }} style={styles.addreview}>
            <Ionicons name="add" size={24} color="#bbccdd" />
            <Text style={styles.reviewText}>Fazer Review</Text>
          </TouchableOpacity>
          {/* Botão de Adicionar na Lista */}
          <TouchableOpacity onPress={() => { onClose(); navigation.navigate('AdicionarLista', { id: id, dados: dados }); }} style={styles.addreview}>
            <Entypo name="add-to-list" size={24} color="#bbccdd" />
            <Text style={styles.reviewText}>Adicionar Na Lista</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    width: "100%",
    height: "60%",
    backgroundColor: "#1A1A1A",
    bottom: 0,
    padding: 10,
  },
  modalContent1: {
    width: "100%",
    height: "10%",
    borderBottomColor: "#bbccdd",
    borderBottomWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  titulofilme: {
    color: "#bbccdd",
    fontSize: 20,
    fontWeight: "bold",
  },
  datafilme: {
    color: "#bbccdd",
    fontSize: 18,
  },
  modalContent2: {
    width: "100%",
    height: "20%",
    borderBottomColor: "#bbccdd",
    borderBottomWidth: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  elementos: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  iconesBotao: {
    marginHorizontal: 20,
  },
  modalContent3: {
    height: "20%",
    width: "100%",
    borderBottomColor: "#bbccdd",
    borderBottomWidth: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent4: {
    height: "50%",
    width: "100%",
    marginHorizontal: 20,
    justifyContent: "flex-start",
    padding: 10,
  },
  fecharmodal: {
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    left: 30,
  },
  addreview: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  reviewText: {
    color: "#bbccdd",
    marginLeft: 10,
  },
  titulodata: {
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 10,
  },
});

export default AvaliacaoModal;
