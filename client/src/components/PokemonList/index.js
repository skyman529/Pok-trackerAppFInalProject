//This component is to render the Poke Cards List to add (data labels may change!) -Faith

import React from 'react';
import { Link } from 'react-router-dom';

import Badges from '../Badges/index';
import AddButton from '../AddButton/index';
import Auth from '../../utils/auth';

// import image from '../../images/pokemon_sprites/6.png';

import { Card, Col, Row } from 'react-bootstrap';


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
                <Col>
                  <Card style={{ width: '18rem' }}>
                    <Card.Img variant="top" src={`images/pokemon_sprites/${pokemon.number}.png`} />
                    <Card.Body>
                      <Card.Text id='pokeCard'>{pokemon.number}</Card.Text>
                      <Link to={`/thoughts/${pokemon._id}`}>
                        <Card.Title id='pokeCard'>{pokemon.name}</Card.Title>
                      </Link>
                      <Badges
                        pokeType={pokemon.pokeType}
                      ></Badges>
                      <br></br>
                      <AddButton
                        number={pokemon.number}
                        name={pokemon.name}
                        pokeType={pokemon.pokeType}
                        image={pokemon.image}>
                      </AddButton>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
          </Row>
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
