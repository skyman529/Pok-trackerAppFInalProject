//This component is to render the Poke Cards to add (data labels may change!) -Faith

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
//import from Badge component -Faith
import Badges from '../Badges/index';

//import from Bootstrap -Faith
import {Button, Card, Col, Row, Form} from 'react-bootstrap';

//import from css -Faith
// import './style.css';

import { ADD_POKEMON } from '../../utils/mutations';
import { QUERY_ME, QUERY_POKEMONS } from '../../utils/queries';

import Auth from '../../utils/auth';

const PokemonCard = () => {
  // const [thoughtText, setThoughtText] = useState('');

  // const [setCharacterCount] = useState(0);

  const [addPokemon] = useMutation(ADD_POKEMON, {
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

      // update me object's cache
      const { me } = cache.readQuery({ query: QUERY_ME });
      cache.writeQuery({
        query: QUERY_ME,
        data: { me: { ...me, pokemons: [...me.pokemons, addPokemon] } },
      });
    },
  });

 

  // const handleFormSubmit = async (event) => {
  //   event.preventDefault();

  //   try {
  //     const { data } = await addPokemon({
  //       variables: {
  //         thoughtText,
  //         thoughtAuthor: Auth.getProfile().data.username,
  //       },
  //     });

  //     setThoughtText('');
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };

  // const handleChange = (event) => {
  //   const { name, value } = event.target;

  //   if (name === 'thoughtText' && value.length <= 280) {
  //     setThoughtText(value);
  //     setCharacterCount(value.length);
  //   }
  // };

  return (
    <div>
      {/* {Auth.loggedIn() ? ( */}
        <>
          <Row xs={1} md={3} className="g-4 justify-content-md-center">
            {Array.from({ length: 4 }).map((_, idx) => (
              <Col md="3">
                <Card style={{ width: '18rem' }}>
                  {/* <Card.Img variant="top" src={} alt="example" /> */}
                  <Card.Body>
                    <Card.Text  id='pokeCard'>id</Card.Text>
                    <Card.Title  id='pokeCard'>name</Card.Title>
                    <Badges />
                    <Form>
                <Form.Check
                  type="switch"
                  id="custom-switch"
                  label="Shiny"
                />
              </Form>
                    <br></br>
                    <Button variant="primary"  id='pokeCard'>Add Pokemon</Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </>
      ) : (
        <p>
          You need to be logged in to add a Pokemon. Please{' '}
          <Link to="/login">login</Link> or <Link to="/signup">signup.</Link>
        </p>
      {/* )} */}
    </div>
  );
};

export default PokemonCard;