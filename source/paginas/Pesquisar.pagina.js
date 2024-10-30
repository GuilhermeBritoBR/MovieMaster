import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Modal, TextInput, StatusBar, KeyboardAvoidingView, Platform } from 'react-native';
//css 
import { ViewPrincipal } from '../estilos/EstilosEstruturais.estilos';
import { ViewCentralCorpoDoAPP } from '../estilos/EstilosEstruturais.estilos';
//componentes
import HeaderPesquisar from '../componentes/estruturais/HeaderPesquisar.componente.js';
//navegação
import { useNavigation, useRoute } from '@react-navigation/native';
//degrade
import { LinearGradient } from 'expo-linear-gradient';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import Fontisto from '@expo/vector-icons/Fontisto';
import AntDesign from '@expo/vector-icons/AntDesign';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Entypo from '@expo/vector-icons/Entypo';
import FontAwesome from '@expo/vector-icons/FontAwesome';

export default function Pesquisar() {
    const navigation = useNavigation();
    const route = useRoute();
    const [isFocused, setIsFocused] = useState(false);

    const BlocoDosGeneros = ({ nomeDoGenero, iconeRespectivo }) => (
        <TouchableOpacity style={[EstilosDoPesquisar.BlocosComGenero, { flexDirection: 'row', margin: 10 }]}>
            <LinearGradient
                style={[EstilosDoPesquisar.BlocosComGenero, { flexDirection: 'row' }]}
                colors={['#9754CB', '#6237A0']} 
                start={{ x: 0, y: 0 }}
                end={{ x: 0.68, y: 0.68 }}
            >
                <View style={{ flex: 1.2, marginLeft: 15 }}>
                    <Text style={{ fontSize: 16, color: '#ffffff' }}>{nomeDoGenero}</Text>
                </View>
                <View style={{ flex: 0.8, marginRight: 10, justifyContent: 'center', alignItems: 'center' }}>
                    {iconeRespectivo}
                </View>
            </LinearGradient>
        </TouchableOpacity>
    );

    return (
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
            <StatusBar hidden={isFocused} />
            <ScrollView contentContainerStyle={{ flexGrow: 1, paddingBottom: 20 }}>
                <View style={[ViewPrincipal.estilo, { flex: 1 }]}>
                <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                    <HeaderPesquisar 
                        ativarMenuTrueFalse={() => navigation.openDrawer()} 
                        ativarPesquisa={() => navigation.navigate('PequisaDeTexto')} 
                    />
                    </ScrollView>
                    <View style={[ViewCentralCorpoDoAPP.estilo, { flex: 1, padding: 10 }]}>

                        {/* TextInput para pesquisa */}
                        <View style={EstilosDoPesquisar.OpcaoDePesquisa}>
                            <TextInput
                                style={EstilosDoPesquisar.inputDePesquisa}
                                placeholder="Pesquisar"
                                onFocus={() => setIsFocused(true)}
                                onBlur={() => setIsFocused(false)}
                            />
                        </View>

                        {/* Blocos de Gêneros */}
                        <View style={EstilosDoPesquisar.DivHorizontalCabeDoisBlocos}>
                            <BlocoDosGeneros nomeDoGenero={"Ação"} iconeRespectivo={<Fontisto name="helicopter" size={36} color="white" />} />
                            <BlocoDosGeneros nomeDoGenero={"Corrida"} iconeRespectivo={<AntDesign name="car" size={36} color="white" />} />
                        </View>
                        <View style={EstilosDoPesquisar.DivHorizontalCabeDoisBlocos}>
                            <BlocoDosGeneros nomeDoGenero={"Aventura"} iconeRespectivo={<MaterialCommunityIcons name="sword" size={36} color="white" />} />
                            <BlocoDosGeneros nomeDoGenero={"Guerra"} iconeRespectivo={<FontAwesome name="bomb" size={36} color="white" />} />
                        </View>
                        <View style={EstilosDoPesquisar.DivHorizontalCabeDoisBlocos}>
                            <BlocoDosGeneros nomeDoGenero={"Ficção"} iconeRespectivo={<Entypo name="rocket" size={36} color="white" />} />
                            <BlocoDosGeneros nomeDoGenero={"Terror"} iconeRespectivo={<MaterialCommunityIcons name="knife" size={36} color="white" />} />
                        </View>
                        <View style={EstilosDoPesquisar.DivHorizontalCabeDoisBlocos}>
                            <BlocoDosGeneros nomeDoGenero={"Drama"} iconeRespectivo={<FontAwesome6 name="sad-cry" size={36} color="white" />} />
                            <BlocoDosGeneros nomeDoGenero={"Mistério"} iconeRespectivo={<AntDesign name="search1" size={36} color="white" />} />
                        </View>
                        <View style={EstilosDoPesquisar.DivHorizontalCabeDoisBlocos}>
                            <BlocoDosGeneros nomeDoGenero={"Comédia"} iconeRespectivo={<FontAwesome5 name="laugh-squint" size={36} color="white" />} />
                            <BlocoDosGeneros nomeDoGenero={"Romance"} iconeRespectivo={<AntDesign name="heart" size={36} color="white" />} />
                        </View>
                    </View>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

const EstilosDoPesquisar = StyleSheet.create({
    DivHorizontalCabeDoisBlocos: {
        flexDirection: 'row',
        justifyContent: 'space-around', // Ajusta a distância entre os blocos
        alignItems: 'center',
        marginVertical: 5,
    },
    BlocosComGenero: {
        width: '45%', // Largura ajustável para responder a diferentes tamanhos de tela
        backgroundColor: '#ffffff',
        alignItems: 'center',
        justifyContent: 'center',
        height: 75,
        borderRadius: 15,
    },
    OpcaoDePesquisa: {
        width: '100%',
        backgroundColor: '#1A1A1A',
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomColor: '#ffffff',
        borderBottomWidth: 1,
        height: 60,
    },
    inputDePesquisa: {
        width: '80%', // Largura mais responsiva para o campo de pesquisa
        height: 32,
        backgroundColor: '#ffffff',
        borderRadius: 10,
        textAlign: 'center',
    },
});
