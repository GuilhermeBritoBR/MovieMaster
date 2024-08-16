import AsyncStorage from "@react-native-async-storage/async-storage";
//salvar nome do usuario
const SalvarNome = async (nome) =>{
    try{
        await AsyncStorage.setItem('@name', nome);
    }catch(err){
        console.log(`Erro no salvamento do tolken, segue o erro: ${err}`);
    }
}
export {SalvarNome};