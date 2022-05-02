import React from "react";
import { HashRouter as Router, Route, Routes } from "react-router-dom";

import { Cadastro, Login, PaginaUsuario, PaginaErro } from "./paginas";

import "./css/index.css"

function App() {

  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route exact path="/profile:id" element={<PaginaUsuario />} />
        <Route exact path="/cadastro" element={<Cadastro />} />
        <Route path="*" element={<PaginaErro/>} />
      </Routes>
    </Router>
  );
}

export default App;