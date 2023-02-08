import React from 'react';

// Import the `useParams()` hook
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import PokemonCard from '../components/PokemonCard/index'

import { QUERY_SINGLE_POKEMON_DATA } from '../utils/queries';

const SinglePoke = () => {
  // Use `useParams()` to retrieve value of the route parameter `:profileId`
  const { pokemondataId } = useParams();

  const { loading, data } = useQuery(QUERY_SINGLE_POKEMON_DATA, {
    // pass URL parameter
    variables: { pokemondataId: pokemondataId },
  });

  const pokemondata = data?.pokemondata || {};

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      < PokemonCard
        _id={pokemondata._id} 
        number={pokemondata.number}
        pokeName={pokemondata.name}
        pokeType={pokemondata.pokeType}
        image={pokemondata.image}
      />
    </div>
  );
};

export default SinglePoke;
