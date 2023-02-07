//This component is to render the Poke Cards List to add (data labels may change!) -Faith

import React from 'react';
import { Link } from 'react-router-dom';

import Badges from '../Badges/index';
import AddButton from '../AddButton/index';
import Auth from '../../utils/auth';

import { Card, Col, Row } from 'react-bootstrap';


const PokemonList = ({ pokemons }) => {
  if (pokemons) {
    console.log(pokemons);
  }

  return (
    <div>
      {Auth.loggedIn() ? (
        <>
          {pokemons &&
            pokemons.map((pokemon) => (
              <Row xs={1} md={3} className="g-4 justify-content-md-center">
                <Col md="3">
                  <Card style={{ width: '18rem' }}>
                    {/* <Card.Img variant="top" src={pokemon.image} alt="example" /> */}
                    <Card.Body>
                      {/* <Card.Text  id='pokeCard'>{pokemon.id}</Card.Text> */}
                      <Link to={`/thoughts/${pokemon._id}`}>
                        <Card.Title id='pokeCard'>{pokemon.name}</Card.Title>
                      </Link>
                      <Badges
                        types={pokemon.type}
                      ></Badges>
                      <br></br>
                      <AddButton
                        id={pokemon.id}
                        name={pokemon.name}
                        type={pokemon.type}
                        image={pokemon.image}>
                      </AddButton>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            ))}
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

export default PokemonList;
