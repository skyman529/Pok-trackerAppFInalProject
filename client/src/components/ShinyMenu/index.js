import React, { useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { useStoreContext } from '../../utils/GlobalState';
import {
  UPDATE_SHINIES,
  UPDATE_CURRENT_SHINY,
} from '../../utils/actions';
import { QUERY_SHINIES } from '../../utils/queries';
import { idbPromise } from '../../utils/helpers';

function ShinyMenu() {
  const [state, dispatch] = useStoreContext();

  const { shinies } = state;

  const { loading, data: shinyData } = useQuery(QUERY_SHINIES);

  useEffect(() => {
    if (shinyData) {
      dispatch({
        type: UPDATE_SHINIES,
        shinies: shinyData.shinies,
      });
      shinyData.shinies.forEach((shiny) => {
        idbPromise('shinies', 'put', shiny);
      });
    } else if (!loading) {
      idbPromise('shinies', 'get').then((shinies) => {
        dispatch({
          type: UPDATE_SHINIES,
          shinies: shinies,
        });
      });
    }
  }, [shinyData, loading, dispatch]);

  const handleClick = (id) => {
    dispatch({
      type: UPDATE_CURRENT_SHINY,
      currentShiny: id,
    });
  };

  return (
    <div>
      <h2>Choose if Shiny:</h2>
      {shinies.map((item) => (
        <button
          key={item._id}
          onClick={() => {
            handleClick(item._id);
          }}
        >
          {item.name}
        </button>
      ))}
    </div>
  );
}

export default ShinyMenu;
