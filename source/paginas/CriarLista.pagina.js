import { View, Text, TextInput, TouchableOpacity, StyleSheet  } from "react-native"
//estilizações
import { ViewCentralCorpoDoAPP, ViewPrincipal } from "../estilos/EstilosEstruturais.estilos"
import react from "react"
import {useState, useEffect} from 'react';
import axios from "axios";
import { local } from "../funçoes/IpOuLocalhost";
import AsyncStorage from "@react-native-async-storage/async-storage";
export default function CriarLista(){
    const [lista, setLista] = useState("");
    const criarLista = async()=>{
        const filmesArray = [{
            idFilme: 0 ,
            capaURL: "",
            nome: "",
        }]
        const config = {
            lista, filmesArray
        }
        const token = await AsyncStorage.getItem('@token');
        const tokens = {
            headers: {
              Authorization: `${token}`,
            },};
        try{
            await axios.post(`http://${local}:3000/Listas/CriarListaDeFilmes`, config,tokens);
            alert("Lista criada com sucesso!");
        }catch(err){
            console.log(`Lista criada ${err}`);
        }
    }

   
    return(
        <View style={ViewPrincipal.estilo}>
            <View style={ViewCentralCorpoDoAPP.estilo}>
                <TextInput
                placeholder={'Nome da lista...'}
                onChangeText={(text)=> setLista(text)}
                style={{width: 200, heigth: 40, border: 'solid', borderWidth: 1, borderColor: '#ffffff', color: '#ffffff'}}
                />
                <TouchableOpacity style={styles.btnredirecionamento} onPress={()=> criarLista()}>
          <Text style={styles.buttonText}>Cadastro</Text>
        </TouchableOpacity>
            </View>
        </View>
    )
}
const styles = StyleSheet.create(({
    btnredirecionamento: {
        paddingBottom: 50,
        paddingTop: 20,
      },
      buttonText: {
        color: "white",
        fontSize: 16,
      },
}))