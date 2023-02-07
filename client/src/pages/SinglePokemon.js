import React from 'react';

// Import the `useParams()` hook
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import PokemonCard from '../components/PokemonCard/index'
import CommentList from '../components/CommentList/index';
import CommentForm from '../components/CommentForm/index';

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
        pokeName={pokemon.pokeName}
        type={pokemon.pokeType}
        image={pokemon.image}
      />
      <div className="my-5">
        <CommentList comments={pokemon.comments} />
      </div>
      <div className="m-3 p-4" style={{ border: '1px dotted #1a1a1a' }}>
        <CommentForm pokemonId={pokemon._id} />
      </div>
    </div>
  );
};

export default SinglePoke;
