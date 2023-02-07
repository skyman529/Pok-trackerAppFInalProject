//This component is to render the Poke Cards List added to the profile (data labels may change!) -Faith

import React from 'react';

import Badges from '../Badges/index';

import { Card, Col, Row } from 'react-bootstrap';


const UserPokemonList = ({
  pokemons,
  title,
  showTitle = true,
  // showUsername = true, 
}) => {

  if (!pokemons.length) {
    return <h3>No Pokemons Yet</h3>;
  }


  return (
    <div>
      {showTitle && <h3>{title}</h3>}
      <Row className="g-4 justify-content-md-center">
        {pokemons &&
          pokemons.map((pokemon) => (
            <Col>
              <Card style={{ width: '18rem' }}>

                {pokemon.shiny === true ? (
                  <Card.Img variant="top" src={`images/pokemon_sprites/shiny/${pokemon.number}.png`} />
                ) : (
                  <Card.Img variant="top" src={`images/pokemon_sprites/${pokemon.number}.png`} />
                )}
                <Card.Body>
                  <Card.Text id='pokeCard'>{pokemon.number}</Card.Text>
                  <Card.Title id='pokeCard'>{pokemon.name}</Card.Title>
                  <Badges
                    types={pokemon.pokeType}
                  ></Badges>
                  {pokemon.shiny === true ? (
                    <Card.Text id='pokeCard'>SHINY</Card.Text>
                  ) : (
                    <br></br>
                  )}
                </Card.Body>
              </Card>
            </Col>
          ))}
      </Row>
    </div>
  );
};

export default UserPokemonList;
