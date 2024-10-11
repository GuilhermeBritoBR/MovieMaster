import { StyleSheet, View, TouchableOpacity, Image, FlatList, Text } from "react-native"
import { ViewCentralCorpoDoAPP, ViewPrincipal } from "../../estilos/EstilosEstruturais.estilos"

import { useState, useEffect } from "react"
import { useRoute } from "@react-navigation/native"
import HeaderRetorno from "../../componentes/estruturais/HeaderRetorno.componente";
import { useNavigation } from "@react-navigation/native";
import { local } from "../../funçoes/IpOuLocalhost";

export default function MeusSeguidores(){
    const navigation = useNavigation();
    const route = useRoute();
    const bruto = route.params.seguidores;
    const [MeusSeguidores, setMeusSeguidores] = useState([]);
   
    
    useEffect(()=>{
        setMeusSeguidores(bruto)
    },[bruto])
    

    return(
        <View style={[ViewPrincipal.estilo,{width: '100%'}]}>
            <HeaderRetorno voltarApaginaAnterior={()=> navigation.goBack()}/>
            <View style={[ViewCentralCorpoDoAPP.estilo,{width: '100%'}]}>
                <View style={{flex: 1}}>
                <FlatList
                data={MeusSeguidores}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <TouchableOpacity style={Estilos.Linha} onPress={()=> navigation.navigate('PerfilDosAmigos',{id:item.id, nome: item.nome})}>
                    <Image
            source={
            {uri: `http://${local}:3000/${item.foto}`}
            }
            style={Estilos.headerImage}
          />
                    <Text style={{color:'#ffffff'}}>{item.nome}</Text>
                    </TouchableOpacity>
            )}
          />    
                </View>
            </View>
        </View>
    )
}

const Estilos = StyleSheet.create(({
    Linha:{
        width: '100%',
        height: 60,
        backgroundColor: "#1A1A1A",
        justifyContent: "center",
        alignItems: "center",
        borderBottom: "solid",
        borderBottomColor: "#ffffff",
        borderBottomWidth: 1,
    },
    headerImage: {
        width: 30,
        height: 30,
        borderRadius: 60, // deixa a imagem redonda
        marginRight: 2, 
      },
}))

