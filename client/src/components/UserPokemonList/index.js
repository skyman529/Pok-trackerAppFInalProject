//This component is to render the Poke Cards List added to the profile (data labels may change!) -Faith

import React from 'react';

import Badges from '../Badges/index';
import Auth from '../../utils/auth';

import { Card, Col, Row } from 'react-bootstrap';


const UserPokemonList = ({
  pokemons,
  title,
  showTitle = true,
  // showUsername = true, 
}) => {

  if (!pokemons.length) {
    return <h3>No Thoughts Yet</h3>;
  }


  return (
    <div>
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
    </div>
  );
};

export default UserPokemonList;
