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
        pokeUser
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
      pokeUser
      shiny
    }
  }
`;

export const QUERY_POKEMONS_DATA = gql`
  query getPokemonDatas {
    pokemondatas {
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
      pokeUser
      shiny
    }
  }
`;

export const QUERY_SINGLE_POKEMON_DATA = gql`
  query getSinglePokemonData($pokemondataId: ID!) {
    pokemondata(pokemondataId: $pokemondataId) {
      _id
      number
      pokeName
      pokeType
      image
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
        pokeUser
        shiny
      }
    }
  }
`;
