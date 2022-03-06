import React, { useState, useEffect } from "react";
import { TextField, Button } from "@material-ui/core";

import { pegaDados, envia } from "../api";

const Cadastro = () => {
  const [erros, setErros] = useState({
    senha: { valido: true, mensagem: "" },
    usuario: { valido: true, mensagem: "" }
  })

  const [confirmaSenha, setConfirmaSenha] = useState("");
  const [usuario, setUsuario] = useState("");
  const [senha, setSenha] = useState("");
  const [contas, setContas] = useState([]);

  class Player {
    constructor(usuario, senha) {
      this.nome = usuario;
      this.senha = senha;
      this.id = '_' + Math.random().toString().substring(2,9)
    }
  }

  useEffect(() => {
    pegaDados("/contas", setContas);
  }, []);

  const tamanhoMaximo = (event, maximo) => event.target.value.substring(0, maximo)

  const checaBanco = () => {
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
      setErros({ ...erros, usuario: { valido: true, mensagem: "" } });
    }
  };

  function checaSenha() {
    if (senha !== confirmaSenha) {
      setErros({
        ...erros,
        senha: { valido: false, mensagem: "As senhas não coincidem" },
      });
    } else {
      setErros({
        ...erros,
        senha: { valido: true, mensagem: "" },
      });
    }
  }

  function tudoNormal() {
      for(let erro in erros){
        if(erro.valido === false){
          return false
        }else{
          continue
        }
      }
    };
  return (
    <form
      className="janelinha"
      onSubmit={(event) => {
        event.preventDefault();
        envia("/contas", new Player(usuario, senha));
        console.log(contas);
      }}
    >
      <h1>Cadastre-se!</h1>
      <TextField
        onChange={(event) => {
          setUsuario(tamanhoMaximo(event, 25));
        }}
        onBlur={checaBanco}
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
        }}
        onBlur={checaSenha}
        error={!erros.senha.valido}
        helperText={erros.senha.mensagem}
        name="confirmaSenha"
        variant="standard"
        value={confirmaSenha}
        placeholder="confirme sua senha"
        margin="normal"
        type="password"
      />
      <Button variant="outlined" className="botao" type="submit" disabled={true}>
        Cadastrar
      </Button>
    </form>
  );
};

export default Cadastro;