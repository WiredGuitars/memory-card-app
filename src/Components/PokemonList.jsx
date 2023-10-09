import React, { useState, useEffect } from "react";
import axios from "axios";
import MemoryCardGame from "./MemoryCardGame";

function PokemonList() {
  const [kantoPokemon, setKantoPokemon] = useState([]);


  useEffect(() => {
    const fetchKantoPokemon = async () => {
      try {
        const pokemonNames = [
          "charmander",
          "squirtle",
          "bulbasaur",
          "mewtwo",
          "pikachu",
          "articuno"
        ];

        const pokemonUrls = pokemonNames.map(
          (name) => `https://pokeapi.co/api/v2/pokemon/${name}`
        );

        const pokemonDataPromises = pokemonUrls.map(async (pokemon) => {
          const pokemonResponse = await axios.get(pokemon);
          console.log(pokemonResponse)
          return pokemonResponse.data;
        });

        const pokemonData = await Promise.all(pokemonDataPromises);
        setKantoPokemon(pokemonData);
      } catch (error) {
        console.error("Error fetching Kanto Pokémon:", error);
      }
    };

    fetchKantoPokemon();
  }, []); 

  return (
    <>
      <MemoryCardGame pokemonData={kantoPokemon} />
    </>
  );
}

export default PokemonList;
