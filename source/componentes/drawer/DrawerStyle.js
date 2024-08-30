import * as React from "react";

import { useState, useEffect } from "react";

import { View, Image, Text, TouchableOpacity, StyleSheet } from "react-native";

import { LinearGradient } from "expo-linear-gradient";

//local armazenamento

import AsyncStorage from "@react-native-async-storage/async-storage";

//deletar tokens

import DeletarTokenFuncao from "../../funçoes/DeletarToken.funcao";

//axios para a conexão com api

import axios from "axios";

import {

  DrawerContentScrollView,

  DrawerItemList,

} from "@react-navigation/drawer";

//ip ou local

import { local } from "../../funçoes/IpOuLocalhost";

//NAVEGAÇÃO

import { useNavigation } from "@react-navigation/native";

import { BuscarNome } from "../../funçoes/BuscarNome.funcao";





export default function DrawerStyle(props) {

    //hooks

    const [nome, setNome] = useState("");

    //monitorar entrada de dados

    useEffect(()=>{
        const BuscarNomeLocal = async()=>{
            const nome = await BuscarNome();
            setNome(nome);
        };

        BuscarNomeLocal();
    },[nome]);

    async function DeslogarUsuario() {

      const token = await AsyncStorage.getItem('@token');
      console.log(`Função de Logout foi chamada. Segue o valor do token: ${token}`);

      try {

        await AsyncStorage.removeItem("@token");

        await axios.post(`http://${local}:3000/logout`,null, {

            headers: { Authorization: `Bearer ${token}` }

        });

        alert("Você foi desconectado! Entre novamente para ter acesso.");

        props.navigation.navigate('Login');

      } catch (err) {

        console.log(`Erro ao apagar token e realizar logout: ${err}`);

      }

    }

  

    return (

      <DrawerContentScrollView {...props}>

        {/* header */}
        <View style={styles.ViewPrincipalDoDrawer}>
          <Image
            source={require('../../arquivos/icones/MusashiPraying.png')}
            style={styles.headerImage}
          />
          <Text style={styles.headerText}>{nome}</Text>
        </View>

        {/* paginas */}
        <DrawerItemList {...props} />
        <TouchableOpacity style={styles.BotaoLogout} onPress={() => DeslogarUsuario()}>
           
            <Text style={styles.buttonText}>Sair</Text>

        </TouchableOpacity>

      </DrawerContentScrollView>

    );

  }

  

  const styles = StyleSheet.create({
    ViewPrincipalDoDrawer: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 12,
    },
    headerImage: {
      width: 80,
      height: 80,
      borderRadius: 80, // deixa a imagem redonda
      marginRight: 20, 
    },
    headerText: {
      fontSize: 20,
      color: 'white',
      textAlign: 'left',
    },

    BotaoLogout: {
      width: 260,
      height: 50,   
      backgroundColor: '#242424',
      alignItems: 'center',
      padding:10,
      marginTop: 20,
      textAlign: 'left',

    },

    buttonGradient: {
      width: '100%',
      backgroundColor: '#6237A0',
      alignItems: 'center',
      justifyContent: 'center',
      height: 50,
      borderRadius: 15,

    },

    buttonText: {
      color: 'white',
      fontSize: 18,
      textAlign: 'left',

    },

  });