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
    pokeType: [String]
    image: String
    pokeUser: String
    shiny: Boolean
    comments: [Comment]!
  }

  type PokemonData {
    _id: ID
    number: Int
    pokeName: String
    pokeType: [String]
    image: String
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
    pokemondatas: [PokemonData]
    pokemondata(pokemondataId: ID!): PokemonData
    me: User
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addPokemon(number: Int!, pokeName: String!, pokeType: [String]!, image: String!,  shiny: Boolean!): Pokemon
    addComment(pokemonId: ID!, commentText: String!): Pokemon
    removePokemon(pokemonId: ID!): Pokemon
    removeComment(pokemonId: ID!, commentId: ID!): Pokemon
  }
`;

module.exports = typeDefs;
