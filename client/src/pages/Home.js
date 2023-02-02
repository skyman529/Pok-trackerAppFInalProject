import React from 'react';
import { useQuery } from '@apollo/client';

import ThoughtList from '../components/PokeAddList';
import ThoughtForm from '../components/PokeAdd';

import { QUERY_ALL_POKES } from '../utils/queries';

const Home = () => {
  const { loading, data } = useQuery(QUERY_ALL_POKES);
  const pokemon = data?.pokemon || [];

  return (
    <main>
      <div className="flex-row justify-center">
        <div
          className="col-12 col-md-10 mb-3 p-3"
          style={{ border: '1px dotted #1a1a1a' }}
        >
          <ThoughtForm />
        </div>
        <div className="col-12 col-md-8 mb-3">
          {loading ? (
            <div>Loading...</div>
          ) : (
            <ThoughtList
              thoughts={thoughts}
              title="Some Feed for Thought(s)..."
            />
          )}
        </div>
      </div>
    </main>
  );
};

export default Home;
