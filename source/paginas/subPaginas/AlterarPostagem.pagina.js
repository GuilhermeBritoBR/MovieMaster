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

export default function AlterarPostagem() {
    const route = useRoute();
    const id_do_post = route.params.id_do_post;
    const capaDoFilme = route.params.capa;
    const TituloDoFilme = route.params.TituloDoFilme;
    console.log(id_do_post);
    const idFilme = route.params.filme_id;
    const navigation = useNavigation();
    const texto = route.params.texto;
    //states de dados para postar
    const [conteudoDaPublicacao , setandoConteudoDaPublicacao] = useState(`${texto}`);
    const [favorito, setandoFavorito] = useState(false);
    const [nota, setNota] = useState(0);
    console.log(`id do filme: ${idFilme}`);
    useEffect(()=>{

    },[id_do_post, capaDoFilme, TituloDoFilme, idFilme, texto])
//função

const EditarPostagem= async()=>{
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

    const filmeID = idFilme;
    const dadosAenviar = {
      id_do_post,
      conteudoDaPublicacao,
      filmeID,
      dataDaPublicacao,
      nota,
      favorito,     
    };
    const token = await AsyncStorage.getItem("@token");
    const config = {
      headers: {
        Authorization: `${token}`,
      },
    };
    try {
      await axios.put(  
        `http://${local}:3000/Amigos/EditarPublicacao`,
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
  }}

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
                <Text style={styles.title}>{TituloDoFilme}</Text>
                <Image source={{ uri: capaDoFilme }} style={styles.image} />
            </View>

            {/* Data de visualização */}
            <Text style={styles.date}>{new Date().toLocaleDateString()}</Text>

            {/* Avaliação */}
            
            {/* Caixa de texto para a review */}
            <TextInput
                editable
                multiline
                numberOfLines={4}
                maxLength={1000}
                onChangeText={setandoConteudoDaPublicacao}
                value={conteudoDaPublicacao}
                style={styles.textInput}
                placeholder="Escreva sua review aqui... (Opcional)"
              placeholderTextColor={"white"}
            />

            {/* Botão para postar a review */}
            <TouchableOpacity onPress={()=> EditarPostagem()} style={styles.button}>
                <Text style={styles.buttonText}>Alterar Review</Text>
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
        color: "#ffffff",
        
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
