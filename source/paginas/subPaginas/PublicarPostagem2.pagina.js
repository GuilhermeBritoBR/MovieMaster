import { Text, View, TouchableOpacity, TextInput, StyleSheet, Image } from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { local } from "../../funçoes/IpOuLocalhost";
import VerificarConteudoDoObjetoFuncao from "../../funçoes/VerificarConteudoDoObjeto.funcao";
import { StatusBar } from "react-native";
//importe dos icones//
import Entypo from '@expo/vector-icons/Entypo';
import AntDesign from '@expo/vector-icons/AntDesign';


//para buscar token
//endereçamento
import { useEffect, useState } from "react";
//funções
import { useNavigation } from "@react-navigation/native";
import { Alert } from "react-native";
import HeaderRetorno from "../../componentes/estruturais/HeaderRetorno.componente";
export default function PublicarPostagem({ idDoFilme, imagemDoFilme, tituloDoFilme }) {
    const navigation = useNavigation();
    //states de dados para postar
    const [conteudoDaPublicacao , setandoConteudoDaPublicacao] = useState("");
    const [favorito, setandoFavorito] = useState(false);
    const [nota, setNota] = useState(0);
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
      nota,
      favorito,
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
  },[nota])
  //modal de alterar dados
 //definir nota
const clicarNaEstrela = (index) =>{
    console.log(nota);
    setNota(index + 1); 
    
}
    //base front end
    return (
        <View style={styles.container}>
            {/* Título e imagem */}
            <StatusBar backgroundColor={'#000000'}/>
       {/* Observe que este header retorna a página anterior */}
       <HeaderRetorno voltarApaginaAnterior={()=> navigation.goBack("")}/>
        <View style={{flex:1, padding: 16}}>
            <View style={styles.header}>
                <Text style={styles.title}>{}</Text>
                <Image source={{ uri: "https://a.ltrbxd.com/resized/sm/upload/ye/jq/f3/22/nmb4QhCRmdfNP6rgb81yUFgI83l-0-1000-0-1500-crop.jpg?v=caa3999c6f" }} style={styles.image} />
            </View>

            {/* Data de visualização */}
            <Text style={styles.date}>{new Date().toLocaleDateString()}</Text>

            {/* Avaliação */}
            <View style={styles.avaliacao}>
               {/* Colocar cinco estrelas sem pleonasmo */}
                {[...Array(5)].map((_, index) => (
                    <TouchableOpacity key={index} onPress={() => clicarNaEstrela(index)} >
                    <Entypo 
                    name="star" 
                    size={24} 
                    color={index < nota ? 'gold' : 'gray'} // Cor das estrelas
                />
                </TouchableOpacity>
                ))}
                <TouchableOpacity 
                onPress={()=>setandoFavorito(true)}
                style={styles.coração}>
                <AntDesign name="heart" size={24} 
                color={favorito === true  ? '#7100CA' : 'gray'}/>
                </TouchableOpacity>
            </View>

            {/* Caixa de texto para a review */}
            <TextInput
                editable
                multiline
                numberOfLines={4}
                maxLength={1000}
                onChangeText={setandoConteudoDaPublicacao}
                value={conteudoDaPublicacao}
                style={styles.textInput}
                placeholder="Escreva sua review aqui..."
              placeholderTextColor={"white"}
            />

            {/* Botão para postar a review */}
            <TouchableOpacity onPress={()=> postarPublicacao()} style={styles.button}>
                <Text style={styles.buttonText}>Publicar Review</Text>
            </TouchableOpacity>
        </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        flex: 1,
        
        backgroundColor: "#1A1A1A",
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        borderBottomColor: 'white', 
        borderBottomWidth: 1, 
        padding: 10,
    },
    title: {
        flex: 1,
        fontSize: 15,
        fontWeight: 'bold',
        marginRight: 10,
        color: "#fff",
        
    },
    image: {
        width: 75,
        height: 105,
        borderRadius: 4,
    },
    date: {
        fontSize: 16,
        marginBottom: 10,
        color: "#666",
    },
    avaliacao: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 10,
    },
    coração: {
        marginLeft: 'auto', // empurra o coração para a extremidade direita
    },
    textInput: {
        padding: 10,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 4,
        marginBottom: 10,
        height: 100,
        color: 'white',
    },
    button: {
        backgroundColor: "#7100CA",
        padding: 12,
        borderRadius: 4,
        alignItems: "center",
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
    },
});
