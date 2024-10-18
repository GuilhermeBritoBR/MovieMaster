import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, StatusBar } from 'react-native';
import axios from 'axios';
import { local } from '../../funçoes/IpOuLocalhost';
// Importando estilos estruturais para manter consistência com outras páginas
import { ViewPrincipal, ViewCentralCorpoDoAPP } from '../../estilos/EstilosEstruturais.estilos';
import Header from '../../componentes/estruturais/Header.componente';

export default function AdicionarLista() {
  const route = useRoute();
  const idDoFilme = route.params.id;
  const capaURL = route.params.dados.poster_path;
  const titulo = route.params.dados.title;
  const [listas, setListas] = useState([]);
    const navigation = useNavigation();
    const fetchListas = async () => {
        const token = await AsyncStorage.getItem("@token");
        const config = {
          headers: {
            'Authorization': token
          }
        };
        try {
          const response = await axios.get(`http://${local}:3000/Lista/BuscarMinhasListas`, config);
          console.log('Dados recebidos da API:', response.data); // Para verificar o retorno da API
          setListas(response.data);
        } catch (err) {
          console.log(`Erro ao buscar listas: ${err}`);
          alert("Erro ao carregar listas! Tente novamente!");
        }
      };
  useEffect(() => {
    fetchListas();
  }, [idDoFilme]);

  const AdicionarFilmeALista = async (idDoFilme, idDaLista) => {
    const token = await AsyncStorage.getItem("@token");
    const aEnviar = {
    idDoFilme, idDaLista, capaURL, titulo 
    };
    const config = {
      headers: {
        'Authorization': token
      }
    };

    try {
      await axios.put(`http://${local}:3000/Lista/AdicionarFilmeALista`, aEnviar, config);
      alert("Filme adicionado à lista com sucesso!");
    } catch (err) {
      console.log(`Segue o erro: ${err}`);
      alert("Erro! Tente novamente!");
    }
  };

  const ListaItem = ({ item }) => (
    <View style={styles.bloco}>
      <TouchableOpacity style={styles.listItem} onPress={() => AdicionarFilmeALista(idDoFilme, item.id)}>
        <Text style={{ color: 'white' }}>Teste de exibição</Text>
        <Text style={styles.listText}>{item.nome_lista} lista</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={ViewPrincipal.estilo}>
      <StatusBar />
      <Header ativarMenuTrueFalse={() => navigation.openDrawer()} />
      <View style={[ViewCentralCorpoDoAPP.estilo, styles.container]}>
        <Text style={styles.title}>Escolha uma lista para adicionar o filme:</Text>
        <FlatList
          data={listas}
          keyExtractor={(item, index) => item.id ? item.id.toString() : index.toString()} // Verificação de fallback seguro
          renderItem={ListaItem}
          contentContainerStyle={styles.listContainer}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 20,
    textAlign: 'center',
  },
  listContainer: {
    paddingBottom: 20,
    flex: 1,
  },
  listItem: {
    backgroundColor: '#333',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    alignItems: 'center',
    width: '100%',
    height: 100,
  },
  listText: {
    fontSize: 18,
    color: '#ffffff',
  },
  bloco: {
    flex: 1,
    width: '100%',
    flexDirection: 'column',
    borderBottomWidth: 1,
    borderBottomColor: '#ffffff',
    borderStyle: 'solid',
  }
});
