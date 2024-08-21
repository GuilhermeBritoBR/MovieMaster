import AsyncStorage from "@react-native-async-storage/async-storage";
//deletar token após logout e também deletar token da api
export default async function DeletarToken(token){
    //comando para deletar
    await AsyncStorage.removeItem(token);
}
