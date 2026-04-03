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

  const [fetchingPokemons, setFetchingPokemons] = useState(true)
  const [pokemons, setPokemons] = useState([])
  const [selectedPokemons, setSelectedPokemons] = useState([])
  const [score, setScore] = useState(0)
  const [bestScore, setBestScore] = useState(0)

  useEffect(() => {
    async function loadPokemons () {
      const pokemonArray = await getPokemons();
      setPokemons(pokemonArray)
      setFetchingPokemons(false);
    }
    loadPokemons();
  }, [])

    if (fetchingPokemons) return <h1>Loading</h1>

    function handleScore () {
      setScore(score => score + 1)
      if (score+1 > bestScore) setBestScore(() => score+1);
    }

    function shuffle () {
      const copy = [...pokemons]
      for (let i = copy.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [copy[i], copy[j]] = [copy[j], copy[i]];
      }
      setPokemons(copy)
    }

    function handleClick (id) {
      shuffle()
      if (selectedPokemons.includes(id)) {
        setScore(0);
        setSelectedPokemons([])
      } else {
        setSelectedPokemons([...selectedPokemons, id])
        handleScore()
      }
    }

    return (
    <div className='container'>
      <div className='header'>
        <div className='instructions'>Get points by clicking on an image but don't click on any more than once!</div>
        <div className='score'>Score: {score}</div>
        <div className='score'>Best score: {bestScore}</div>
      </div>
      {!fetchingPokemons && 
        <Images pokemons={pokemons} handleClick={handleClick}/>
        }
    </div>
    )
}

export default App


// [
//   {
//     "id": 1021,
//     "name": "raging-bolt",
//     "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1021.png"
//   },
//   {
//     "id": 894,
//     "name": "regieleki",
//     "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/894.png"
//   },
//   {
//     "id": 10083,
//     "name": "pikachu-phd",
//     "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/10083.png"
//   },
//   {
//     "id": 667,
//     "name": "litleo",
//     "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/667.png"
//   },
//   {
//     "id": 10120,
//     "name": "zygarde-complete",
//     "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/10120.png"
//   },
//   {
//     "id": 10091,
//     "name": "rattata-alola",
//     "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/10091.png"
//   },
//   {
//     "id": 10109,
//     "name": "geodude-alola",
//     "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/10109.png"
//   },
//   {
//     "id": 10276,
//     "name": "terapagos-terastal",
//     "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/10276.png"
//   },
//   {
//     "id": 10155,
//     "name": "necrozma-dusk",
//     "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/10155.png"
//   }
// ]