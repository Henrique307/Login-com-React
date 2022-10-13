import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Cadastro, Login, PaginaUsuario, PaginaErro } from "./view/paginas";

import "./css/index.css";

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route exact path="/login" element={<Login />} />
				<Route exact path="/" element={<PaginaUsuario />} />
				<Route exact path="/cadastro" element={<Cadastro />} />
				<Route path="*" element={<PaginaErro />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
