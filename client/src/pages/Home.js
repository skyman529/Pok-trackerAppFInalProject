import React from 'react';
import { useQuery } from '@apollo/client';

import PokemonList from '../components/PokeAddList';
import PokemonCard from '../components/PokeAdd';

import { QUERY_POKEMONS } from '../utils/queries';

const Home = () => {
  const { loading, data } = useQuery(QUERY_POKEMONS);
  const pokemons = data?.pokemons || [];

  return (
    <main>
      <div>
        <PokemonList
          pokemons={pokemons}
        />
      </div>
    </main>
  );
};

export default Home;