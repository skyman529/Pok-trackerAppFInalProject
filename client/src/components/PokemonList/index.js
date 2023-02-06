//This component is to render the Poke Cards List to add (data labels may change!) -Faith

import React from 'react';

import { useMutation } from '@apollo/client';

import Badges from '../Badges/index';
import AddButton from '../AddButton/index';
import Auth from '../../utils/auth';

import {Card, Col, Row, Form } from 'react-bootstrap';


const PokemonList = ({ pokemons }) => {
  if (pokemons) {
    console.log(pokemons);
  }

  const [addPokemon, {error}] = useMutation(ADD_POKEMON, {
    update(cache, {data: { addPokemon } }) {
      try {
        const { }
      }
    }
  })

  return (
    <div>
      {Auth.loggedIn() ? (
        <>
          {pokemons &&
            pokemons.map((pokemon) => (
              <Row xs={1} md={3} className="g-4 justify-content-md-center">
                <Col md="3">
                  <Card style={{ width: '18rem' }}>
                    {/* <Card.Img variant="top" src={} alt="example" /> */}
                    <Card.Body>
                      {/* <Card.Text  id='pokeCard'>{pokemon.id}</Card.Text> */}
                      <Card.Title id='pokeCard'>{pokemon.name}</Card.Title>
                      <Badges
                        types={pokemon.type}
                      ></Badges>
                      <Form>
                        <Form.Check
                          type="switch"
                          id="custom-switch"
                        />
                      </Form>
                      <br></br>                      
                      <AddButton 
                        data={pokemon.id}>
                      </AddButton>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            ))}
        </>
      ) : (
        <p>
          You need to be logged in to share your thoughts. Please{' '}
          <Link to="/login">login</Link> or <Link to="/signup">signup.</Link>
        </p>
      )}
    </div>
  );
};

export default PokemonList;
