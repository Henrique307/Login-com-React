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
  const [contaExistente, defineConta] = useState(false) //false
  const [erros, setErros] = useState({
    usuario: { valido: true, mensagem: "" },
    senha: { valido: true, mensagem: "" }
  });
  
  const navigate = useNavigate()

  useEffect(() => {
    pegaDados("/contas", setContas);
  }, []);
  
  return (
    <form
      className="janelinha"
      onSubmit={(event) => {
        event.preventDefault();

        for (var i = 0; i < contas.length; i++) {
          if (contas[i].nome === usuario && contas[i].senha === senha) {
            navigate(`/profile:${contas[i].id}`)
            return
          }

          // Testing Feature
          if (i === contas.length - 1) {
            defineConta(true)
          }
        }

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
        autoFocus
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
      <span className={contaExistente ? "aparece erro" : "escondido"}> Conta inexistente, cadastre-se <Link to={"/cadastro"}>aqui</Link>!</span>
    </form>
  );
};
export default Login;


