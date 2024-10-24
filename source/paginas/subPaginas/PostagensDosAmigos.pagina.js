import { View, Text, TouchableOpacity, FlatList, StyleSheet, Image } from "react-native";
import { useEffect, useState } from "react";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { local } from "../../funçoes/IpOuLocalhost";
import { useNavigation, useRoute } from "@react-navigation/native";
import MenorCapaDoFilme from "../../componentes/estruturais/MenorCapaFilme.componente";
import { ViewCentralCorpoDoAPP, ViewPrincipal } from "../../estilos/EstilosEstruturais.estilos";
import HeaderRetorno from "../../componentes/estruturais/HeaderRetorno.componente";

export default function PostagensDosAmigos() {
    const route = useRoute();
    const id = route.params.id;
    const navigation = useNavigation();
    const [posts, setandoMeusPosts] = useState([]);

    const ReceberMinhasPostagens = async () => {
        const token = await AsyncStorage.getItem("@token");
        const config = {
            headers: {
                Authorization: `${token}`,
            },
        };
        try {
            const resposta = await axios.get(`http://${local}:3000/Amigos/ReceberPublicacoesDosOutrosPerfils/${id}`, config);
            setandoMeusPosts(resposta.data.publicacoes);
        } catch (err) {
            console.error(`Erro ao buscar publicações: ${err}`);
        }
    };

    const DeletarPost = async (id_do_post) => {
        const token = await AsyncStorage.getItem("@token");
        const config = {
            headers: {
                Authorization: `${token}`,
            },
        };
        const dadosAenviar = { id_do_post };
        console.log(`Segue o ID: ${id_do_post}`);

        try {
            await axios.delete(`http://${local}:3000/Amigos/DeletarPublicacao/${id_do_post}`, { ...config, data: dadosAenviar });
            alert('Deletado com sucesso!');
        } catch (err) {
            console.log(`Segue o erro: ${err}`);
        }
        console.log("Item excluído");
    };

    useEffect(() => {
        ReceberMinhasPostagens();
    }, [id]);

    const Publicacao = ({ nomeDoUsuario, data_postagem, filme_id, texto, id_do_post, capaDoFilme, TituloDoFilme, foto }) => (
        <View style={EstruturaDaPaginaDosAmigos.ViewQueCentralizaCadaPostagem}>
            <View style={EstruturaDaPaginaDosAmigos.AreaSuperior}>
                <View style={EstruturaDaPaginaDosAmigos.SecaoEsquerda}>
                    <Text style={[EstruturaDaPaginaDosAmigos.Nome, { textAlign: 'center', marginRight: 10 }]}>{TituloDoFilme}</Text>
                    <MenorCapaDoFilme
                        tamonhoMenorOuMaiorrStingVazia={"Menor"}
                        propriedadeParaReceberAcapaDoFilme={capaDoFilme}
                    />
                </View>

                <View style={EstruturaDaPaginaDosAmigos.SecaoDireita}>
                    <View style={EstruturaDaPaginaDosAmigos.UsuarioEsuasInformacoes}>
                        {/* Informações do usuário */}
                        <Text style={EstruturaDaPaginaDosAmigos.Nome}>{nomeDoUsuario}</Text>
                        <Text style={[EstruturaDaPaginaDosAmigos.Nome, { fontSize: 10 }]}>{data_postagem}</Text>
                    </View>
                    <View style={EstruturaDaPaginaDosAmigos.ComentarioDoUsuarioView}>
                        {/* Comentário do usuário */}
                        <Text style={EstruturaDaPaginaDosAmigos.comentarioEstilizacao}>{texto}</Text>
                    </View>
                </View>
            </View>
        </View>
    );

    return (
        <View style={ViewPrincipal.estilo}>
            <HeaderRetorno voltarApaginaAnterior={() => navigation.goBack("")} />
            <View style={[ViewCentralCorpoDoAPP.estilo, { width: '100%' }]}>
                <FlatList
                    data={posts}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => 
                        item.length === 0 ? (  // Corrigido para verificar se o texto está vazio
                            <View style={EstruturaDaPaginaDosAmigos.ViewQueCentralizaCadaPostagem}>
                                <Image
                                    source={{ uri: `http://${local}:3000/${item.foto}` }} // Corrigido para usar item.foto
                                    style={EstruturaDaPaginaDosAmigos.headerImage}
                                />
                                <Text style={{ textAlign: 'center', marginRight: 10, color: '#ffffff', fontSize: 32 }}>
                                    Nada por aqui..
                                </Text>
                            </View>
                        ) : (
                            <Publicacao
                                nomeDoUsuario={item.autor}
                                data_postagem={item.data_postagem}
                                filme_id={item.filme_id}
                                texto={item.texto}
                                id_do_post={item.id}
                                capaDoFilme={item.capaDoFilme}
                                TituloDoFilme={item.tituloDoFilme}
                                foto={item.foto}
                            />
                        )
                    }
                />
            </View>
        </View>
    );
}

const EstruturaDaPaginaDosAmigos = StyleSheet.create({
    ViewQueCentralizaCadaPostagem: {
        flex: 1,
        width: '100%',
        flexDirection: 'column',
        borderBottomWidth: 1,
        borderBottomColor: '#ffffff',
        border: 'solid',
    },
    SecaoEsquerda: {
        flex: 1,
    },
    SecaoDireita: {
        flex: 2,
        flexDirection: 'column',
    },
    headerImage: {
        width: 120,
        height: 120,
        borderRadius: 240,
        marginRight: 2,
    },
    comentarioEstilizacao: {
        fontSize: 13,
        color: '#ffffff',
        textAlign: 'left',
        marginLeft: 40,
    },
    ComentarioDoUsuarioView: {
        flex: 3,
    },
    UsuarioEsuasInformacoes: {
        flex: 1,
        textAlign: 'left',
        marginLeft: 40,
    },
    Nome: {
        color: '#ffffff',
        fontSize: 13,
    },
    AreaSuperior: {
        flex: 10,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
    },
    AreaInferior: {
        border: 'solid',
        borderTopWidth: 1,
        borderTopColor: '#ffffff',
        flex: 1,
        flexDirection: 'row',
        width: '100%',
        padding: 3,
    },
    ViewIconeDeFeedBack: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 3,
    },
});
