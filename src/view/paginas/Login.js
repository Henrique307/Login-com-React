import React, { useEffect, useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import errosHandler from "../../utils/ErrosHandler";

import { TextField, Button } from "@material-ui/core";

import "../../css/index.css";
import { isEmail } from "class-validator";

function Login() {

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erros, setErros] = useState({
    email: { valido: true, mensagem: "" },
    senha: { valido: true, mensagem: "" },
  })
  
  const navigate = useNavigate()

  return (
    <form
      action="submit"
      className="janelinha"
      onSubmit={(event) => event.preventDefault()}
    >
      <h1>Faça seu login</h1>
      <TextField
        onChange={(event) => {
          if(isEmail(event.target.value)) {
            setEmail(event.target.value)
            setErros({...erros, ...errosHandler.turnOffErr(event)})
          }
        }}
        onBlur={(event) => setErros({...erros, ...errosHandler.emailValido(event)})}
        error={!erros.email.valido}
        helperText={erros.email.mensagem}
        variant="standard"
        name="email"
        placeholder="email"
        margin="normal"
        type="email"
      />
      <TextField
        onChange={(event) => {
          if(senha.length >= 4) {
            setErros({...erros, ...errosHandler.turnOffErr(event)})
          }
          setSenha(errosHandler.tamanhoMaximo(event, 15));
        }}
        onBlur={ (event) => {
          setErros({...erros, ...errosHandler.tamanhoMinimo(event)})
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
        disabled={
          errosHandler.confereErros(erros) ||
          senha.length < 5
        }
      >  
        Login
      </Button>
      <span className="facaConta"> Não possui uma conta? <Link to={'/cadastro'}> Cadastre-se! </Link></span>
    </form>
  );
};

export default Login;


