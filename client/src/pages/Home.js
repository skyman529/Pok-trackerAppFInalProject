import React from 'react';
import { useQuery } from '@apollo/client';

import PokemonList from '../components/PokemonList';

import { QUERY_POKEMONS_DATA } from '../utils/queries';

const Home = () => {
  const { loading, data } = useQuery(QUERY_POKEMONS_DATA);
  const pokemondatas = data?.pokemondatas || [];
  // console.log(pokemons);

  return (
    <main>
      <div>
        {loading ? (
          <div>Loading...</div>
        ) : (
          <PokemonList
            pokemondatas={pokemondatas}
          />
        )}
      </div>
    </main>
  );
};

export default Home;