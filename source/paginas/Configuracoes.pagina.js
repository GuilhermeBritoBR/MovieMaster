import { TouchableOpacity, Text, View, StyleSheet } from "react-native";
//importando para a navegação
import { useNavigation } from '@react-navigation/native';
//ESTLIZAÇÕES EXTERNAS
import { ViewCentralCorpoDoAPP, ViewPrincipal } from "../estilos/EstilosEstruturais.estilos";
import HeaderRetorno from "../componentes/estruturais/HeaderRetorno.componente";

export default function Configuracoes(){
    //para navegação
    const navigation = useNavigation("");
    return(
        <View style={ViewPrincipal.estilo}>
            <HeaderRetorno voltarApaginaAnterior={() => navigation.goBack()}/>
            <View style={[ViewCentralCorpoDoAPP.estilo,{width:'100%'}]}>
                {/* opção de página a ser redirecionada */}
                <View style={EstilosDasConfiguracoes.opcaoDePagina}>
                    <TouchableOpacity 
                    onPress={()=> navigation.navigate("Alterar Dados")}
                    style={EstilosDasConfiguracoes.opcaoDePagina}>
                        <Text style={EstilosDasConfiguracoes.fonteDoBotao}>Alterar nome e email</Text>
                    </TouchableOpacity>
                </View>
                <View style={EstilosDasConfiguracoes.opcaoDePagina}>
                    <TouchableOpacity style={EstilosDasConfiguracoes.opcaoDePagina}
                    onPress={()=> navigation.navigate("AlterarSenha")}>
                        <Text style={EstilosDasConfiguracoes.fonteDoBotao}>Alterar senha</Text>
                    </TouchableOpacity>
                </View>
                <View style={EstilosDasConfiguracoes.opcaoDePagina}>
                    <TouchableOpacity style={EstilosDasConfiguracoes.opcaoDePagina}
                    onPress={()=> navigation.navigate("AlterarFoto")}>
                        <Text style={EstilosDasConfiguracoes.fonteDoBotao}>Alterar foto</Text>
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