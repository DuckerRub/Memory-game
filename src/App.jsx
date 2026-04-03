import { useEffect, useState } from 'react'
import {Images} from "./components/Images"
import './App.css'


async function getPokemons () {
  const listRes = await fetch('https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0');
  const listData = await listRes.json();

  const randomPokemons = [];
  const used = new Set();

  while (randomPokemons.length < 9) {
    const randomIndex = Math.floor(Math.random() * listData.results.length);
    const pokemon = listData.results[randomIndex];

    if (used.has(pokemon.name)) continue;
    used.add(pokemon.name);

    const detailRes = await fetch(pokemon.url);
    const detailData = await detailRes.json();

    randomPokemons.push({
      id: detailData.id,
      name: detailData.name,
      image:
        detailData.sprites.other?.['official-artwork']?.front_default ||
        detailData.sprites.front_default,
    });
  }

  return randomPokemons;
}

export function App() {

  const [pokemons, setPokemons] = useState([])
  const [fetchingPokemons, setFetchingPokemons] = useState(true)

  useEffect(() => {
    async function loadPokemons () {
      const pokemonArray = await getPokemons();
      setPokemons(pokemonArray)
      setFetchingPokemons(false);
    }
    loadPokemons();
  }, [])

    if (fetchingPokemons) return <h1>Loading</h1>

    return (
    <div className='container'>
      <div className='header'>
        <div className='instructions'>Instructions</div>
        <div className='score'>Score</div>
      </div>
      {!fetchingPokemons && <Images pokemons={pokemons}/>}
    </div>
    )
}

export default App
