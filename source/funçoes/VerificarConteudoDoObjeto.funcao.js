const VerificarConteudoDaPostagem = (variavelAserComparada, tamanhoMinimoEmLength) =>{
    let variavel = variavelAserComparada;
    let tamanho = tamanhoMinimoEmLength;

    if(variavel <= tamanho){
        return 1;
    }else{
        return 0;
    }
};
export default {VerificarConteudoDaPostagem};