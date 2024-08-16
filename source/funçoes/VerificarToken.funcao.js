import axios from "axios";
//constante do ip ou porta
// rede do celular 192.168.35.157
import { local } from "./IpOuLocalhost";

const VerificarToken = async (token) =>{
//primeiramente verificar se tem token
    if(!token){
         //se retornar 0, vou buscar na pagina e continuar o procedimento padrão para um usuário deslogado 
         return 0;
    }else{
        //verificar valor token
        console.log(`Valor do token, segue: ${token}`);
        try{
            //comparar com o token do server
            // Configuração do cabeçalho com o token de autorização
            const config = {
                headers: {
                    'Authorization': token
                }
            };
            const response = await axios.get(`http://${local}:3000/homePage`, config)
                if( response.status === 200){
                    //se retornar 1 posso proseguir para a pagina
                    return 1;
                }
                else{
                    //se retornar 0, removo o token e vou para o login
                    return 0;
                }
            
        }catch(err){
            console.log(`Erro ao verificar token, segue o erro: ${err}`);
            return 0;
        }
    }
};
export {VerificarToken};