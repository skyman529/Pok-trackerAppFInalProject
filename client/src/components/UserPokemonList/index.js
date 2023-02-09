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
            <Col key={pokemon._id}>
              <Card style={{ width: '18rem' }} id="border-red">
                {pokemon.shiny === true ? (
                  <Card.Text id='shiny' className="pt-3 bg-golden">S H I N Y</Card.Text>
                ) : (
                  <Card.Text id='shiny' className="pt-3 bg-red">P O K É M O N</Card.Text>
                )}
                <Card.Text id='pokeCard' className="px-2">{pokemon.number}</Card.Text>
                {pokemon.shiny === true ? (
                  <Card.Img variant="top" src={`images/pokemon_sprites/shiny/${pokemon.number}.png`} />
                ) : (
                  <Card.Img variant="top" src={`images/pokemon_sprites/${pokemon.number}.png`} />
                )}
                <Card.Body>
                  <Card.Title id='pokeCenter' className='cardTitle text-blue py-2'>{pokemon.pokeName}</Card.Title>
                  <Badges
                    _id={pokemon._id}
                    pokeType={pokemon.pokeType}
                  ></Badges>
                </Card.Body>
              </Card>
            </Col>
          ))}
      </Row>
    </div>
  );
};

export default UserPokemonList;
