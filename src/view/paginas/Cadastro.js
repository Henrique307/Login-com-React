import React, { useState, useEffect } from "react";
import { TextField, Button, Link } from "@material-ui/core";
import { isEmail } from "class-validator"

import errosHandler from "../../utils/ErrosHandler";
import { useNavigate } from "react-router";

const Cadastro = () => {

  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [usuario, setUsuario] = useState('');
  const [confirmaSenha, setConfirmaSenha] = useState('')
  const [senhasVerificadas, setSenhasVerificadas] = useState(false)
  const [erros, setErros] = useState({
    usuario: { valido: true, mensagem: "" },
    email: { valido: true, mensagem: "" },
    senha: { valido: true, mensagem: "" },
    confirmaSenha: { valido: true, mensagem: "" },
  })

  return (
    <form
      className="janelinha"
      onSubmit={ (event) => event.preventDefault()}
    >
      <h1>Cadastre-se!</h1>
      <TextField
        onChange={(event) => {
          if(usuario.length >= 4){
            setErros({...erros, ...errosHandler.turnOffErr(event)})
          }
          setUsuario(errosHandler.tamanhoMaximo(event, 20))
        }}
        onBlur={(event) => {
          setErros({...erros, ...errosHandler.tamanhoMinimo(event, 5)})
        }}
        error={!erros.usuario.valido}
        helperText={erros.usuario.mensagem}
        variant="standard"
        name="usuario"
        value={usuario}
        placeholder="usuario"
        margin="normal"
        required={true}
      />
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
        onBlur={(event) => {
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
      <TextField
        onChange={(event) => {
          setConfirmaSenha(errosHandler.tamanhoMaximo(event, 15))
          setErros({...erros, ...errosHandler.turnOffErr(event)})
        }}
        onBlur={(event) => {
          setErros({...erros, ...errosHandler.comparaSenhas(event, senha)})
        }}
        error={!erros.confirmaSenha.valido}
        helperText={erros.confirmaSenha.mensagem}
        name="confirmaSenha"
        variant="standard"
        value={confirmaSenha}
        placeholder="confirme sua senha"
        margin="normal"
        type="password"
        required={true}
      />
      <Button
        variant="outlined"
        className="botao"
        type="submit"
        disabled={
          errosHandler.confereErros(erros) ||
          email.lengh === 0 ||
          senha.lengh === 0 ||
          usuario.lengh === 0 ||
          confirmaSenha.length === 0
        }
      >
        Cadastrar
      </Button>
    </form>
  );
};

export default Cadastro;