function tamanhoMaximo(event, maximo){
    return event.target.value.substring(0, maximo);
}

function tamanhoMinimo(event, erros , setter){
    if(event.target.value.length < 5){
      setter({...erros, [event.target.name]:{ valido: false, mensagem:"Tem que ter pelo menos 5 letras aqui"}})
    } else {
      setter({...erros, [event.target.name]:{ valido: true, mensagem:""}})
    }
}

export { tamanhoMaximo, tamanhoMinimo }