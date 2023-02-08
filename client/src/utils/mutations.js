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

export const ADD_POKEMON = gql`
  mutation addPokemon($number: Int!, $pokeName: String!, $pokeType: [String]!, $image: String!, $shiny: Boolean!) {
    addPokemon(number: $number, pokeName: $pokeName, pokeType: $pokeType, image: $image, shiny: $shiny) {
      _id
      number
      pokeName
      pokeType
      image
      pokeUser
      shiny
    }
  }
`;

export const ADD_COMMENT = gql`
  mutation addComment($pokemonId: ID!, $commentText: String!) {
    addComment(pokemonId: $pokemonId, commentText: $commentText) {
      _id
      number
      pokeName
      pokeType
      image
      pokeUser
      shiny
    }
  }
`;
