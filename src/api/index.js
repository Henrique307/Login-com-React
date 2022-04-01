import axios from "axios";

const conexao = axios.create({
  baseURL: "http://localhost:3000",
});

const busca = async (lugar, objeto) => {
  
}

const pegaDados = async (lugar, setDado) => {
  const resposta = await conexao.get(lugar);
  setDado(resposta.data);
};

let envia = (lugar, dados) => {
  conexao.post(lugar, dados)
  .then(() => console.log("deu Bom familia!!!!"))
  .catch(err => console.log(err))
};

export { pegaDados, busca, envia };
