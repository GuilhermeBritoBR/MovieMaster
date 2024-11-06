import { View, Text, TouchableOpacity, FlatList, StyleSheet, Image, TextInput } from "react-native";
import { useEffect, useState } from "react";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { local } from "../../funçoes/IpOuLocalhost";
import { useNavigation, useRoute } from "@react-navigation/native";
import MenorCapaDoFilme from "../../componentes/estruturais/MenorCapaFilme.componente";
import { ViewCentralCorpoDoAPP, ViewPrincipal } from "../../estilos/EstilosEstruturais.estilos";
import HeaderRetorno from "../../componentes/estruturais/HeaderRetorno.componente";
import Entypo from '@expo/vector-icons/Entypo';

export default function ListaIndividual() {
    const route = useRoute();
    const navigation = useNavigation();
    const [listas, setListas] = useState(route.params.dados);
    const [novoNome, setNovoNome] = useState(`${listas.nome_lista}`);

    useEffect(() => {}, [listas]);

    const removerFilme = async (filmeId) => {
        const token = await AsyncStorage.getItem('@token');
        try {
            const novaLista = listas.lista.filter(filme => filme.id !== filmeId);
            await axios.put(`http://${local}:3000/Lista/RemoverFilmeDaLista`, { idDaLista: listas.id, idDoFilme: filmeId }, {
                headers: { Authorization: `${token}` },
            });
            setListas({ ...listas, lista: novaLista });
        } catch (error) {
            console.error("Erro ao remover o filme:", error);
        }
    };

    const deletarLista = async () => {
        const token = await AsyncStorage.getItem('@token');
        try {
            await axios.delete(`http://${local}:3000/Lista/DeletarLista/${listas.id}`, {
                headers: { Authorization: `${token}` },
            });
            navigation.goBack();
        } catch (error) {
            console.error("Erro ao deletar a lista:", error);
        }
    };

    const renomearLista = async () => {
        const token = await AsyncStorage.getItem('@token');
        try {
            await axios.put(`http://${local}:3000/Lista/RenomearLista`, { idDaLista: listas.id, nome_lista: novoNome }, {
                headers: { Authorization: `${token}` },
            });
            setListas({ ...listas, nome_lista: novoNome });
        } catch (error) {
            console.error("Erro ao renomear a lista:", error);
        }
    };

    const renderizarCapa = ({ item }) => (
        <View style={styles.capaContainer}>
            <TouchableOpacity
                style={styles.capa}
                onPress={() => navigation.navigate("InformaçoesFilme", { id: item.id })}
            >
                <Image
                    source={{ uri: `https://image.tmdb.org/t/p/w500${item.capaURL}` }}
                    style={styles.capa}
                />
            </TouchableOpacity>
            <TouchableOpacity style={styles.removerFilmeButton} onPress={() => removerFilme(item.id)}>
                <Text style={styles.removerFilmeButtonText}>X</Text>
            </TouchableOpacity>
        </View>
    );

    return (
        <View style={ViewPrincipal.estilo}>
            <HeaderRetorno voltarApaginaAnterior={() => navigation.goBack()} />
            <View style={[ViewCentralCorpoDoAPP.estilo, { width: '100%' }]}>
                <View style={styles.listaContainer}>
                    <View style={styles.renomearContainer}>
                        <TextInput
                            style={styles.listaTitulo}
                            value={novoNome}
                            onChangeText={(text) => setNovoNome(text)}
                            placeholder="Nome da Lista"
                            placeholderTextColor="#aaaaaa"
                        />
                        <TouchableOpacity style={styles.checkButton} onPress={renomearLista}>
                            <Entypo name="check" size={24} color="#ab49cc" />
                        </TouchableOpacity>
                    </View>
                    <FlatList
                        data={listas.lista}
                        renderItem={renderizarCapa}
                        keyExtractor={(filme, index) => index.toString()}
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={styles.capasContainer}
                    />
                    <TouchableOpacity style={styles.deletarListaButton} onPress={deletarLista}>
                        <Text style={styles.deletarListaButtonText}>Deletar Lista</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    listaContainer: {
        backgroundColor: "#1a1a1a",
        borderRadius: 10,
        padding: 15,
        elevation: 5,
        marginHorizontal: 20,
        marginVertical: 10,
    },
    renomearContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 15,
    },
    listaTitulo: {
        flex: 1,
        fontSize: 18,
        fontWeight: "bold",
        color: "#ffffff",
        padding: 5,
        borderBottomColor: "white",
        borderBottomWidth: 1,
        paddingHorizontal: 10,
    },
    checkButton: {
        marginLeft: 10,
        padding: 5,
    },
    capasContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-around",
    },
    capaContainer: {
        position: "relative",
        marginBottom: 10,
    },
    capa: {
        width: 110,
        height: 150,
        borderRadius: 5,
        overflow: "hidden",
    },
    removerFilmeButton: {
        position: "absolute",
        top: 5,
        right: 5,
        backgroundColor: "#ab49cc",
        borderRadius: 10,
        width: 24,
        height: 24,
        justifyContent: "center",
        alignItems: "center",
    },
    removerFilmeButtonText: {
        color: "white",
        fontSize: 14,
        fontWeight: "bold",
    },
    deletarListaButton: {
        marginTop: 20,
        backgroundColor: "#ab49cc",
        padding: 12,
        borderRadius: 8,
        alignItems: "center",
        justifyContent: "center",
    },
    deletarListaButtonText: {
        color: "white",
        fontWeight: "bold",
        fontSize: 16,
    },
});
