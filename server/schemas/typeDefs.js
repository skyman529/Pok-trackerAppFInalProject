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
    name: String
    type: [String]
    image: String
    shiny: Boolean
    addedAt: String
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
    addPokemon(shiny: Boolean!): Pokemon
    addComment(pokemonId: ID!, commentText: String!): Pokemon
    removePokemon(pokemonId: ID!): Pokemon
    removeComment(pokemonId: ID!, commentId: ID!): Pokemon
  }
`;

module.exports = typeDefs;
