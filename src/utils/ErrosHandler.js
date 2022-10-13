import { isEmail } from "class-validator";

class ErrosHandler {
  
  tamanhoMaximo(event, maximo){
      return event.target.value.substring(0, maximo);
  }
  
  tamanhoMinimo(event, minimo = 5){
    if(event.target.value.length < minimo){
      return {[event.target.name]:{ valido: false, mensagem:`${[event.target.name]} deve ter pelo menos ${minimo} letras`}}
    } else {
      return {[event.target.name]:{ valido: true, mensagem:``}}
    }
  }
  
  emailValido(event) {
    if(isEmail(event.target.value)){
      return {[event.target.name]:{ valido: true, mensagem: ``}}
    } else {
      return {[event.target.name]:{ valido: false, mensagem:`Email inválido`}}
    }
  }
  
  turnOffErr(event) {
    return {[event.target.name]:{ valido: true, mensagem:""}}
  }

  confereErros(erros) {
    for(let e in erros) {
      if(!erros[e].valido) {
        return true
      }
    }
    return false
  }

  comparaSenhas(event, senha) {
    if (event.target.value === senha) {
      return 
    } else {
      return {[event.target.name]:{ valido: false, mensagem:"As senhas não coincidem"}}
    }
  }
  
};

const errosHandler = new ErrosHandler();

export default errosHandler