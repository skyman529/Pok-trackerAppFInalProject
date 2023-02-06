//This component is to render the Poke Cards to add (data labels may change!) -Faith

import React, { useState } from 'react';

import Badges from '../Badges/index';

import {Button, Card, Col, Row, Form} from 'react-bootstrap';

function PokemonCard ({pokemons}) {

  return (
    <div>
        <>
          <Row xs={1} md={3} className="g-4 justify-content-md-center">
            {Array.from({ length: 4 }).map((_, idx) => (
              <Col md="3">
                <Card style={{ width: '18rem' }}>
                  {/* <Card.Img variant="top" src={} alt="example" /> */}
                  <Card.Body>
                    <Card.Text  id='pokeCard'>{pokemon.id}</Card.Text>
                    <Card.Title  id='pokeCard'>{pokemon.name}</Card.Title>
                    <Badges />
                    <Form>
                <Form.Check
                  type="switch"
                  id="custom-switch"
                  label="Shiny"
                />
              </Form>
                    <br></br>
                    <Button variant="primary"  id='pokeCard'>Add Pokemon</Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </>
    </div>
  );
};

export default PokemonCard;