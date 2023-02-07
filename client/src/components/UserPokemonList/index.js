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
<<<<<<< HEAD
    return <h3>No Pokemon Yet</h3>;
=======
    return <h3>No Pokemons Yet</h3>;
>>>>>>> 0d2cd30cf5f3d8b604761659b1d670d608ffcb2a
  }


  return (
    <div>
<<<<<<< HEAD
          {showTitle && <h3>{title}</h3>}
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
                      {pokemon.shiny ? (
                        <Card.Text id='pokeCard'>SHINY</Card.Text>
                      ) : (
                        <br></br>
                      )}
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            ))}
=======
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
>>>>>>> 0d2cd30cf5f3d8b604761659b1d670d608ffcb2a
    </div>
  );
};

export default UserPokemonList;
