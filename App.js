  import * as React from 'react';
  import { NavigationContainer } from '@react-navigation/native';
  import { useEffect, useState } from 'react';
  import { View, Text, StyleSheet, Image , TouchableOpacity} from 'react-native';
  //paginas
  import Inicio from "./source/paginas/Incio.pagina.js";
  import Login from "./source/paginas/Login.pagina.js";
  import Cadastro from "./source/paginas/Cadastro.pagina.js";
  import AlterarDados from './source/paginas/subPaginas/AlterarDados.pagina.js';
  
  import { VerificarToken } from './source/funçoes/VerificarToken.funcao.js';
  import AsyncStorage from '@react-native-async-storage/async-storage';
  import { createDrawerNavigator } from '@react-navigation/drawer';
  //customoziação do drawer
  import DrawerStyle from './source/componentes/drawer/DrawerStyle.js';
  const Drawer = createDrawerNavigator();
  //icones 
  import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';
  //funções para deslogar usuario
  import DeletarTokenFuncao from './source/funçoes/DeletarToken.funcao.js';
  //para a cone
  import axios from 'axios';
  //icones
  import Feather from '@expo/vector-icons/Feather';
  import MaterialIcons from '@expo/vector-icons/MaterialIcons';
  import Ionicons from '@expo/vector-icons/Ionicons';
  import Entypo from '@expo/vector-icons/Entypo';
import Configuracoes from './source/paginas/Configuracoes.pagina.js';


  export default function App(){
    // Estado para determinar qual página mostrar ao usuário
    const [paginaParaOUsuarioSeEstiverDeslogadoOuLogado, setPage] = useState(null);

    // Hook para verificar o token assim que o app carregar
    useEffect(() => {
      async function LoadToken() {
        const token = await AsyncStorage.getItem('@token'); // Busca o token no AsyncStorage
        const response = await VerificarToken(token); // Verifica a validade do token
        if (response === 0) {
          // Se o token for inválido ou estiver expirado, direciona para a página de login
          console.log('Deslogado ou token expirado');
          setPage("Login");  // Alterado para redirecionar para Login ao invés de Cadastro
        } else if (response === 1) {
          // Se o token for válido, direciona para a página inicial
          console.log('Logado');
          setPage("Inicio");
        }
      }
      LoadToken();
    }, []);

    // Exibe uma tela de carregamento enquanto o token é verificado
    if (paginaParaOUsuarioSeEstiverDeslogadoOuLogado === null) {
      return (
        <View style={EstilosDoDrawer.TelaDeCarregamento}>
          <Text style={{ fontSize: 18, color: '#ffffff' }}>MovieMaster está carregando...</Text>
        </View> 
      );
    }

    // Configuração da navegação com base na verificação do token
    
    return (
      <NavigationContainer>
                <Drawer.Navigator
                  initialRouteName={paginaParaOUsuarioSeEstiverDeslogadoOuLogado}
                  drawerContent={(props) => <DrawerStyle {...props} />}
                  screenOptions={{
                    headerShown: false, // Remove o header padrão
                    drawerActiveBackgroundColor: '#242424', // Define a cor de fundo dos itens ativos no drawer
                    drawerStyle: { backgroundColor: '#242424' }, // Define a cor de fundo do drawer
                    drawerActiveBackgroundColor: '#6237A0', // Cor de fundo do item ativo
                    drawerActiveTintColor: '#fff', // Cor do texto do item ativo
                    drawerInactiveTintColor: '#ccc', // Cor do texto do item inativo
                
                    drawerLabelStyle: {
                      fontSize: 18, // Tamanho da fonte dos itens
                      fontWeight: 'regular', // Peso da fonte dos itens
                      color: '#ffffff', // Cor da fonte dos itens
                    },
                    swipeEnabled: false,
                  }}
                >        
                  <Drawer.Screen
                  options={{
                    drawerIcon: () => (
                      <Entypo name="home" size={36} color="white" />
                    ),
                  }}
                  name="Inicio"
                  component={Inicio}
                />
                <Drawer.Screen
                  options={{
                    drawerItemStyle: { display: 'none' }, // Ocultar essa opção
                  }}
                  name="Alterar Dados"
                  component={AlterarDados}
                />
                <Drawer.Screen
                  options={{
                    drawerIcon: () => (
                      <MaterialIcons name="settings" size={36} color="white" />),
                  }}
                  name="Configurações"
                  component={Configuracoes}
                />
                  <>
                  <Drawer.Screen name="Login" component={Login}
                  options={{
                    drawerItemStyle: { display: 'none' }, // Ocultar essa opção
                  }}/>
                  <Drawer.Screen
                  name="Cadastro"
                  component={Cadastro}
                  options={{
                    drawerItemStyle: { display: 'none' }, // Ocultar essa opção
                  }}/>
                  <Drawer.Screen
                  name="Sair"
                  component={Cadastro}
                  options={{
                    drawerItemStyle: { display: 'none' }, // Ocultar essa opção
                  }}
                  />

                  </>
                </Drawer.Navigator>
                </NavigationContainer>
    );
    
  }

  // Estilos da aplicação
  const EstilosDoDrawer = StyleSheet.create({
    ViewiconeDoDrawer: {
      width: 24,
      height: 24,
    },
    iconeImageEsuaConfiguracao: {
      width: 32,
      height: 32,
    },
    ViewPrincipal: {
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
      height: '20%',
    },
    TelaDeCarregamento: {
      backgroundColor: '#242424',
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });
