import { React, useState } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';
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

    const { data } = useQuery(QUERY_POKEMONS);
    const pokemons = data?.pokemons || [];

    const { data2 } = useQuery(QUERY_ME);
    const me = data2?.me || [];

    const [addPokemon, { error }] = useMutation(ADD_POKEMON, {
        update(cache, { data: { addPokemon } }) {
            try {
                const { pokemons } = cache.readQuery({ query: QUERY_POKEMONS });

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
                    number,
                    pokeName,
                    pokeType,
                    image,
                    pokeUser: Auth.getProfile().data.username,
                    shiny: shiny
                },
            });

            setShiny(false);
            {
                alert("Added to collection!");
            }
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
                    <Card style={{ width: '18rem' }} id="border-golden">
                        <Button variant="primary" id="pokeCard" className="bg-red" onClick={handleFormSubmit} >Add Pokemon</Button>
                        <Card.Text id='pokeCard' className="p-2">{number}</Card.Text>
                        <Card.Img variant="top" src={`images/pokemon_sprites/${number}.png`} />
                        <Card.Body>
                            <Card.Title id='pokeCenter' className='cardTitle py-2 text-blue'>{pokeName}</Card.Title>
                            <Badges
                                _id={pokeName._id}
                                pokeType={pokeType}
                            ></Badges>
                            <Form id="pokeText" className="px-1 pt-3">Shiny:
                                <Form.Check
                                    inline
                                    type="switch"
                                    id="custom-switch"
                                    label=""
                                    onClick={handleShiny}
                                />
                            </Form>
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