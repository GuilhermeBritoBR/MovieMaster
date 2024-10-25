import { Text, View, TouchableOpacity, TextInput, StyleSheet, Image } from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { local } from "../../funçoes/IpOuLocalhost";
import VerificarConteudoDoObjetoFuncao from "../../funçoes/VerificarConteudoDoObjeto.funcao";
import { StatusBar } from "react-native";
//importe dos icones//
import Entypo from '@expo/vector-icons/Entypo';
import AntDesign from '@expo/vector-icons/AntDesign';

import { useRoute } from "@react-navigation/native";
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
    const [likesDaPostagem, setlikesDaPostagem] = useState(0);
//função
const route = useRoute();
  var id = route.params.id;
  var Dados = route.params.dados;
  

  const postarPublicacao = async () => { 
      //buscar dados
    const token = await AsyncStorage.getItem("@token");
    
const config = {
  headers: {
    Authorization: `${token}`,
  },}; 
  
  const tituloDoFilme = Dados.title;
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
    const filmeID = id;
    const autor = await AsyncStorage.getItem("@name");
    const tituloDoFilme = Dados.title;
    const capaDoFilme = `https://image.tmdb.org/t/p/w500${Dados.poster_path}`;
    const dadosAenviar = {
      conteudoDaPublicacao,
      filmeID,
      dataDaPublicacao,
      nota,
      favorito,
      autor,
      tituloDoFilme,
      likesDaPostagem,
      capaDoFilme
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

 //definir nota
const clicarNaEstrela = (index) =>{
    console.log(nota);
    setNota(index + 1); 
    
}
    useEffect(()=>{},[id,Dados ])
    return (
        <View style={styles.container}>
            {/* Título e imagem */}
            <StatusBar backgroundColor={'#000000'}/>
       {/* Observe que este header retorna a página anterior */}
       <HeaderRetorno voltarApaginaAnterior={()=> navigation.goBack("")}/>
        <View style={{flex:1, padding: 16}}>
            <View style={styles.header}>
                <Text style={styles.title}>{Dados.title}</Text>
                <Image source={{ uri: `https://image.tmdb.org/t/p/w500${Dados.poster_path}` }} style={styles.image} />
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
