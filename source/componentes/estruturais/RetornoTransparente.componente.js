import { View,TouchableOpacity, StyleSheet } from "react-native"
//icones para o header sendo importados
import Ionicons from '@expo/vector-icons/Ionicons';
export default function RetornoTransparente({voltarApaginaAnterior}){
    
            {/* O FEATHER é o icone dos elementos sendo que o TOUCHABLE encobre os tais com uma função que abre um modal ou ativa uma rota */}
            <TouchableOpacity onPress={voltarApaginaAnterior}>
            <Ionicons name="arrow-back" size={36} color="white" />
            </TouchableOpacity>
      
}

const EstiloDoHeader = StyleSheet.create({
    ViewPrincipal:{
        justifyContent: 'center',
        alignItems: 'center',
        height:60,
        backgroundColor: '#7100CA',   
    
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