//This component is to render the Poke Cards List to add (data labels may change!) -Faith

import React from 'react';
import { Link } from 'react-router-dom';

import PokemonCard from '../PokemonCard/index';
import Auth from '../../utils/auth';

// import image from '../../images/pokemon_sprites/6.png';

import { Col, Row, Card, Form, Button } from 'react-bootstrap';


const PokemonList = ({ pokemons }) => {
  if (pokemons) {
    console.log(pokemons);
  }

  return (
    <div>
      {Auth.loggedIn() ? (
        <>
          <Row className="g-4 justify-content-md-center">
            {pokemons &&
              pokemons.map((pokemon) => (
                <Col key={pokemon._id}>
                  <PokemonCard
                    key={pokemon._id}
                    number={pokemon.number}
                    pokeName={pokemon.pokeName}
                    pokeType={pokemon.pokeType}
                    image={pokemon.image}
                    _id={pokemon._id}
                  />
                </Col>
              ))}
          </Row>
        </>
      ) : (
        <>
          <Row className="justify-content-md-center" >
          <Col>
            <Card id="border-golden">
              <Card.Body>
                <Card.Title id='pokeCenter' className='cardTitle py-2 text-red'>You need login to add Pokemon. Please{' '}
                  <Link to="/login">login</Link> or <Link to="/signup">signup.</Link>
                </Card.Title>
              </Card.Body>
            </Card>
          </Col>
          </Row>
        </>
  )
}
    </div >
  );
};

export default PokemonList;


