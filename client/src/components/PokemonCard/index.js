import { React, useState } from 'react';
import { Link } from 'react-router-dom';

import { useMutation } from '@apollo/client';
import { ADD_POKEMON } from '../../utils/mutations';
import { QUERY_POKEMONS, QUERY_ME } from '../../utils/queries';

import Badges from '../Badges/index';
import Auth from '../../utils/auth';

import { Card, Form, Button } from 'react-bootstrap';


const PokemonCard = ({
    _id,
    number,
    pokeName,
    pokeType,
    image,
}) => {

  // console.log(pokemon.pokeName)

  const [shiny, setShiny] = useState(false);

    // console.log(number);

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
                    number: number,
                    pokeName: pokeName,
                    pokeType: pokeType,
                    image: image,
                    pokeUser: Auth.getProfile().data.username,
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

    // useEffect(() => {
    //     console.log(shiny);
    //   });

    return (
        <div>
            {Auth.loggedIn() ? (
                <>
                    <Card style={{ width: '18rem' }}>
                        <Card.Img variant="top" src={`images/pokemon_sprites/${number}.png`} />
                        <Card.Body>
                            <Card.Text id='pokeCard'>{number}</Card.Text>
                            <Link to={`/thoughts/${_id}`}>
                                <Card.Title id='pokeCard'>{pokeName}</Card.Title>
                            </Link>
                            <Badges
                                _id={pokeName._id}
                                pokeType={pokeType}
                            ></Badges>
                            <br></br>
                            <Form>
                                <Form.Check
                                    type="switch"
                                    id="custom-switch"
                                    onClick={handleShiny}
                                />
                            </Form>
                            <Button variant="primary" id='pokeCard'  onClick={handleFormSubmit} >Add Pokemon</Button>
                        </Card.Body>
                    </Card>
                </>
            ) : (
                <p>
                    You need login to add Pokemon. Please{' '}
                    <Link to="/login">login</Link> or <Link to="/signup">signup.</Link>
                </p>
            )}
        </div>
    );
};

export default PokemonCard;