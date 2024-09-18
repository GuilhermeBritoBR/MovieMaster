import { Text, View, TouchableOpacity, TextInput, StyleSheet } from "react-native";
//para a conexão
import axios from "axios";
//para buscar token
import AsyncStorage from "@react-native-async-storage/async-storage";
//endereçamento
import { local } from "../../funçoes/IpOuLocalhost";
import { useState } from "react";
//funções
import VerificarConteudoDoObjetoFuncao from "../../funçoes/VerificarConteudoDoObjeto.funcao";

export default function PublicarPostagem({idDoFilme}) {
    //states de dados
    const [conteudoDaPublicacao , setandoConteudoDaPublicacao] = useState("");

  const postarPublicacao = async () => {
    const Verificacao = await VerificarConteudoDoObjetoFuncao(conteudoDaPublicacao, 3);
    if( Verificacao = 1){
    const dataDaPublicacao = new Date().toISOString();
    const filmeID = 1;
    const dadosAenviar = {
      conteudoDaPublicacao,
      filmeID,
      dataDaPublicacao,
    };
    const token = await AsyncStorage.getItem("@token");
    const config = {
      headers: {
        Authorization: `${token}`,
      },
    };
    try {
      await axios.post(
        `http://${local}:3000/Amigos/PostarPublicacao`,
        dadosAenviar,
        config
      );
      alert("Postagem realizada!");
    } catch (err) {
      alert(`Segue o erro ao se cadastrar: ${err}`);
      console.log(`Segue o erro ao se cadastrar: ${err}`);
    }
}else{
    alert("Por favor, preencha os campos!");
}
  };

  return (
    <View style={{ width: "100%", flex: 1 }}>
      <TouchableOpacity onPress={() => postarPublicacao()}>
        <Text>TESTAR FUNÇÃO</Text>
      </TouchableOpacity>
      <TextInput
        editable
        multiline
        numberOfLines={4}
        maxLength={1000}
        onChangeText={(texto) => setandoConteudoDaPublicacao(texto)}
        value={conteudoDaPublicacao}
        style={{ padding: 10 }}
      />

    </View>
  );
}

const EstilizacaoDoPagina = StyleSheet.create({
    areaDoConteudo: {
        border: 'solid',

    },
})