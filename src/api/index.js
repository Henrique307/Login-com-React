import axios from "axios";

const conexao = axios.create({
  baseURL: "http://localhost:3000",
});

// const busca = async (lugar, objeto) => {}

const pegaDados = async (lugar, setDado) => {
  const resposta = await conexao.get(lugar);
  setDado(resposta.data);
};

let envia = async (lugar, dados) => {
  await conexao.post(lugar, dados)
  .then()
  .catch(err => console.log(err))
};

export { pegaDados, envia };
