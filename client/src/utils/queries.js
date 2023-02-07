import { gql } from '@apollo/client';

//Will query all pokes of the other User profiles that they've saved (data labels may change!) -Faith 
export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      email
      pokemon {
        _id
        name
        type
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
      name
      type
      image
    }
  }
`;

//Will query one poke to choose from (data labels may change and we could add more data to this!!) -Faith 
export const QUERY_SINGLE_POKEMON = gql`
  query getSinglePoke($pokemonId: ID!) {
    pokemon(pokemonId: $pokemonId) {
      _id
      name
      type
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
      pokemon {
        _id
        name
        type
        image
        shiny
      }
    }
  }
`;
