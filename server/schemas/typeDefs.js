const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Shiny {
    _id: ID
    name: String
  }

  type Poke {
    _id: ID
    name: String
    description: String
    image: String
    quantity: Int
    price: Float
    shiny: Shiny
  }

  type Order {
    _id: ID
    purchaseDate: String
    poke: [Poke]
  }

  type User {
    _id: ID
    firstName: String
    lastName: String
    email: String
    orders: [Order]
  }

  type Checkout {
    session: ID
  }

  type Auth {
    token: ID
    user: User
  }

  type Query {
    shinies: [Shiny]
    pokes(shiny: ID, name: String): [Poke]
    poke(_id: ID!): Poke
    user: User
    order(_id: ID!): Order
    checkout(pokes: [ID]!): Checkout
  }

  type Mutation {
    addUser(firstName: String!, lastName: String!, email: String!, password: String!): Auth
    addOrder(pokes: [ID]!): Order
    updateUser(firstName: String, lastName: String, email: String, password: String): User
    updatePoke(_id: ID!, quantity: Int!): Poke
    login(email: String!, password: String!): Auth
  }
`;

module.exports = typeDefs;
