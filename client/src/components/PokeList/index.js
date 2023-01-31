import React, { useEffect } from 'react';
import PokeItem from '../PokeItem';
import { useStoreContext } from '../../utils/GlobalState';
import { UPDATE_POKES } from '../../utils/actions';
import { useQuery } from '@apollo/client';
import { QUERY_POKES } from '../../utils/queries';
import { idbPromise } from '../../utils/helpers';
import spinner from '../../assets/spinner.gif';

function PokeList() {
  const [state, dispatch] = useStoreContext();

  const { currentShiny } = state;

  const { loading, data } = useQuery(QUERY_POKES);

  useEffect(() => {
    if (data) {
      dispatch({
        type: UPDATE_POKES,
        pokes: data.pokes,
      });
      data.pokes.forEach((poke) => {
        idbPromise('pokes', 'put', poke);
      });
    } else if (!loading) {
      idbPromise('pokes', 'get').then((pokes) => {
        dispatch({
          type: UPDATE_POKES,
          pokes: pokes,
        });
      });
    }
  }, [data, loading, dispatch]);

  function filterPokes() {
    if (!currentShiny) {
      return state.pokes;
    }

    return state.pokes.filter(
      (poke) => poke.shiny._id === currentShiny
    );
  }

  return (
    <div className="my-2">
      <h2>Our Pokes:</h2>
      {state.pokes.length ? (
        <div className="flex-row">
          {filterPokes().map((poke) => (
            <PokeItem
              key={poke._id}
              _id={poke._id}
              image={poke.image}
              name={poke.name}
              price={poke.price}
              quantity={poke.quantity}
            />
          ))}
        </div>
      ) : (
        <h3>You haven't added any pokes yet!</h3>
      )}
      {loading ? <img src={spinner} alt="loading" /> : null}
    </div>
  );
}

export default PokeList;
