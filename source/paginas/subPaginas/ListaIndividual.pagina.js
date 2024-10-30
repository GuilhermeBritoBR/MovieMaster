import { View, Text, TouchableOpacity, FlatList, StyleSheet, Image, TextInput } from "react-native";
import { useEffect, useState } from "react";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { local } from "../../funçoes/IpOuLocalhost";
import { useNavigation, useRoute } from "@react-navigation/native";
import MenorCapaDoFilme from "../../componentes/estruturais/MenorCapaFilme.componente";
import { ViewCentralCorpoDoAPP, ViewPrincipal } from "../../estilos/EstilosEstruturais.estilos";
import HeaderRetorno from "../../componentes/estruturais/HeaderRetorno.componente";

export default function ListaIndividual() {
    const route = useRoute();
    const navigation = useNavigation();
    const [listas, setListas] = useState(route.params.dados);
    const [novoNome, setNovoNome] = useState(`${listas.nome_lista}`);

    useEffect(()=>{},[listas])
    
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
            <HeaderRetorno voltarApaginaAnterior={() => navigation.goBack("")} />
            <View style={[ViewCentralCorpoDoAPP.estilo, { width: '100%' }]}>
                <View style={ViewCentralCorpoDoAPP.estilo}>
                <View style={styles.listaContainer}>
            <View style={styles.renomearContainer}>
                <TextInput
                    style={styles.listaTitulo}
                    value={novoNome}
                    onChangeText={(text)=>setNovoNome(text)}
                    placeholder="Nome da Lista"
                    placeholderTextColor="#ffffff"
                />
                <TouchableOpacity style={styles.checkButton} onPress={()=>renomearLista()}>
                    <Text style={styles.checkButtonText}>✔</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.capasContainer}>
                <FlatList
                    data={listas.lista}
                    renderItem={renderizarCapa}
                    keyExtractor={(filme, index) => index.toString()}
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.capasContainer}
                />
            </View>
        </View>
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
        marginVertical: 10,
        padding: 15,
        backgroundColor: "#1a1a1a",
        elevation: 5,
        borderBottomColor: 'white',
        borderBottomWidth: 1,
    },
    renomearContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 10,
    },
    listaTitulo: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#ffffff",
        borderBottomWidth: 1,
        borderBottomColor: "#ffffff",
        flex: 1,
    },
    checkButton: {
        marginLeft: 10,
        padding: 5,
        backgroundColor: "#28a745",
        borderRadius: 5,
    },
    checkButtonText: {
        color: "#ffffff",
        fontWeight: "bold",
    },
    capasContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
    },
    capaContainer: {
        position: "relative",
    },
    capa: {
        width: 80,
        height: 120,
        marginRight: 10,
        marginBottom: 10,
        borderRadius: 5,
    },
    removerFilmeButton: {
        position: "absolute",
        top: 5,
        right: 5,
        backgroundColor: "red",
        borderRadius: 10,
        width: 20,
        height: 20,
        justifyContent: "center",
        alignItems: "center",
    },
    removerFilmeButtonText: {
        color: "white",
        fontWeight: "bold",
    },
    deletarListaButton: {
        marginTop: 20,
        backgroundColor: "red",
        padding: 10,
        borderRadius: 5,
        alignItems: "center",
    },
    deletarListaButtonText: {
        color: "white",
        fontWeight: "bold",
    },
});
