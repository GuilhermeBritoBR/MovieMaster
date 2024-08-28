import { TouchableOpacity, Text, View, StyleSheet } from "react-native";
//importando para a navegação
import { useNavigation } from '@react-navigation/native';
//ESTLIZAÇÕES EXTERNAS
import { ViewCentralCorpoDoAPP, ViewPrincipal } from "../estilos/EstilosEstruturais.estilos";

export default function Configuracoes(){
    //para navegação
    const navigation = useNavigation("");
    return(
        <View style={ViewPrincipal.estilo}>

            <View style={[ViewCentralCorpoDoAPP.estilo,{flex: 10}]}>
                {/* opção de página a ser redirecionada */}
                <View style={EstilosDasConfiguracoes.opcaoDePagina}>
                    <TouchableOpacity 
                    onPress={()=> navigation.navigate("Alterar Dados")}
                    style={EstilosDasConfiguracoes.opcaoDePagina}>
                        <Text style={EstilosDasConfiguracoes.fonteDoBotao}>Alterar informações pessoais</Text>
                    </TouchableOpacity>
                </View>
                <View style={EstilosDasConfiguracoes.opcaoDePagina}>
                    <TouchableOpacity style={EstilosDasConfiguracoes.opcaoDePagina}>
                        <Text style={EstilosDasConfiguracoes.fonteDoBotao}>Alterar senha</Text>
                    </TouchableOpacity>
                </View>
                <View style={EstilosDasConfiguracoes.opcaoDePagina}>
                    <TouchableOpacity style={EstilosDasConfiguracoes.opcaoDePagina}>
                        <Text style={EstilosDasConfiguracoes.fonteDoBotao}>Alterar tema</Text>
                    </TouchableOpacity>
                </View>
                <View style={EstilosDasConfiguracoes.opcaoDePagina}>
                    <TouchableOpacity style={EstilosDasConfiguracoes.opcaoDePagina}>
                        <Text style={EstilosDasConfiguracoes.fonteDoBotao}>Alterar tema</Text>
                    </TouchableOpacity>
                </View>
                <View style={{flex:7}}></View>

            </View>
        </View>
    );
};

const EstilosDasConfiguracoes = StyleSheet.create(({
    opcaoDePagina:{
        width: '100%',
        flex: 1,
        backgroundColor: '#1A1A1A',
        justifyContent: 'center',
        alignItems: 'center',
        borderBottom: 'solid',
        borderBottomColor: '#ffffff',
        borderBottomWidth: 1,
    },
    fonteDoBotao:{
        color:'#ffffff',
        fontSize: 18,
    },

}));