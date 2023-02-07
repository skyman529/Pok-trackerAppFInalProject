import { React, useState } from 'react';

import { useMutation } from '@apollo/client';
import { ADD_POKEMON } from '../../utils/mutations';
import { QUERY_POKEMONS, QUERY_ME } from '../../utils/queries';

import { Form, Button } from 'react-bootstrap';

const AddButton = (props) => {
    const [shiny, setShiny] = useState(false);

    const [addPokemon, { error }] = useMutation(ADD_POKEMON, {
        update(cache, { data: { addPokemon } }) {
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
                data: { me: { ...me, pokemons: [...me.pokemons, addPokemon] } },
            });
        },
    });

    const handleFormSubmit = async (event) => {
        event.preventDefault();

        try {
            const { data } = await addPokemon({
                variables: {
                    number: props.number,
                    name: props.name,
                    pokeType: props.pokeType,
                    image: props.image,
                    shiny: shiny
                },
            });

            setShiny(false);
        } catch (err) {
            console.error(err);
        }
    };

    const handleShiny = () => {
        setShiny(!shiny);
    };

    return (
        <>
            <Form>
                <Form.Check
                    type="switch"
                    id="custom-switch"
                    onClick={handleShiny}
                />
            </Form>
            <Button variant="primary" id='pokeCard' onClick={handleFormSubmit} >Add Pokemon</Button>
        </>
    )
};
export default AddButton;