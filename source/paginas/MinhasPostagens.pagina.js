    import { View,Text,TouchableOpacity , FlatList} from "react-native";
    import { useEffect, useState } from "react";
    import axios from "axios";
    import AsyncStorage from "@react-native-async-storage/async-storage";
    import { local } from "../funçoes/IpOuLocalhost";
import { useNavigation } from "@react-navigation/native";

  export default function MinhasPostagens(){
    const navigation = useNavigation();
    const [posts, setandoMeusPosts] = useState({});
    const ReceberMinhasPostagens = async()=>{
        const token = await AsyncStorage.getItem("@token");
    const config = {
      headers: {
        Authorization: `${token}`,
      },};
        try{
          const resposta = await axios.get(`http://${local}:3000/Amigos/ReceberPublicacao`, config);
          setandoMeusPosts(resposta.data);
        }catch(err){
          console.error(`Erro ao buscar treinos: segue o tal ${err}`);
        }
      }
      const DeletarPost = async(id_do_post)=>{
        const token = await AsyncStorage.getItem("@token");
    const config = {
      headers: {
        Authorization: `${token}`,
      },};
        const dadosAenviar = {
          id_do_post,
        }
        console.log(`Segue o ID: ${id_do_post}`);
        
                try {
                    await axios.delete(`http://${local}:3000/Amigos/DeletarPublicacao/${id_do_post}`,config, dadosAenviar);
                    alert('Deletado com sucesso!');
                } catch (err) {
                    console.log(`Segue o erro: ${err}`);
                }
                console.log("Item excluído");
            
    
      };
      useEffect(()=>{
        ReceberMinhasPostagens();
      },[])
    const Publicacao = ({nomeDoUsuario,data_postagem,filme_id, texto, id_do_post}) => (
        <View style={{ flex: 1, margin: 10, border: 'solid 1px black' }}>
          <Text style={{color: 'black', fontSize: 18}}>Nome:{nomeDoUsuario}</Text>
          <Text style={{color: 'black', fontSize: 18}}>Data:{data_postagem}</Text>
          <Text style={{color: 'black', fontSize: 18}}>Filme:{filme_id}</Text>
          <Text style={{color: 'black', fontSize: 18}}>Conteudo:{texto}</Text>
          <TouchableOpacity onPress={()=> navigation.navigate('AlterarPostagem', {id_do_post})}>
           <Text>Alterar Informações</Text>
          </TouchableOpacity>
         <TouchableOpacity onPress={()=> DeletarPost(id_do_post)}>
            <Text>Deletar post</Text>
          </TouchableOpacity> 
      </View>)
    return(
        <View style={{width: '100%', flex: 1}}>
            <FlatList
            data={posts}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item}) => (
                <Publicacao
                nomeDoUsuario={item.nomeDoUsuario}
                data_postagem={item.data_postagem}
                filme_id={item.filme_id}
                texto={item.texto}
                id_do_post={item.id}
                />
            )}
            />
        </View>
    );
  }