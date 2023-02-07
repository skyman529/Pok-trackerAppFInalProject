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
  mutation addPoke($shiny: Boolean!) {
    addPokemon(shiny: $shiny) {
          _id
          number
          name
          pokeType
          imgage
          shiny
          addedAt
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
      name
      addedAt
      comments {
        _id
        commentText
        createdAt
      }
    }
  }
`;
