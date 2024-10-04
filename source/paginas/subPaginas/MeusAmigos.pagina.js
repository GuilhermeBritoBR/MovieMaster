import { StyleSheet, View, TouchableOpacity, Image, FlatList } from "react-native"
import { ViewCentralCorpoDoAPP, ViewPrincipal } from "../../estilos/EstilosEstruturais.estilos"
import { Text } from "react-native"
import { useState } from "react"


export default function MeusAmigos(){
    const [meusAmigos, setMeusAmigos] = useState([]);
    return(
        <View style={[ViewPrincipal.estilo,{width: '100%'}]}>
            <View style={ViewCentralCorpoDoAPP.estilo}>
                <View style={{flex: 1}}>
                <FlatList
                data={meusAmigos}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <TouchableOpacity style={Estilos.Linha}>
                    <Image source={item.foto}
                    />
                    <Text>{item.nome}</Text>
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
    }
}))

