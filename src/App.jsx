import { useState } from "react";
import "./App.css";

function App() {
  const [cep, setCep] = useState("");
  const [endereco, setEndereco] = useState(null);
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState("");

  async function buscarCep() {
    if (!cep) {
      setErro("Digite um CEP.");
      return;
    }

    setLoading(true);
    setErro("");
    setEndereco(null);

    try {
      const resposta = await fetch(
        `https://viacep.com.br/ws/${cep}/json/`
      );

      const dados = await resposta.json();

      if (dados.erro) {
        setErro("CEP não encontrado.");
        return;
      }

      setEndereco(dados);
    } catch (erro) {
      setErro("Erro ao buscar o CEP.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main>
      <h1>Buscar CEP</h1>

      <input
        type="text"
        placeholder="Digite o CEP"
        value={cep}
        onChange={(event) => setCep(event.target.value)}
      />

      <button onClick={buscarCep}>
        Buscar
      </button>

      {loading && <p>Carregando...</p>}

      {erro && <p>{erro}</p>}

      {endereco && (
        <div>
          <p><strong>CEP:</strong> {endereco.cep}</p>
          <p><strong>Rua:</strong> {endereco.logradouro}</p>
          <p><strong>Bairro:</strong> {endereco.bairro}</p>
          <p><strong>Cidade:</strong> {endereco.localidade}</p>
          <p><strong>Estado:</strong> {endereco.uf}</p>
        </div>
      )}
    </main>
  );
}

export default App;