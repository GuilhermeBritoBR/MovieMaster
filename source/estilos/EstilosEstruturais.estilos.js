import { StyleSheet } from "react-native";

//cada constante carrega uma estilização, para evitar confusão
const ViewCentralCorpoDoAPP = StyleSheet.create(({
    estilo:{
        flex: 14,
         backgroundColor: '#1a1a1a',
    },
}));
//View principal engloba tudo, ou seja é a primeira view criada em uma pagina
const ViewPrincipal = StyleSheet.create(({
    estilo:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#1A1A1A'
    },
}));

export {ViewCentralCorpoDoAPP, ViewPrincipal};