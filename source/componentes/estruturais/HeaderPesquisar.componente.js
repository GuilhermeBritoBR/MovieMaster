import { TouchableOpacity, View } from 'react-native';
//importando stylesheet para poder criar folha de estilo
import { StyleSheet } from 'react-native';
//O LINEAR GRADIENTE serve para construir um degrade, como posição na estrutura da pagina ele tem o mesmo papel que uma VIEW
import { LinearGradient } from "expo-linear-gradient";
//OBSERVAÇÕES:
//O LINEAR é posicionado por x 'horizontal' e y 'altura' do começo, start, e fim end

//icones para o header sendo importados
import Feather from '@expo/vector-icons/Feather';

//fontes para texto
import H3 from '../textos/h3.componente';
//navegação
import { useNavigation } from '@react-navigation/native';
//importandos hoooks
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TextInput } from 'react-native-gesture-handler';

export default function HeaderPesquisar({ativarMenuTrueFalse, ativarPesquisa}) {
    //CONSTANTWE PARA A NAVEGACAO
    const navigation = useNavigation("");
    //relação de sim ou não com a borda do menu inferior, aonde ela fica rosa quando clicada
    //Para o 3 menus
    
    
    //função para setar borda do menu inferior aonde o clicado tem o border ativado
    //respectivamente, função de setar variavel e variavel a ser setada
    //as outras duas são os outros menu a serem desativados
    async function AtivarBordaDoMenuInferior(menuSelecionado,funcaoAsetarMenu, ...funcoesParaDesativar 
         ){
            funcaoAsetarMenu(true);
            await AsyncStorage.setItem('@menu', menuSelecionado);
            funcoesParaDesativar.forEach(funcao => funcao(false));
        
    }


  return (
      <LinearGradient 
      colors={['#9754CB', '#6237A0' ]} 
      start={{ x: 0, y: 0 }}
      end={{ x: 0.68, y: 0.68 }} 
      style={EstiloDoHeader.ViewPrincipal}>
        {/* Essa view carrega as duas views que possuem os icones superiores e usam de um flex direction diferente */}
        <View style={EstiloDoHeader.ViewDosElementosSuperioresPesquisaMenu}>
    
        {/* Essas duas view's vão segurar o botão sanduiche de abrir menu e o icone de pesquisar em seus lugares */}
        <View style={[EstiloDoHeader.ViewParaPosicionarOsElementosDoHeader,{ alignItems: 'flex-start', margin: 20, justifyContent: 'center',}]}>
            {/* O FEATHER é o icone dos elementos sendo que o TOUCHABLE encobre os tais com uma função que abre um modal ou ativa uma rota */}
            <TouchableOpacity onPress={ativarMenuTrueFalse}>
            <Feather name="menu" size={36} color="white" />
            </TouchableOpacity>
        </View>
        <View style={[EstiloDoHeader.ViewParaPosicionarOsElementosDoHeader,{ alignItems: 'center', marginRight: 20,}]}>
            {/* O FEATHER é o icone dos elementos sendo que o TOUCHABLE encobre os tais com uma função que abre um modal ou ativa uma rota */}
            <TextInput 
            placeholder='Pesquise um filme e amigos...'
            placeholderTextColor={'#000000'}
            onChangeText={ativarPesquisa}
            style={EstiloDoHeader.inputDePesquisa}
            value=''
            />
        </View>
        <View style={[EstiloDoHeader.ViewParaPosicionarOsElementosDoHeader,{ alignItems: 'flex-end', marginRight: 20,}]}>
            {/* O FEATHER é o icone dos elementos sendo que o TOUCHABLE encobre os tais com uma função que abre um modal ou ativa uma rota */}
            <TouchableOpacity
            onPress={()=> navigation.navigate("Pesquisar")}
            >
            <Feather name="search" size={36} color="white" />
            </TouchableOpacity>
        </View>

        </View>
        {/* Agora esta view serve para posicionar os elementos inferiores de navegação como o menu de filmes, amigos e listas*/}
        {/* Ela possue também um flex direction diferente */}
        <View style={EstiloDoHeader.ViewDosElementosInferioresFilmesAmigosListas}>
                {/* Dentro desta possui 3 view que vão segurar os 3 menus de navegação */}
                <View style={EstiloDoHeader.BarraDeNavegaçãoDoMenuInferior}>

                    <TouchableOpacity 
                    onPress={()=> navigation.navigate("Inicio")}
                    
                    style={[EstiloDoHeader.BotoesDeNavegacaoInferiores  ]}>

                        <H3 texto={"Filmes"}/>
                    
                    </TouchableOpacity>
                </View>

                <View style={EstiloDoHeader.BarraDeNavegaçãoDoMenuInferior}>
                        <TouchableOpacity 
                        onPress={()=> navigation.navigate("Amigos")
                        }
                    style={[EstiloDoHeader.BotoesDeNavegacaoInferiores]}>

                        <H3 texto={"Amigos"}/>
                    
                    </TouchableOpacity>
                </View>

                <View style={EstiloDoHeader.BarraDeNavegaçãoDoMenuInferior}>
                    <TouchableOpacity 
                    
                    
                    style={[EstiloDoHeader.BotoesDeNavegacaoInferiores]}>

                        <H3 texto={"Listas"}/>   

                    </TouchableOpacity>                    
                </View>


        </View>

      </LinearGradient>
  );
}
//Essa constante carrega a estilização do HEADER, a escolha foi a escrita em linha pela praticidade
const EstiloDoHeader = StyleSheet.create({
    ViewPrincipal:{
        justifyContent: 'center',
        alignItems: 'center',
        flex: 2,
        backgroundColor: '#7100CA',   
        flexDirection: 'column',     
        
    
    },
    ViewParaPosicionarOsElementosDoHeader:{
        flex:1,
        justifyContent: 'center',
    },
    ViewDosElementosSuperioresPesquisaMenu:{
        flex: 5,
        flexDirection: 'row',
    },
    ViewDosElementosInferioresFilmesAmigosListas:{
        flex: 3,
        flexDirection: 'row', 
    },
    BarraDeNavegaçãoDoMenuInferior:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    BotoesDeNavegacaoInferiores:{
        width: 100,
        height: 32,
        justifyContent: 'center',
        alignItems: 'center',
        
    },
    inputDePesquisa:{
        width: 200,
        height: 32,
        backgroundColor:'#ffffff',
        borderRadius: 10,
        textAlign: 'center',
    },
})