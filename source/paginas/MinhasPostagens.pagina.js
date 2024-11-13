import { View, Text, TouchableOpacity, FlatList, StyleSheet } from "react-native";
import { useEffect, useState } from "react";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { local } from "../funçoes/IpOuLocalhost";
import { useNavigation } from "@react-navigation/native";
import MenorCapaDoFilme from "../componentes/estruturais/MenorCapaFilme.componente";
import { ViewCentralCorpoDoAPP, ViewPrincipal } from "../estilos/EstilosEstruturais.estilos";
import HeaderRetorno from "../componentes/estruturais/HeaderRetorno.componente";

export default function MinhasPostagens() {
  const navigation = useNavigation();
  const [posts, setandoMeusPosts] = useState([]);

  const ReceberMinhasPostagens = async () => {
    const token = await AsyncStorage.getItem("@token");
    const config = {
      headers: {
        Authorization: `${token}`,
      },
    };
    try {
      const resposta = await axios.get(`http://${local}:3000/Amigos/ReceberPublicacao`, config);
      setandoMeusPosts(resposta.data.publicacoes);
    } catch (err) {
      console.error(`Erro ao buscar postagens: ${err}`);
    }
  };

  const DeletarPost = async (id_do_post) => {
    const token = await AsyncStorage.getItem("@token");
    const config = {
      headers: {
        Authorization: `${token}`,
      },
    };
    try {
      await axios.delete(`http://${local}:3000/Amigos/DeletarPublicacao/${id_do_post}`, config);
      alert('Deletado com sucesso!');
      ReceberMinhasPostagens(); // Atualizar a lista após deletar
    } catch (err) {
      console.error(`Erro ao deletar postagem: ${err}`);
    }
  };

  useEffect(() => {
    ReceberMinhasPostagens();
  }, []);

  const Publicacao = ({ id_do_post, nomeDoUsuario, data_postagem, filme_id, texto, capaDoFilme, TituloDoFilme }) => (
    <View style={styles.postContainer}>
      <View style={styles.header}>
        <MenorCapaDoFilme 
          tamonhoMenorOuMaiorrStingVazia={"Menor"}
          propriedadeParaReceberAcapaDoFilme={capaDoFilme}
        />
        <View style={styles.infoContainer}>
          <Text style={styles.filmTitle}>{TituloDoFilme}</Text>
          <Text style={styles.userName}>{nomeDoUsuario}</Text>
          <Text style={styles.postDate}>{data_postagem}</Text>
          <Text style={styles.comment}>{texto}</Text>
        </View>
      </View>
     
      <View style={styles.actionContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('AlterarPostagem', { id_do_post, filme_id, capa: capaDoFilme, TituloDoFilme, texto })}>
          <Text style={styles.actionText}>Alterar Informações</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => DeletarPost(id_do_post)}>
          <Text style={styles.actionText}>Deletar Post</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={ViewPrincipal.estilo}>
      <HeaderRetorno voltarApaginaAnterior={() => navigation.goBack("")} />
      <View style={[ViewCentralCorpoDoAPP.estilo, { width: '100%' }]}>
        <FlatList
          data={posts}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <Publicacao
              nomeDoUsuario={item.autor}
              data_postagem={item.data_postagem}
              filme_id={item.filme_id}
              texto={item.texto}
              id_do_post={item.id}
              capaDoFilme={item.capaDoFilme}
              TituloDoFilme={item.tituloDoFilme}
            />
          )}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  postContainer: {
    width: '100%',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ffffff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoContainer: {
    marginLeft: 10,
    flex: 1,
  },
  filmTitle: {
    fontSize: 16,
    color: '#ffffff',
    fontWeight: 'bold',
  },
  userName: {
    fontSize: 14,
    color: '#ffffff',
  },
  postDate: {
    fontSize: 12,
    color: '#aaaaaa',
  },
  comment: {
    fontSize: 14,
    color: '#ffffff',
    marginVertical: 5,
  },
  actionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
  },
  actionText: {
    fontSize: 14,
    color: '#ffffff',
    textDecorationLine: 'underline',
  },
});
