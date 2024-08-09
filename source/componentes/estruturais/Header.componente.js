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

//importandos hoooks
import { useState } from 'react';

export default function Header({ativarMenuTrueFalse}) {

    //relação de sim ou não com a borda do menu inferior, aonde ela fica rosa quando clicada
    //Para o 3 menus
    const [FILMES_AtivadorTrueFalse, setarBordaMenuInferiorFILMES] = useState(true);
    const [AMIGOS_AtivadorTrueFalse, setarBordaMenuInferiorAMIGOS] = useState(false);
    const [LISTAS_AtivadorTrueFalse, setarBordaMenuInferiorLISTAS] = useState(false);
    

    //função para setar borda do menu inferior aonde o clicado tem o border ativado
    //respectivamente, função de setar variavel e variavel a ser setada
    //as outras duas são os outros menu a serem desativados
    function AtivarBordaDoMenuInferior(variavelDoMenuSetado,funcaoAsetarMenu, primeiraVariavelAserDesativadaPorFuncaoDeSetar, 
        segundaVariavelAserDesativadaPorFuncaoDeSetar ){
        if(variavelDoMenuSetado === false){
            funcaoAsetarMenu(true);
            primeiraVariavelAserDesativadaPorFuncaoDeSetar(false);
            segundaVariavelAserDesativadaPorFuncaoDeSetar(false);
        }else{
            funcaoAsetarMenu(true)
        }
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
        <View style={[EstiloDoHeader.ViewParaPosicionarOsElementosDoHeader,{ alignItems: 'flex-start', marginLeft: 20,}]}>
            {/* O FEATHER é o icone dos elementos sendo que o TOUCHABLE encobre os tais com uma função que abre um modal ou ativa uma rota */}
            <TouchableOpacity onPress={ativarMenuTrueFalse}>
            <Feather name="menu" size={36} color="white" />
            </TouchableOpacity>
        </View>

        <View style={[EstiloDoHeader.ViewParaPosicionarOsElementosDoHeader,{ alignItems: 'flex-end', marginRight: 20,}]}>
            {/* O FEATHER é o icone dos elementos sendo que o TOUCHABLE encobre os tais com uma função que abre um modal ou ativa uma rota */}
            <TouchableOpacity>
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
                    onPress={()=>AtivarBordaDoMenuInferior(FILMES_AtivadorTrueFalse, setarBordaMenuInferiorFILMES, setarBordaMenuInferiorAMIGOS
                        ,setarBordaMenuInferiorLISTAS
                    )}
                    style={[EstiloDoHeader.BotoesDeNavegacaoInferiores,{  borderBottomWidth: FILMES_AtivadorTrueFalse === true ? 3 : 0 }]}>

                        <H3 texto={"Filmes"}/>
                    
                    </TouchableOpacity>
                </View>

                <View style={EstiloDoHeader.BarraDeNavegaçãoDoMenuInferior}>
                    <TouchableOpacity 
                    onPress={()=>AtivarBordaDoMenuInferior(AMIGOS_AtivadorTrueFalse, setarBordaMenuInferiorAMIGOS, setarBordaMenuInferiorFILMES,
                        setarBordaMenuInferiorLISTAS
                    )}
                    style={[EstiloDoHeader.BotoesDeNavegacaoInferiores,{borderBottomWidth: AMIGOS_AtivadorTrueFalse === true ? 3 : 0 }]}>

                        <H3 texto={"Amigos"}/>
                    
                    </TouchableOpacity>
                </View>

                <View style={EstiloDoHeader.BarraDeNavegaçãoDoMenuInferior}>
                    <TouchableOpacity 
                    onPress={()=>AtivarBordaDoMenuInferior(LISTAS_AtivadorTrueFalse, setarBordaMenuInferiorLISTAS, setarBordaMenuInferiorAMIGOS, 
                        setarBordaMenuInferiorFILMES
                    )}
                    style={[EstiloDoHeader.BotoesDeNavegacaoInferiores,{borderBottomWidth: LISTAS_AtivadorTrueFalse === true ? 3 : 0 }]}>

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
        border: 'solid',
        borderBlockColor: '#DEACF5',
    },
})