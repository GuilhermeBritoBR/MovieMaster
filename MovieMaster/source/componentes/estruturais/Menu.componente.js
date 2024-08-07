import { Modal, StyleSheet, TouchableOpacity, View, Text  } from "react-native";
//componentes importados
import H3 from "../textos/h3.componente.js";

export default function Menu({visibilidadeDoModalTrueFalse, propriedadeParaFecharModal}){
    return(
        <Modal visible={visibilidadeDoModalTrueFalse}>
            
            <View style={EstiloDoModal.ViewPrincipalDoModal}>

                <TouchableOpacity style={EstiloDoModal.opçaoSelecionarDoMenu}>
                    <H3 texto={"Opção 1"}/>
                </TouchableOpacity>
                <TouchableOpacity style={EstiloDoModal.opçaoSelecionarDoMenu}>
                    <H3 texto={"Opção 1"}/>
                </TouchableOpacity>
                <TouchableOpacity style={EstiloDoModal.opçaoSelecionarDoMenu}>
                    <H3 texto={"Opção 1"}/>
                </TouchableOpacity>
                <TouchableOpacity style={EstiloDoModal.opçaoSelecionarDoMenu}>
                    <H3 texto={"Opção 1"}/>
                </TouchableOpacity>
                <TouchableOpacity style={EstiloDoModal.opçaoSelecionarDoMenu}>
                    <H3 texto={"Opção 1"}/>
                </TouchableOpacity>

            </View>
            <TouchableOpacity onPress={propriedadeParaFecharModal} style={EstiloDoModal.ClickZone}>

            </TouchableOpacity>
        </Modal>
    )
}

const EstiloDoModal = StyleSheet.create(({
        ViewPrincipalDoModal:{
            flex: 2,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#000000',
        },
        ClickZone:{
            flex: 3,
            backgroundColor: '#000000',
            opacity: 1,
            cursor:'auto',
        },
        opçaoSelecionarDoMenu:{
            width: '100%',
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            border: 'solid',
            borderBottomWidth: 1,
            borderBottomColor: '#ffffff',
        },
}));

