import { StyleSheet, View, Image } from "react-native";
//importando as unidades responsivas do css
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
//fontes de texto
import H1 from "../textos/h1.componente";

export default function MenorCapaDoFilme({propriedadeParaReceberAcapaDoFilme, tamonhoMenorOuMaiorrStingVazia,  }){
    return(
        <View style={tamonhoMenorOuMaiorrStingVazia === "" ? EstiloDaCapaDoFilme.ViewPrincipalDaCapa: [EstiloDaCapaDoFilme.ViewPrincipalDaCapaMe]}>
            <Image 
            source={{uri: propriedadeParaReceberAcapaDoFilme,}}
            style={tamonhoMenorOuMaiorrStingVazia === "" ? EstiloDaCapaDoFilme.ImagemDaCapa: [EstiloDaCapaDoFilme.ImagemDaCapaMenor]}
            />
        </View>
    );
}

const EstiloDaCapaDoFilme = StyleSheet.create(({
    ViewPrincipalDaCapa:{
        width: wp('60%'),
        height: wp('78%'),
        backgroundColor: 'purple',
        marginRight: wp('12%'),
    },
    ImagemDaCapa:{
        width: '100%',
        height: '100%',
        
    },
    ImagemDaCapaMenor:{
        width: wp('28%'),
        height: wp('46%'),
        backgroundColor: 'purple',
        marginRight: 29,
    },
    ViewPrincipalDaCapaMenor:{
        width: wp('28%'),
        height: wp('46%'),
        backgroundColor: 'purple',
        marginRight: 29,
    },
}));