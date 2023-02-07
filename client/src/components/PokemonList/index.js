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

  const pokemonArray = [
    {
      name: "Bulbasaur",
      type: ["Grass", "Poison"],
      image: "Bulbasaur.jpg",
      shiny: true,
    },
    {
      name: "Ivysaur",
      type: ["Grass", "Poison"],
      image: "Ivysaur.jpg",
      shiny: true,
    },
    {
      name: "Venusaur",
      type: ["Grass", "Poison"],
      image: "Venusaur.jpg",
      shiny: true,
    },
    { name: "Charmander", type: ["Fire"], image: "Charmander.jpg", shiny: true },
    { name: "Charmeleon", type: ["Fire"], image: "Charmeleon.jpg", shiny: true },
    {
      name: "Charizard",
      type: ["Fire", "Flying"],
      image: "Charizard.jpg",
      shiny: true,
    },
    { name: "Squirtle", type: ["Water"], image: "Squirtle.jpg", shiny: true },
    { name: "Wartortle", type: ["Water"], image: "Wartortle.jpg", shiny: true },
    { name: "Blastoise", type: ["Water"], image: "Blastoise.jpg", shiny: true },
    { name: "Caterpie", type: ["Bug"], image: "Caterpie.jpg", shiny: true },
    { name: "Metapod", type: ["Bug"], image: "Metapod.jpg", shiny: true },
    {
      name: "Butterfree",
      type: ["Bug", "Flying"],
      image: "Butterfree.jpg",
      shiny: true,
    },
    { name: "Weedle", type: ["Bug", "Poison"], image: "Weedle.jpg", shiny: true },
    { name: "Kakuna", type: ["Bug", "Poison"], image: "Kakuna.jpg", shiny: true },
    {
      name: "Beedrill",
      type: ["Bug", "Poison"],
      image: "Beedrill.jpg",
      shiny: true,
    },
    {
      name: "Pidgey",
      type: ["Normal", "Flying"],
      image: "Pidgey.jpg",
      shiny: true,
    },
    {
      name: "Pidgeotto",
      type: ["Normal", "Flying"],
      image: "Pidgeotto.jpg",
      shiny: true,
    },
    {
      name: "Pidgeot",
      type: ["Normal", "Flying"],
      image: "Pidgeot.jpg",
      shiny: true,
    },
    { name: "Rattata", type: ["Normal"], image: "Rattata.jpg", shiny: true },
    { name: "Raticate", type: ["Normal"], image: "Raticate.jpg", shiny: true },
    {
      name: "Spearow",
      type: ["Normal", "Flying"],
      image: "Spearow.jpg",
      shiny: true,
    },
    {
      name: "Fearow",
      type: ["Normal", "Flying"],
      image: "Fearow.jpg",
      shiny: true,
    },
    { name: "Ekans", type: ["Poison"], image: "Ekans.jpg", shiny: true },
    { name: "Arbok", type: ["Poison"], image: "Arbok.jpg", shiny: true },
    { name: "Pikachu", type: ["Electric"], image: "Pikachu.jpg", shiny: true },
    { name: "Raichu", type: ["Electric"], image: "Raichu.jpg", shiny: true },
    { name: "Sandshrew", type: ["Ground"], image: "Sandshrew.jpg", shiny: true },
    { name: "Sandslash", type: ["Ground"], image: "Sandslash.jpg", shiny: true },
    { name: "Nidoran♀", type: ["Poison"], image: "Nidoran♀.jpg", shiny: true },
    { name: "Nidorina", type: ["Poison"], image: "Nidorina.jpg", shiny: true },
    {
      name: "Nidoqueen",
      type: ["Poison", "Ground"],
      image: "Nidoqueen.jpg",
      shiny: true,
    },
    { name: "Nidoran♂", type: ["Poison"], image: "Nidoran♂.jpg", shiny: true },
    { name: "Nidorino", type: ["Poison"], image: "Nidorino.jpg", shiny: true },
    {
      name: "Nidoking",
      type: ["Poison", "Ground"],
      image: "Nidoking.jpg",
      shiny: true,
    },
    { name: "Clefairy", type: ["Fairy"], image: "Clefairy.jpg", shiny: true },
    { name: "Clefable", type: ["Fairy"], image: "Clefable.jpg", shiny: true },
    { name: "Vulpix", type: ["Fire"], image: "Vulpix.jpg", shiny: true },
    { name: "Ninetales", type: ["Fire"], image: "Ninetales.jpg", shiny: true },
    {
      name: "Jigglypuff",
      type: ["Normal", "Fairy"],
      image: "Jigglypuff.jpg",
      shiny: true,
    },
    {
      name: "Wigglytuff",
      type: ["Normal", "Fairy"],
      image: "Wigglytuff.jpg",
      shiny: true,
    },
    {
      name: "Zubat",
      type: ["Poison", "Flying"],
      image: "Zubat.jpg",
      shiny: true,
    },
    {
      name: "Golbat",
      type: ["Poison", "Flying"],
      image: "Golbat.jpg",
      shiny: true,
    },
    {
      name: "Oddish",
      type: ["Grass", "Poison"],
      image: "Oddish.jpg",
      shiny: true,
    },
    { name: "Gloom", type: ["Grass", "Poison"], image: "Gloom.jpg", shiny: true },
    {
      name: "Vileplume",
      type: ["Grass", "Poison"],
      image: "Vileplume.jpg",
      shiny: true,
    },
    { name: "Paras", type: ["Bug", "Grass"], image: "Paras.jpg", shiny: true },
    {
      name: "Parasect",
      type: ["Bug", "Grass"],
      image: "Parasect.jpg",
      shiny: true,
    },
    {
      name: "Venonat",
      type: ["Bug", "Poison"],
      image: "Venonat.jpg",
      shiny: true,
    },
    {
      name: "Venomoth",
      type: ["Bug", "Poison"],
      image: "Venomoth.jpg",
      shiny: true,
    },
    { name: "Diglett", type: ["Ground"], image: "Diglett.jpg", shiny: true },
    { name: "Dugtrio", type: ["Ground"], image: "Dugtrio.jpg", shiny: true },
    { name: "Meowth", type: ["Normal"], image: "Meowth.jpg", shiny: true },
    { name: "Persian", type: ["Normal"], image: "Persian.jpg", shiny: true },
    { name: "Psyduck", type: ["Water"], image: "Psyduck.jpg", shiny: true },
    { name: "Golduck", type: ["Water"], image: "Golduck.jpg", shiny: true },
    { name: "Mankey", type: ["Fighting"], image: "Mankey.jpg", shiny: true },
    { name: "Primeape", type: ["Fighting"], image: "Primeape.jpg", shiny: true },
    { name: "Growlithe", type: ["Fire"], image: "Growlithe.jpg", shiny: true },
    { name: "Arcanine", type: ["Fire"], image: "Arcanine.jpg", shiny: true },
    { name: "Poliwag", type: ["Water"], image: "Poliwag.jpg", shiny: true },
    { name: "Poliwhirl", type: ["Water"], image: "Poliwhirl.jpg", shiny: true },
    {
      name: "Poliwrath",
      type: ["Water", "Fighting"],
      image: "Poliwrath.jpg",
      shiny: true,
    },
    { name: "Abra", type: ["Psychic"], image: "Abra.jpg", shiny: true },
    { name: "Kadabra", type: ["Psychic"], image: "Kadabra.jpg", shiny: true },
    { name: "Alakazam", type: ["Psychic"], image: "Alakazam.jpg", shiny: true },
    { name: "Machop", type: ["Fighting"], image: "Machop.jpg", shiny: true },
    { name: "Machoke", type: ["Fighting"], image: "Machoke.jpg", shiny: true },
    { name: "Machamp", type: ["Fighting"], image: "Machamp.jpg", shiny: true },
    {
      name: "Bellsprout",
      type: ["Grass", "Poison"],
      image: "Bellsprout.jpg",
      shiny: true,
    },
    {
      name: "Weepinbell",
      type: ["Grass", "Poison"],
      image: "Weepinbell.jpg",
      shiny: true,
    },
    {
      name: "Victreebel",
      type: ["Grass", "Poison"],
      image: "Victreebel.jpg",
      shiny: true,
    },
    {
      name: "Tentacool",
      type: ["Water", "Poison"],
      image: "Tentacool.jpg",
      shiny: true,
    },
    {
      name: "Tentacruel",
      type: ["Water", "Poison"],
      image: "Tentacruel.jpg",
      shiny: true,
    },
    {
      name: "Geodude",
      type: ["Rock", "Ground"],
      image: "Geodude.jpg",
      shiny: true,
    },
    {
      name: "Graveler",
      type: ["Rock", "Ground"],
      image: "Graveler.jpg",
      shiny: true,
    },
    { name: "Golem", type: ["Rock", "Ground"], image: "Golem.jpg", shiny: true },
    { name: "Ponyta", type: ["Fire"], image: "Ponyta.jpg", shiny: true },
    { name: "Rapidash", type: ["Fire"], image: "Rapidash.jpg", shiny: true },
    {
      name: "Slowpoke",
      type: ["Water", "Psychic"],
      image: "Slowpoke.jpg",
      shiny: true,
    },
    {
      name: "Slowbro",
      type: ["Water", "Psychic"],
      image: "Slowbro.jpg",
      shiny: true,
    },
    {
      name: "Magnemite",
      type: ["Electric", "Steel"],
      image: "Magnemite.jpg",
      shiny: true,
    },
    {
      name: "Magneton",
      type: ["Electric", "Steel"],
      image: "Magneton.jpg",
      shiny: true,
    },
    {
      name: "Farfetch'd",
      type: ["Normal", "Flying"],
      image: "Farfetch'd.jpg",
      shiny: true,
    },
    {
      name: "Doduo",
      type: ["Normal", "Flying"],
      image: "Doduo.jpg",
      shiny: true,
    },
    {
      name: "Dodrio",
      type: ["Normal", "Flying"],
      image: "Dodrio.jpg",
      shiny: true,
    },
    { name: "Seel", type: ["Water"], image: "Seel.jpg", shiny: true },
    {
      name: "Dewgong",
      type: ["Water", "Ice"],
      image: "Dewgong.jpg",
      shiny: true,
    },
    { name: "Grimer", type: ["Poison"], image: "Grimer.jpg", shiny: true },
    { name: "Muk", type: ["Poison"], image: "Muk.jpg", shiny: true },
    { name: "Shellder", type: ["Water"], image: "Shellder.jpg", shiny: true },
    {
      name: "Cloyster",
      type: ["Water", "Ice"],
      image: "Cloyster.jpg",
      shiny: true,
    },
    {
      name: "Gastly",
      type: ["Ghost", "Poison"],
      image: "Gastly.jpg",
      shiny: true,
    },
    {
      name: "Haunter",
      type: ["Ghost", "Poison"],
      image: "Haunter.jpg",
      shiny: true,
    },
    {
      name: "Gengar",
      type: ["Ghost", "Poison"],
      image: "Gengar.jpg",
      shiny: true,
    },
    { name: "Onix", type: ["Rock", "Ground"], image: "Onix.jpg", shiny: true },
    { name: "Drowzee", type: ["Psychic"], image: "Drowzee.jpg", shiny: true },
    { name: "Hypno", type: ["Psychic"], image: "Hypno.jpg", shiny: true },
    { name: "Krabby", type: ["Water"], image: "Krabby.jpg", shiny: true },
    { name: "Kingler", type: ["Water"], image: "Kingler.jpg", shiny: true },
    { name: "Voltorb", type: ["Electric"], image: "Voltorb.jpg", shiny: true },
    {
      name: "Electrode",
      type: ["Electric"],
      image: "Electrode.jpg",
      shiny: true,
    },
    {
      name: "Exeggcute",
      type: ["Grass", "Psychic"],
      image: "Exeggcute.jpg",
      shiny: true,
    },
    {
      name: "Exeggutor",
      type: ["Grass", "Psychic"],
      image: "Exeggutor.jpg",
      shiny: true,
    },
    { name: "Cubone", type: ["Ground"], image: "Cubone.jpg", shiny: true },
    { name: "Marowak", type: ["Ground"], image: "Marowak.jpg", shiny: true },
    {
      name: "Hitmonlee",
      type: ["Fighting"],
      image: "Hitmonlee.jpg",
      shiny: true,
    },
    {
      name: "Hitmonchan",
      type: ["Fighting"],
      image: "Hitmonchan.jpg",
      shiny: true,
    },
    { name: "Lickitung", type: ["Normal"], image: "Lickitung.jpg", shiny: true },
    { name: "Koffing", type: ["Poison"], image: "Koffing.jpg", shiny: true },
    { name: "Weezing", type: ["Poison"], image: "Weezing.jpg", shiny: true },
  ];

  return (
    <div>
      {Auth.loggedIn() ? (
        <>
          {pokemons &&
            pokemonArray.map((pokemon) => (
              <Row xs={1} md={3} className="g-4 justify-content-md-center">
                <Col md="3">
                  <Card style={{ width: '18rem' }}>
                    {/* <Card.Img variant="top" src={pokemon.image} alt="example" /> */}
                    <Card.Body>
                      {/* <Card.Text  id='pokeCard'>{pokemon.id}</Card.Text> */}
                      <Link to={`/thoughts/${pokemon.number}`}>
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
