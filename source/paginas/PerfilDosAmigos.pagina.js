  import React from 'react';
  import { StatusBar } from "react-native";
  import { StyleSheet, Text, View, ScrollView, Image, TouchableOpacity, FlatList } from "react-native";

  // ESTILOS IMPORTADOS
  import { ViewCentralCorpoDoAPP, ViewPrincipal } from "../estilos/EstilosEstruturais.estilos";

  // Componentes
  import HeaderRetorno from "../componentes/estruturais/HeaderRetorno.componente";
  import CapaDoFilme from '../componentes/estruturais/CapaDoFilme.componente';
  import { useState, useEffect } from 'react';
  // Navegação
  import { useNavigation } from "@react-navigation/native";
  import { BuscarNome } from '../funçoes/BuscarNome.funcao';
  // Textos
  import H3 from "../componentes/textos/h3.componente";
  import { useRoute } from '@react-navigation/native';
  import AsyncStorage from '@react-native-async-storage/async-storage';
  import { local } from '../funçoes/IpOuLocalhost';
  import Icon from 'react-native-vector-icons/FontAwesome';
  import axios from 'axios';
  import { useIsFocused } from '@react-navigation/native';

  export default function PerfilDosAmigos() {
    const [isAmigo, setIsAmigo] = useState(false);
    const [loading, setLoading] = useState(true);
    const [foto, setFoto] = useState('');
    const [amigosBruto, setAmigosBruto] = useState(true);
    const isFocused = useIsFocused();
    const route = useRoute();
    var id = route.params.id;
    const nome = route.params.nome;
    // Constante de navegação
    const navigation = useNavigation();
  //constanstes de dados
  const [meusFavoritos, setandoMeusFavoritos] = useState([]);
    // Dados para a FlatList
    const BuscarDadosDoAmigo = async() =>{
        const token = await AsyncStorage.getItem("@token");
      const config = {
        headers: {
          Authorization: `${token}`,
        },};

          try{
            const resposta = await axios.get(`http://${local}:3000/Pesquisa/BuscarFilmesFavoritosDosAmigos/${id}`,config);
            setandoMeusFavoritos(resposta.data.resposta);
          }catch(err){
            console.error(`Erro ao buscar treinos: segue o tal ${err}`);
          }
        
    }
    
    useEffect(()=>{
      BuscarDadosDoAmigo();
    },[id, ]);
    const BuscarAmigos = async () => {
      const token = await AsyncStorage.getItem("@token");
      const config = {
        headers: {
          Authorization: `${token}`,
        },};
      try {
          const response = await axios.get(`http://${local}:3000/Amigos/VerificarAmigos`, config );
          
          const foto = await axios.get(`http://${local}:3000/Perfil/BuscarFotoDePerfilDosAmigos/${id}`, config );
          const resposta = foto.data.foto;
          setFoto(resposta);
          const amigos = response.data.amigos;

          if (amigos.includes(id)) {
              setIsAmigo(true);
          } else {
              setIsAmigo(false);
          }
          setLoading(false);
      } catch (error) {
          console.error('Erro ao buscar amigos:', error);
          setLoading(false);
      }
  };
    const AdicionarAmigo = async(id_amigo)=>{
      const token = await AsyncStorage.getItem("@token");
      const config = {
        headers: {
          Authorization: `${token}`,
        },};
        const aEnviar = {
          id_amigo: id
        };
        try{
          await axios.put(`http://${local}:3000/Amigos/AdicionarAmigo`,aEnviar, config);
          console.log("Deu certo! Amigo adicionado!");
        }catch(err){
          console.error(`Erro ao buscar treinos: segue o tal ${err}`);
        }
    };
    const AlterarBotao =async  () => {
      if (isAmigo) {
          await removerAmigo();
          setIsAmigo(false);
      } else {
          await AdicionarAmigo();
          setIsAmigo(true);
      }
  };
  const removerAmigo = async (id_amigo) => {
    const token = await AsyncStorage.getItem("@token");
      const config = {
        headers: {
          Authorization: `${token}`,
        },};
    try {
        await axios.put(`http://${local}:3000/Amigos/RemoverAmigo`, { id_amigo: id }, config);
        setIsAmigo(false);
        alert('Amigo removido com sucesso');
    } catch (error) {
        console.error('Erro ao remover amigo:', error);
    }
};
  useEffect(() => {
    BuscarAmigos();
}, [foto]);
if (isFocused) {
  BuscarAmigos();
}
if (loading) {
    return <Text>Carregando...</Text>;
}
    return (
      <View style={[ViewPrincipal.estilo,{width: '100%'}]}>
        <StatusBar backgroundColor={'#1A1A1A'} />
        <HeaderRetorno voltarApaginaAnterior={() => navigation.goBack()} />

        <ScrollView style={[ViewCentralCorpoDoAPP.estilo,{width: '100%'}]}>

          <View style={styles.ViewComFotoDoPerfil}>
            <Image
              source={ {uri: `http://${local}:3000/${foto}`} } 
              style={styles.profileImage}
            />
            <Text style={styles.txtnome}>{nome}
            </Text>
          </View>
          <TouchableOpacity 
    style={{flexDirection: 'row', 
      alignItems: 'center', 
      padding: 10, 
      backgroundColor: isAmigo ? '#ff4d4d' : '#4caf50', 
      borderRadius: 5 }} 
    onPress={AlterarBotao}
>
    <Icon 
        name={isAmigo ? 'user-times' : 'user-plus'} // Ícone que muda dependendo do estado
        size={20} 
        color="#fff" 
        style={{ marginRight: 10 }} 
    />
    <Text style={{ color: 'white', fontSize: 16 }}>
        {isAmigo ? 'Remover Amigo' : 'Adicionar Amigo'}
    </Text>
</TouchableOpacity>
          {/* View Filmes Favoritos */}
          <View style={{borderBottomColor: '6F6D6D', borderBottomWidth: 1, padding: 10,}}>
            <Text style={styles.textoprincipal}>Filmes Favoritos</Text>
            <FlatList
            style={{flex: 1}}
              horizontal
              data={meusFavoritos}
              keyExtractor={(item)=> item.id}
              renderItem={({ item }) => (
                <View style={{flex:1}}>
                  <TouchableOpacity onPress={()=>navigation.navigate("InformaçoesFilme",{id: item.filme_id})}>
                <CapaDoFilme propriedadeParaReceberAcapaDoFilme={item.capaDoFilme}/>
                </TouchableOpacity>
                </View>

              )}
            />
          </View>

          {/* View Atividade Recente */}
          <View style={{borderBottomColor: 'white', borderBottomWidth: 1,}}>
            <Text style={styles.textoprincipal}>Atividade Recente</Text>
          </View>

          {/* View Informações */}
          <View style={styles.atividadeRecente}>
            <TouchableOpacity>
              <Text style={styles.textoinfos}>Filmes</Text>
            </TouchableOpacity>

            <TouchableOpacity>
              <Text style={styles.textoinfos}>Reviews</Text>
            </TouchableOpacity>

            <TouchableOpacity>
              <Text style={styles.textoinfos}>Watchlist</Text>
            </TouchableOpacity>

            <TouchableOpacity>
              <Text style={styles.textoinfos}>Filmes curtidos</Text>
            </TouchableOpacity>

            <TouchableOpacity>
              <Text style={styles.textoinfos}>Seguindo</Text>
            </TouchableOpacity>

            <TouchableOpacity>
              <Text style={styles.textoinfos}>Seguidores</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    );
  }

  const styles = StyleSheet.create({
    profileImage: {
      width: 80,
      height: 80,
      borderRadius: 40, // Ajustado para manter a imagem redonda
      marginRight: 20,
      
    },
    ViewComFotoDoPerfil: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 20,
      borderBottomColor: 'white', 
      borderBottomWidth: 1,
      padding: 10,
    },
    textoprincipal: {
      fontSize: 18,
      fontWeight: 'bold',
      marginVertical: 10,
      color: "white",
    },
    atvrecente: {
      fontSize: 16,
      fontWeight: 'bold',
      marginVertical: 10,
    },
    textoinfos: {
      fontSize: 16,
      color: '#C7BEBE',
      paddingVertical: 10,
    },
    filmeItem: {
      marginRight: 15,
      padding: 10,
      backgroundColor: '#eee',
      borderRadius: 5,
    },
    txtnome: {
      fontSize: 20,
      color: 'white',
    },
    atividadeRecente:{
      padding: 10, 
    },
    btnAmigo:{
      
    }
  });
