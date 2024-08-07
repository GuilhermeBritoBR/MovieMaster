//importando stylesheet para poder criar folha de estilo
import { StyleSheet, TouchableOpacity, View, Image } from 'react-native';
//O LINEAR GRADIENTE serve para construir um degrade, como posição na estrutura da pagina ele tem o mesmo papel que uma VIEW
import { LinearGradient } from "expo-linear-gradient";
//OBSERVAÇÕES:
//O LINEAR é posicionado por x 'horizontal' e y 'altura' do começo, start, e fim end

//icones para o header sendo importados
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import Feather from '@expo/vector-icons/Feather';
import FontAwesome from '@expo/vector-icons/FontAwesome';

export default function Footer(){
    return(
        <LinearGradient 
        colors={['#343233', '#7100CA' ]} 
        start={{ x: 0, y: 0 }}
        end={{ x: 0.68, y: 0.68 }} 
        style={EstiloDoFooter.ViewPrincipal}>
                <View style={EstiloDoFooter.ViewParaPosicionarOsElementosDoFooter}>
                    <TouchableOpacity>
                        <Image source={require('../../arquivos/icones/home.png')}
                        style={EstiloDoFooter.icones}
                />
                    </TouchableOpacity>
                </View>

                <View style={EstiloDoFooter.ViewParaPosicionarOsElementosDoFooter}>
                    <TouchableOpacity>
                        <Image source={require('../../arquivos/icones/social.png')}
                        style={[EstiloDoFooter.icones,{width: 60.7}]}
                    />
                    </TouchableOpacity>
                </View>

                <View style={EstiloDoFooter.ViewParaPosicionarOsElementosDoFooter}>
                        <TouchableOpacity>
                        <Image source={require('../../arquivos/icones/user.png')} 
                        style={[EstiloDoFooter.icones,{width: 27.52}]}/>
                        </TouchableOpacity>
                </View>
        
        </LinearGradient>
    )
};

const EstiloDoFooter = StyleSheet.create({
    ViewPrincipal:{
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        backgroundColor: '#7100CA',
        flexDirection: 'row',
    },
    ViewParaPosicionarOsElementosDoFooter:{
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    icones:{
        height: 32,
        width: 32,
    },
})