import React from 'react';

import { useMutation } from '@apollo/client';
import { ADD_POKEMON } from '../../utils/mutations';
import { QUERY_POKEMONS, QUERY_ME } from '../../utils/queries';

import Button from 'react-bootstrap';

const AddButton = (props) => {

    const [addPokemon, {error}] = useMutation(ADD_POKEMON, {
        update(cache, {data: { addPokemon } }) {
          try {
            const { pokemons } = cache.readQuery({ query: QUERY_POKEMONS })

            cache.writeQuery({
                query: QUERY_POKEMONS,
                data: { pokemons: [addPokemon, ...pokemons] },
            });
          } catch (e) {
            console.error(e);
          }
          const { me } = cache.readQuery({ query: QUERY_ME });
          cache.writeQuery({
            query: QUERY_ME,
            data: { me: { ...me, thoughts: [...me.thoughts, addThought] } },
          });
        },
      });

    return (
        <Button variant="primary" id='pokeCard' data-id={props.data}>Add Pokemon</Button>
    )
};
export default AddButton;