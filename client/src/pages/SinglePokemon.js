import React from 'react';

// Import the `useParams()` hook
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import PokemonCard from '../components/PokemonCard/index'
import { QUERY_SINGLE_POKEMON } from '../utils/queries';

const SinglePoke = () => {
  // Use `useParams()` to retrieve value of the route parameter `:profileId`
  const { pokemonId } = useParams();

  const { loading, data } = useQuery(QUERY_SINGLE_POKEMON, {
    // pass URL parameter
    variables: { pokemonId: pokemonId },
  });

  const pokemon = data?.pokemon || {};

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      < PokemonCard 
        number={pokemon.number}
        name={pokemon.name}
        type={pokemon.pokeType}
        image={pokemon.image}
      />
    </div>
  );
};

export default SinglePoke;
