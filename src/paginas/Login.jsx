import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';

import { TextField, Button } from "@material-ui/core";

import { pegaDados } from "../api";

import "../css/index.css";

function Login() {

  const [contas, setContas] = useState([]);
  const [usuario, setUsuario] = useState("");
  const [senha, setSenha] = useState("");
  // const bemvindo = false;

  const navigate = useNavigate()

  useEffect(() => {
    pegaDados("/contas", setContas);
  }, []);

  const tamanhoMaximo = (event, maximo) =>
    event.target.value.substring(0, maximo);

  return (
    <form
      className="janelinha"
      onSubmit={(event) => {
        event.preventDefault();

        // if(usuario === "" || senha === ""){
        //   console.log('ce nao boto os negocio ali')
        //   return
        // }

        for (var i = 0; i < contas.length; i++) {
          if (contas[i].nome === usuario && contas[i].senha === senha) {
            navigate(`/profile:${contas[i].id}`)
            return
          }
          if (i === contas.length - 1) {
            console.log(contas);
          }
        }
      }}
    >
      <h1>Faça seu login</h1>
      <TextField
        onChange={(event) => {
          setUsuario(tamanhoMaximo(event, 25));
        }}
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
      <Button 
      type="submit"
      variant="outlined"
      className="botao"
      disabled={senha.length < 5 || usuario.length < 5 ? true : false}>
        Login
      </Button>
      {/* <span className={bemvindo ? "aparece" : "escondido"}>OLA CARALHO</span> */}
    </form>
  );
};
export default Login;
