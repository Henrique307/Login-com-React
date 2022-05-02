import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { Cadastro, Login, PaginaUsuario, PaginaErro } from "./paginas";

import "./css/index.css"

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/profile:id" element={<PaginaUsuario />} />
        <Route path="/cadastro" element={<Cadastro />} /> 
        <Route path="*" element={<PaginaErro/>} />
      </Routes>
    </Router>
  );
}

export default App;