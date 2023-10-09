import React, { useState } from "react";
import Styles from "../Styles/MemoryCardGame.module.css"



function shuffleArray(array) {
  let shuffledArray = [...array];
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
}

function MemoryCardGame({ pokemonData }) {
  const [selectedPokemon, setSelectedPokemon] = useState([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  const shuffledPokemonData = shuffleArray(pokemonData);

  const resetGame = () => {
    
    setSelectedPokemon([])
    setScore(0)
    setGameOver(false)
  }

  const handleCardClick = (pokemon) => {
  if (gameOver === true){
    return
  } else{
      if (selectedPokemon.includes(pokemon)) {
      setGameOver(true);
    } else {
      setSelectedPokemon([...selectedPokemon, pokemon]);
      setScore(score + 1);
    }
  };
  }
  
  return (
    <div>
      <h1 >
        Welcome to the Pokemon Memory Card Game created by Wiredguitars@github
      </h1>
      <h5>I own none of these sprites, you can find them on pokeapi.co</h5>
      <h1>Memory Card Game</h1>
      <p>Score: {score}</p>
      {gameOver ? <p>Game Over!</p> : null}
      <div className="card-container">
        {shuffledPokemonData.map((pokemon) => (
          <div
            key={pokemon.id}
            className="card"
            onClick={() => handleCardClick(pokemon)}
          >
            <div className={Styles.htext}>
              <img src={pokemon.sprites.front_default} alt={pokemon.name} />{pokemon.name}
            </div>
          </div>
        ))}
      </div>
      <button onClick={resetGame}>Reset Game</button> 
    </div>
  );
}



export default MemoryCardGame;
