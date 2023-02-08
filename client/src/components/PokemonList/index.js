//This component is to render the Poke Cards List to add (data labels may change!) -Faith

import React from 'react';
import { Link } from 'react-router-dom';

import PokemonCard from '../PokemonCard/index';
import Auth from '../../utils/auth';

// import image from '../../images/pokemon_sprites/6.png';

import { Col, Row } from 'react-bootstrap';


const PokemonList = ({ pokemons }) => {
  // if (pokemons) {
  //   console.log(pokemons);
  // }

  return (
    <div>
      {Auth.loggedIn() ? (
        <>
          <Row className="g-4 justify-content-md-center">
            {pokemons &&
              pokemons.map((pokemon) => (
                <div key={pokemon._id}>
                  <Col>
                    <PokemonCard
                      key={pokemon._id}
                      number={pokemon.number}
                      pokeName={pokemon.pokeName}
                      pokeType={pokemon.pokeType}
                      image={pokemon.image}
                      _id={pokemon._id}
                    />
                  </Col>
                </div>
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


