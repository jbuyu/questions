import { useEffect, useState } from "react";
import Select from 'react-select'

import Axios from "axios";

const BASE_URL = "https://pokeapi.co/api/v2/pokemon?limit=99";
export const Pokemon = () => {
  const [pokemonData, setPokemonData] = useState([]);
  const [pokeName, setPokeName] = useState("");
  const [loading, setLoading] = useState(false);
  const fetchData = async () => {
    setLoading(true);
    let response = await Axios.get(BASE_URL);
    if (response) {
      setPokemonData(response.data.results);
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = (e) => {
    const { value } = e.taget.value;
    fetchData();
  };
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
      <div className="poke-search">
        {/* <input className="input" placeholder="Search Poke" type="text" value={pokeName} onChange={e => setPokeName(e.target.value) }/> */}
        <Select className="search-box" options={pokemonData} />

        <button onClick={handleSubmit}>
          {loading ? "Searching..." : "Search"}
        </button>
      </div>
    </div>
  );
};
