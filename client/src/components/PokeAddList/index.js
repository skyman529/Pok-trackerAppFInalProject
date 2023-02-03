//This component is to render the Poke Cards List to add (data labels may change!) -Faith

import React from 'react';
import { Link } from 'react-router-dom';

const PokemonList = ({
  pokemons,
  title,
  showTitle = true,
  showUsername = true
}) => {
  // if (!pokemons.length) {
  //   return <h3>No Thoughts Yet</h3>;
  // }
  console.log(pokemons);
  return (
    <div>
      {showTitle && <h3>{title}</h3>}
      {pokemons &&
        pokemons.map((pokemon) => (
          <div key={pokemon._id} className="card mb-3">
            <h4 className="card-header bg-primary text-light p-2 m-0">
              {showUsername ? (
                <Link
                  className="text-light"
                  to={`/profiles/${pokemon.thoughtAuthor}`} /*HOW DO WE CHANGE THIS?*/
                >
                  {pokemon.thoughtAuthor} <br />
                  <span style={{ fontSize: '1rem' }}>
                    had this pokemon on {pokemon.addedAt}
                  </span>
                </Link>
              ) : (
                <>
                  <span style={{ fontSize: '1rem' }}>
                    You had this pokemon on {pokemon.addedAt}
                  </span>
                </>
              )}
            </h4>
            <div className="card-body bg-light p-2">
              <p>{pokemon.name}</p>
            </div>
            <Link
              className="btn btn-primary btn-block btn-squared"
              to={`/pokemons/${pokemon._id}`}
            >
              Join the discussion on this pokemon.
            </Link>
          </div>
        ))}
    </div>
  );
};

export default PokemonList;
