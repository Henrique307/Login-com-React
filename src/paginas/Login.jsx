import React, { useEffect, useState } from "react";
import { Link, useNavigate } from 'react-router-dom';

import { TextField, Button } from "@material-ui/core";

import { pegaDados } from "../api";
import { tamanhoMaximo, tamanhoMinimo } from "../functions";

import "../css/index.css";

function Login() {

  
  const [contas, setContas] = useState([]);
  const [usuario, setUsuario] = useState("");
  const [senha, setSenha] = useState("");
  const [erros, setErros] = useState({
    usuario: { valido: true, mensagem: "" },
    senha: { valido: true, mensagem: "" },
    contaExistente: { valido:undefined, mensagem: "" }
  });
  
  const navigate = useNavigate()

  useEffect(() => {
    pegaDados("/contas", setContas);
  }, []);


  // ISSO AQUI É MUITO FEIO, ARRUMA UM JEITO MELHOR

  function teste(erros) {
    switch (erros.contaExistente.valido) {
      case true: 
      return "aparece exito"
      case false: 
      return "aparece erro"
      case undefined:
        return "escondido"
      default: 
        return 
    }
  }

  //

  return (
    <form
      className="janelinha"
      onSubmit={(event) => {
        event.preventDefault();

        let conta = contas.find(conta => conta.nome === usuario && conta.senha === senha)

        if(conta){
          setErros({...erros, contaExistente: { valido:true, mensagem: "Redirecinando para sua página..."}})
          setTimeout(()=>{navigate(`/profile:${conta.id}`)}, 5000)
        } else {
          setErros({...erros, contaExistente: { valido:false, mensagem: `Conta não encontrada =/` }})
        }
        // solução antiga
        // for (var i = 0; i < contas.length; i++) {
        //   if (contas[i].nome === usuario && contas[i].senha === senha) {
        //     navigate(`/profile:${contas[i].id}`)
        //     return
        //   }
        // }

      }}
    >
      <h1>Faça seu login</h1>
      <TextField
        onChange={(event) => {
          setUsuario(tamanhoMaximo(event, 25));
        }}
        onBlur={(event) => {
          tamanhoMinimo(event, erros, setErros)
        }}
        error={!erros.usuario.valido}
        helperText={erros.usuario.mensagem}
        variant="standard"
        name="usuario"
        value={usuario}
        placeholder="usuario"
        margin="normal"
      />
      <TextField
        onChange={(event) => {
          setSenha(tamanhoMaximo(event, 15));
        }}
        onBlur={event => {
          tamanhoMinimo(event, erros, setErros)
        }}
        error={!erros.senha.valido}
        helperText={erros.senha.mensagem}
        variant="standard"
        name="senha"
        value={senha}
        placeholder="senha"
        margin="normal"
        type="password"
      />
      <Button 
        type="submit"
        variant="outlined"
        className="botao"
        disabled={senha.length < 5 || usuario.length < 5}
      >
        
        Login
      </Button>
      <span className="facaConta"> Não possui uma conta? <Link to={'/cadastro'}> Cadastre-se! </Link></span>
      <span className={teste(erros)}> {erros.contaExistente.mensagem} </span>
    </form>
  );
};
export default Login;


