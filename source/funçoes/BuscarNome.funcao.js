import AsyncStorage from "@react-native-async-storage/async-storage";
//salvar nome do usuario
const BuscarNome = async () =>{
    try{
        const nome = await AsyncStorage.getItem('@name');
        return nome;
    }catch(err){
        console.log(`Erro no salvamento do tolken, segue o erro: ${err}`);
    }
}
export {BuscarNome};