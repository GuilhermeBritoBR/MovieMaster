const VerificarConteudoDaPostagem = (variavelAserComparada, tamanhoMinimoEmLength) =>{
    if(variavelAserComparada <= tamanhoMinimoEmLength){
        return 1;
    }else{
        return 0;
    }
};
export default {VerificarConteudoDaPostagem};