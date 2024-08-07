import { TouchableOpacity, View } from 'react-native';
//importando stylesheet para poder criar folha de estilo
import { StyleSheet } from 'react-native';
//O LINEAR GRADIENTE serve para construir um degrade, como posição na estrutura da pagina ele tem o mesmo papel que uma VIEW
import { LinearGradient } from "expo-linear-gradient";
//OBSERVAÇÕES:
//O LINEAR é posicionado por x 'horizontal' e y 'altura' do começo, start, e fim end

//icones para o header sendo importados
import Feather from '@expo/vector-icons/Feather';


export default function Header({ativarMenuTrueFalse}) {
  return (
      <LinearGradient 
      colors={['#343233', '#7100CA' ]} 
      start={{ x: 0, y: 0 }}
      end={{ x: 0.68, y: 0.68 }} 
      style={EstiloDoHeader.ViewPrincipal}>
        
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

      </LinearGradient>
  );
}
//Essa constante carrega a estilização do HEADER, a escolha foi a escrita em linha pela praticidade
const EstiloDoHeader = StyleSheet.create({
    ViewPrincipal:{
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        backgroundColor: '#7100CA',
        flexDirection: 'row',
        
    
    },
    ViewParaPosicionarOsElementosDoHeader:{
        flex:1,
        justifyContent: 'center',
    }
})