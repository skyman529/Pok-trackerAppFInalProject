const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    id: ID!
    name: String!
    email: String!
    currentpoke: [Poke]
  }
  type Poke {
    id: ID!
    Name: String!
    type: String!
    base: String!
    shiny: Boolean!
  }
  type Auth {
    token: ID
    user: User
  }
  type Query {
    me: User
    poke: [Poke]
    singlePoke(pokeId: ID!): Poke
  }
  input PokeInput {
    Name: String!
    type: String!
    base: String!
    shiny: Boolean!
  }
  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addPoke(poke: PokeInput): Poke
    updatePoke(pokeId: ID!, pokeData: PokeInput): Poke
    removePoke(pokeId: ID): User
  }
`;
module.exports = typeDefs;
