import React from 'react';
import { useQuery } from '@apollo/client';

import PokemonList from '../components/PokemonList';

import { QUERY_POKEMONS } from '../utils/queries';

const Home = () => {
  const { loading, data } = useQuery(QUERY_POKEMONS);
  const pokemons = data?.pokemons || [];
  console.log(pokemons);

  return (
    <main>
      <div className="flex-row justify-center">
        <div
          className="col-12 col-md-10 mb-3 p-3"
          style={{ border: '1px dotted #1a1a1a' }}
        >
          <PokemonCard />
        </div>
        <div className="col-12 col-md-8 mb-3">
          {loading ? (
            <div>Loading...</div>
          ) : (
            <PokemonList
              pokemons={pokemons}
              title="Start your collection today!"
            />
          )}
        </div>
      </div>
    </main>
  );
};

export default Home;