import { useState } from "react";
import "./App.css";

function App() {
  // use state cria uma variável e uma função para mudar essa variável
  // serve para armazenar estados
  // este aqui armazena o pokemon
  const [pokemon, setPokemon] = useState(null);
  // este aqui armazena se está com loading ou nao
  const [loading, setLoading] = useState(false);

  // esta é a função que busca um pokemon na API dos Pokemons
  async function buscarPokemonAleatorio() {
    // gera um número "aleatório"
    const id = Math.floor(Math.random() * 1025) + 1;

    setLoading(true);

    try {
      // faz o fetch na api dos pokemons
      // eu sei que é este o link pois é o que a documentação me mostra
      const resposta = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${id}`
      );

      // pego a resposta em json e armazeno como objeto javascript
      const dados = await resposta.json();

      // armazeno os dados do pokemon na variavel "pokemon"
      setPokemon(dados);
    } catch (erro) {
      console.error("Erro ao buscar Pokémon:", erro);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main>
      <h1>Pokémon Aleatório</h1>

      <button onClick={buscarPokemonAleatorio}>
        Buscar Pokémon
      </button>
      {/* O parágrafo só aparece quando loading é true */}
      {loading && <p>Carregando...</p>}

      {/* quando pokemon for true E loading for false */}
      {pokemon && !loading && (
        <div>
          <img
            src={pokemon.sprites.front_default}
            alt={pokemon.name}
          />

          <h2>{pokemon.name}</h2>
        </div>
      )}
    </main>
  );
}

export default App;