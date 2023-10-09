import React, { useState, useEffect } from "react";
import axios from "axios";
import Styles from "../Styles/RenderCards.module.css";

function PokemonList() {
  const [kantoPokemon, setKantoPokemon] = useState([]);

  useEffect(() => {
    const fetchKantoPokemon = async () => {
      try {
        // Define an array of specific Pokémon names
        const pokemonNames = [
          "charmander",
          "squirtle",
          "bulbasaur",
          "mewtwo",
          "pikachu",
        ];

        // Map the Pokémon names to their respective URLs
        const pokemonUrls = pokemonNames.map(
          (name) => `https://pokeapi.co/api/v2/pokemon/${name}`
        );

        // Fetch data for the specified Pokémon
        const pokemonDataPromises = pokemonUrls.map(async (url) => {
          const pokemonResponse = await axios.get(url);
          return pokemonResponse.data;
        });

        const pokemonData = await Promise.all(pokemonDataPromises);

        setKantoPokemon(pokemonData);
      } catch (error) {
        console.error("Error fetching Kanto Pokémon:", error);
      }
    };

    fetchKantoPokemon();
  }, []); // The empty dependency array ensures this effect runs only once on mount

  return (
    <div>
      <h1 className={Styles.header}>
        Welcome to the Pokemon Memory Card Game created by Wiredguitars@github
      </h1>
      <ul>
        {kantoPokemon.map((pokemon) => (
          <li className={Styles.li} key={pokemon.id}>
            <img src={pokemon.sprites.front_default} alt={pokemon.name} />
            {pokemon.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PokemonList;
