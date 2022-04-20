import React, { useState, useEffect } from "react";
import { TextField, Button } from "@material-ui/core";

import { pegaDados, envia } from "../api";

const Cadastro = () => {
  const [erros, setErros] = useState({
    usuario: { valido: true, mensagem: "" },
    senha: { valido: true, mensagem: "" },
    confirmaSenha: { valido: true, mensagem: "" },
  });

  const [confirmaSenha, setConfirmaSenha] = useState("");
  const [usuario, setUsuario] = useState("");
  const [senha, setSenha] = useState("");
  const [contas, setContas] = useState([]);

  class Player {
    constructor(usuario, senha) {
      this.nome = usuario;
      this.senha = senha;
      this.id = "_" + Math.random().toString().substring(2, 9);
    }
  }

  useEffect(() => {
    pegaDados("/contas", setContas);
  }, []);

  const tamanhoMaximo = (event, maximo) =>
    event.target.value.substring(0, maximo);

  function checaUsuario() {

    setErros({ ...erros, usuario: { valido: true, mensagem: "" } });
    
    if(usuario.length < 5){
      setErros({
        ...erros,
        usuario: {
          valido: false,
          mensagem: "mínimo de 5 caracteres",
        },
      });
      return;
    }

    for (var i = 0; contas.length > i; i++) {
      
      if (contas[i].nome === usuario) {
        setErros({
          ...erros,
          usuario: {
            valido: false,
            mensagem: "Esse nome de usuário ja existe",
          },
        });
        break;
      }
    }
  }

  function checaSenha() {

    if(senha.length < 5){
      setErros({
        ...erros,
        senha: {
          valido: false,
          mensagem: "mínimo de 5 caracteres",
        },
      });
      return;
    }

    setErros({...erros, senha: { valido: true, mensagem: "" } });
  }

  function checaConfirmaSenha(){
    if (senha !== confirmaSenha) {
      setErros({
        ...erros,
        confirmaSenha: { valido: false, mensagem: "As senhas não coincidem" },
      });
      return;
    }
      setErros({...erros, confirmaSenha: { valido: true, mensagem: "" } });
  }

  function checaErros() {

    /////////////////////////////////////// ATENÇÃO PRA O JEITO CERTO DE FAZER ISSO AQUI
    for (let erro in erros) {
      if (!erros[erro].valido) {
        return true;
      }

      if (usuario === "" || senha === "" || confirmaSenha.length !== senha.length) {
        return true;
      }
    }
    return false;
    /////////////////////////////////////// ATENÇÃO PRA O JEITO CERTO DE FAZER ISSO AQUI

  }

  return (
    <form
      className="janelinha"
      onSubmit={(event) => {
        event.preventDefault();
        if (usuario !== "" || senha !== "") {
          envia("/contas", new Player(usuario, senha));
          console.log(contas);
        }
      }}
    >
      <h1>Cadastre-se!</h1>
      <TextField
        onChange={(event) => {
          setUsuario(tamanhoMaximo(event, 25));
        }}
        onBlur={checaUsuario}
        error={!erros.usuario.valido}
        helperText={erros.usuario.mensagem}
        variant="standard"
        name="usuario"
        value={usuario}
        placeholder="usuario"
        margin="normal"
        autoFocus
      />
      <TextField
        onChange={(event) => {
          setSenha(tamanhoMaximo(event, 15));
        }}
        onBlur={checaSenha}
        error={!erros.senha.valido}
        helperText={erros.senha.mensagem}
        variant="standard"
        name="senha"
        value={senha}
        placeholder="senha"
        margin="normal"
        type="password"
      />
      <TextField
        onChange={(event) => {
          setConfirmaSenha(tamanhoMaximo(event, 15));
          // ideia if(senha.length === confirmaSenha.length ) checaConfirmaSenha()
        }}
        onBlur={checaConfirmaSenha}
        error={!erros.confirmaSenha.valido}
        helperText={erros.confirmaSenha.mensagem}
        name="confirmaSenha"
        variant="standard"
        value={confirmaSenha}
        placeholder="confirme sua senha"
        margin="normal"
        type="password"
      />
      <Button
        variant="outlined"
        className="botao"
        type="submit"
        disabled={checaErros}
      >
        Cadastrar
      </Button>
    </form>
  );
};

export default Cadastro;