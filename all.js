//typeDefs

const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    password: String
    pokemons: [Pokemon]!
  }

  type Pokemon {
    _id: ID
    number: Int
    pokeName: String
    pokeType: String
    image: String
    shiny: Boolean
    comments: [Comment]!
  }

  type Comment {
    _id: ID
    commentText: String
    commentAuthor: String
    createdAt: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    users: [User]
    user(username: String!): User
    pokemons(username: String): [Pokemon]
    pokemon(pokemonId: ID!): Pokemon
    me: User
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addPokemon(number: Int!, pokeName: String!, pokeType: [String]!, image: String!, shiny: Boolean!): Pokemon
    addComment(pokemonId: ID!, commentText: String!): Pokemon
    removePokemon(pokemonId: ID!): Pokemon
    removeComment(pokemonId: ID!, commentId: ID!): Pokemon
  }
`;

module.exports = typeDefs;

//resolvers

const { AuthenticationError } = require('apollo-server-express');
const { User, Pokemon } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    users: async () => {
      return User.find().populate('pokemons');
    },
    user: async (parent, { username }) => {
      return User.findOne({ username }).populate('pokemons');
    },
    pokemons: async (parent, { username }) => {
      const params = username ? { username } : {};
      return Pokemon.find(params);
    },
    pokemon: async (parent, { pokemonId }) => {
      return Pokemon.findOne({ _id: pokemonId });
    },
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id }).populate('pokemons');
      }
      throw new AuthenticationError('You need to be logged in!');
    },
  },

  Mutation: {
    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('No user found with this email address');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const token = signToken(user);

      return { token, user };
    },
    addPokemon: async (parent, { type }, context) => {
      if (context.user) {
        const pokemon = await Pokemon.create({
          number,
          pokeName,
          pokeType,
          image,
          shiny
        });

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { pokemons: pokemon._id } }
        );

        return pokemon;
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    addComment: async (parent, { pokemonId, commentText }, context) => {
      if (context.user) {
        return Pokemon.findOneAndUpdate(
          { _id: pokemonId },
          {
            $addToSet: {
              comments: { commentText, commentAuthor: context.user.username },
            },
          },
          {
            new: true,
            runValidators: true,
          }
        );
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    removePokemon: async (parent, { pokemonId }, context) => {
      if (context.user) {
        const pokemon = await Pokemon.findOneAndDelete({
          _id: pokemonId,
          name: context.user.username,
        });

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { pokemons: pokemon._id } }
        );

        return pokemon;
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    removeComment: async (parent, { pokemonId, commentId }, context) => {
      if (context.user) {
        return Pokemon.findOneAndUpdate(
          { _id: pokemonId },
          {
            $pull: {
              comments: {
                _id: commentId,
                commentAuthor: context.user.username,
              },
            },
          },
          { new: true }
        );
      }
      throw new AuthenticationError('You need to be logged in!');
    },
  },
};

module.exports = resolvers;


//mutations

import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

//This will add Poke Card to Profile (data labels may change!) -Faith 
export const ADD_POKEMON = gql`
  mutation addPokemon($number: Int!, $pokeName: String!, $pokeType: [String]!, $image: String!, $shiny: Boolean!) {
    addPokemon(number: $number, pokeName: $pokeName, pokeType: $pokeType, image: $image, shiny: $shiny) {
          _id
          number
          pokeName
          pokeType
          image
          shiny
          comments {
            _id
            commentText
          }
        }
      }
`;

export const ADD_COMMENT = gql`
  mutation addComment($pokemonId: ID!, $commentText: String!) {
    addComment(pokemonId: $pokemonId, commentText: $commentText) {
      _id
      type
      pokeName
      comments {
        _id
        commentText
        createdAt
      }
    }
  }
`;

//queries

import { gql } from '@apollo/client';

//Will query all pokes of the other User profiles that they've saved (data labels may change!) -Faith 
export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      email
      pokemons {
        _id
        number
        pokeName
        pokeType
        image
        shiny
      }
    }
  }
`;

//Will query all pokes to choose from (data labels may change!) -Faith 
export const QUERY_POKEMONS = gql`
  query getPokemons {
    pokemons {
      _id
      number
      pokeName
      pokeType
      image
    }
  }
`;

//Will query one poke to choose from (data labels may change and we could add more data to this!!) -Faith 
export const QUERY_SINGLE_POKEMON = gql`
  query getSinglePokemon($pokemonId: ID!) {
    pokemon(pokemonId: $pokemonId) {
      _id
      number
      pokeName
      pokeType
      image
      comments {
        _id
        commentText
        commentAuthor
        createdAt
      }
    }
  }
`;

//Will query all pokes of the current User profile that they've saved (data labels may change!) -Faith 
export const QUERY_ME = gql`
  query me {
    me {
      _id
      username
      email
      pokemons {
        _id
        number
        pokeName
        pokeType
        image
        shiny
      }
    }
  }
`;


//pokemonCard

import { React, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import Badges from '../Badges/index';
import Auth from '../../utils/auth';

import { useMutation } from '@apollo/client';
import { ADD_POKEMON } from '../../utils/mutations';
import { QUERY_POKEMONS, QUERY_ME } from '../../utils/queries';

import { Card, Form, Button } from 'react-bootstrap';

const PokemonCard = ({
    _id,
    number,
    pokeName,
    pokeType,
    image,
}) => {
    const [shiny, setShiny] = useState(false);

    console.log(number);

    const [addPokemon, { error }] = useMutation(ADD_POKEMON, {
        update(cache, { data: { addPokemon } }) {
            try {
                const { pokemons } = cache.readQuery({ query: QUERY_POKEMONS })

                cache.writeQuery({
                    query: QUERY_POKEMONS,
                    data: { pokemons: [addPokemon, ...pokemons] },
                });
            } catch (e) {
                console.error(e);
            }
            const { me } = cache.readQuery({ query: QUERY_ME });
            cache.writeQuery({
                query: QUERY_ME,
                data: { me: { ...me, pokemons: [...me.pokemons, addPokemon] } },
            });
        },
    });

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        try {
            const { data } = await addPokemon({
                variables: {
                    number: number,
                    pokeName: pokeName,
                    pokeType: pokeType,
                    image: image,
                    shiny: shiny
                },
            });

            setShiny(false);
        } catch (err) {
            console.error(err);
        }
    };

    const handleShiny = () => {
        setShiny(!shiny);
    };

    useEffect(() => {
        console.log(shiny);
      });

    return (
        <div>
            {Auth.loggedIn() ? (
                <>
                    <Card style={{ width: '18rem' }}>
                        <Card.Img variant="top" src={`images/pokemon_sprites/${number}.png`} />
                        <Card.Body>
                            <Card.Text id='pokeCard'>{number}</Card.Text>
                            <Link to={`/thoughts/${_id}`}>
                                <Card.Title id='pokeCard'>{pokeName}</Card.Title>
                            </Link>
                            <Badges
                                pokeType={pokeType}
                            ></Badges>
                            <br></br>
                            <Form>
                                <Form.Check
                                    type="switch"
                                    id="custom-switch"
                                    onClick={handleShiny}
                                />
                            </Form>
                            <Button variant="primary" id='pokeCard'  onClick={handleFormSubmit} >Add Pokemon</Button>
                        </Card.Body>
                    </Card>
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