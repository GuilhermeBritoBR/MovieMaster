import { Text, View, TouchableOpacity, TextInput, StyleSheet, FlatList, Modal } from "react-native";
//para a conexão
import axios from "axios";
//para buscar token
import AsyncStorage from "@react-native-async-storage/async-storage";
//endereçamento
import { local } from "../../funçoes/IpOuLocalhost";
import { useEffect, useState } from "react";
//funções
import VerificarConteudoDoObjetoFuncao from "../../funçoes/VerificarConteudoDoObjeto.funcao";
import { useNavigation } from "@react-navigation/native";
import { Alert } from "react-native";

export default function PublicarPostagem({idDoFilme}) {
  const navigation = useNavigation();
    //states de dados para postar
    const [conteudoDaPublicacao , setandoConteudoDaPublicacao] = useState("");
//função
  const postarPublicacao = async () => { 
    const token = await AsyncStorage.getItem("@token");
const config = {
  headers: {
    Authorization: `${token}`,
  },};   
    if( conteudoDaPublicacao.length >= 3){
      const date = new Date();
      const options = {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit',
          timeZoneName: undefined // Remove a exibição do fuso horário
      }; 
    const dataDaPublicacao = date.toLocaleString('pt-BR', options).replace(/ GMT.*$/, ''); //remove esse GMT
    const filmeID = 1;
    const dadosAenviar = {
      conteudoDaPublicacao,
      filmeID,
      dataDaPublicacao,
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
  //função deletar post
  const DeletarPost = async(id_do_post)=>{
    const token = await AsyncStorage.getItem("@token");
const config = {
  headers: {
    Authorization: `${token}`,
  },};
    const dadosAenviar = {
      id_do_post,
    }
    console.log(`Segue o ID: ${id_do_post}`);
    
            try {
                await axios.delete(`http://${local}:3000/Amigos/DeletarPublicacao/${id_do_post}`,config, dadosAenviar);
                alert('Deletado com sucesso!');
            } catch (err) {
                console.log(`Segue o erro: ${err}`);
            }
            console.log("Item excluído");
        

  };
//componente para a flat list tratar os dados
 const Publicacao = ({nomeDoUsuario,data_postagem,filme_id, texto, id_do_post}) => (
  <View style={{ flex: 1, margin: 10, border: 'solid 1px black' }}>
    <Text style={{color: 'black', fontSize: 18}}>Nome:{nomeDoUsuario}</Text>
    <Text style={{color: 'black', fontSize: 18}}>Data:{data_postagem}</Text>
    <Text style={{color: 'black', fontSize: 18}}>Filme:{filme_id}</Text>
    <Text style={{color: 'black', fontSize: 18}}>Conteudo:{texto}</Text>
    <TouchableOpacity onPress={()=> navigation.navigate('AlterarPostagem', {id_do_post})}>
      <Text>Alterar Informações</Text>
    </TouchableOpacity>
    <TouchableOpacity onPress={()=> DeletarPost(id_do_post)}>
      <Text>Deletar post</Text>
    </TouchableOpacity>
    
  </View>
)
//receber dados
//states necessárias
const [MeusTreinos, setandoMeusTreinos] = useState([]);
//função
  const ReceberMinhasPostagens = async()=>{
    const token = await AsyncStorage.getItem("@token");
const config = {
  headers: {
    Authorization: `${token}`,
  },};
    try{
      const resposta = await axios.get(`http://${local}:3000/Amigos/ReceberPublicacao`, config);
      setandoMeusTreinos(resposta.data);
    }catch(err){
      console.error(`Erro ao buscar treinos: segue o tal ${err}`);
    }
  }
  //monitorar coleta GET
  useEffect(()=>{
    ReceberMinhasPostagens();
  },[])
  //modal de alterar dados
 
  return (
    <View style={{ width: "100%", flex: 1 }}>
      
      <View style={{ flex: 1 }}>
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
        style={{ padding: 10, border: 'solid 1px black' }}
      />
    </View>
    <View style={{  flex: 1 , backgroundColor: 'red'}}>
        <FlatList
        style={{ width: "100%", flex: 1 , backgroundColor: 'blue'}}
          data={MeusTreinos}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item}) => (
            <Publicacao
            nomeDoUsuario={item.nomeDoUsuario}
            data_postagem={item.data_postagem}
            filme_id={item.filme_id}
            texto={item.texto}
            id_do_post={item.id}
            />
          )}
        />
        <TouchableOpacity onPress={()=> ReceberMinhasPostagens()}>
          <Text>CHAMAR DADOS</Text>
        </TouchableOpacity>
    </View>
    </View>
  );
};
