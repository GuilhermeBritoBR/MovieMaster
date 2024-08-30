import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, ScrollView, Image } from "react-native";
//ESTILOS IMPORTADOS
import { ViewCentralCorpoDoAPP, ViewPrincipal } from "../estilos/EstilosEstruturais.estilos";
//estruturais
import HeaderRetorno from "../componentes/estruturais/HeaderRetorno.componente";
//navegação
import { useNavigation } from "@react-navigation/native";
//textos
import H3 from "../componentes/textos/h3.componente";

export default function Perfil() {
  //constante de navegação
  const navigation = useNavigation("");

  return (
      <View style={ViewPrincipal.estilo}>
        <StatusBar backgroundColor={'#000000'}/>
        <HeaderRetorno voltarApaginaAnterior={()=> navigation.goBack("")}/>
        <ScrollView style={ViewCentralCorpoDoAPP.estilo}>

            <View style={styles.ViewComFotoDoPerfil}>
              <Image/>
              <H3 texto={""}/>
            </View>

        </ScrollView>
      </View>
  );
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#fff",
      alignItems: "center",
      justifyContent: "center",
    },
    profileImage:{
      width: 80,
      height: 80,
      borderRadius: 80, // deixa a imagem redonda
      marginRight: 20,
    },
    ViewComFotoDoPerfil:{
      flex:1,
    },

  });