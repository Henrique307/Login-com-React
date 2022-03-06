import React, {useState} from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { Cadastro, Login, Profile, PaginaErro } from "./paginas";

import "./css/index.css"

function App() {

  const [conta, setConta] = useState();

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/profile:id" element={<Profile />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="*" element={<PaginaErro/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
