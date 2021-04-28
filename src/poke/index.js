import { useEffect, useState } from "react";
import Axios from "axios";

const BASE_URL = "https://pokeapi.co/api/v2/pokemon?limit=99";
export const Pokemon = () => {
  const [pokemonData, setPokemonData] = useState([]);
  const [pokeName, setPokeName] = useState('');
  useEffect(() => {
    const fetchData = async () => {
      let response = await Axios.get(BASE_URL);
      if(response){

          setPokemonData(response.data.results);
      }
    };
    fetchData();
  }, []);
  return (
    <div className="poke">
      {/* {pokemonData ? (
        pokemonData.map((pokemon) => (
          <div key={pokemon.name}>
            <div className="singlePokemon">{pokemon.name}</div>
          </div>
        ))
      ) : (
        <>No Pokemons</>
      )} */}
      <div className="poke-search" >

      <input className="input" placeholder="Search Poke" type="text" value={pokeName} onChange={e => setPokeName(e.target.value) }/>
      <button>Querry Poke</button>
      </div>
    </div>
  );
};
