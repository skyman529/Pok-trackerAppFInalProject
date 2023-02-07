import React from 'react';
import { Link } from 'react-router-dom';


import Badges from '../Badges/index';
import AddButton from '../AddButton/index';
import Auth from '../../utils/auth';

import {Card, Col, Row} from 'react-bootstrap';


const PokemonCard = ({
  number,
  name,
  pokeType,
  image,
}) => {

  return (
    <div>
      {Auth.loggedIn() ? (
        <>
              <Row xs={1} md={3} className="g-4 justify-content-md-center">
                <Col md="3">
                  <Card style={{ width: '18rem' }}>
                    {/* <Card.Img variant="top" src={image} alt="example" /> */}
                    <Card.Body>
                      <Card.Text  id='pokeCard'>{number}</Card.Text>
                      <Card.Title id='pokeCard'>{name}</Card.Title>
                      <Badges
                        pokeType={pokeType}
                      ></Badges>
                      <br></br>                      
                      <AddButton
                        number={number}
                        name={name}
                        pokeType={pokeType}
                        image={image}>
                      </AddButton>
                    </Card.Body>
                  </Card>
                </Col>
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

export default PokemonCard;
