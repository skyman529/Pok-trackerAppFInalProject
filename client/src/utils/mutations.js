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
export const ADD_POKE = gql`
  mutation addPoke($userId: ID!, $shiny: Boolean!) {
    addPoke(userId: $userId, shiny: $shiny) {
      user {
        _id
        username
        pokes {
          _id
          type
          imgage
          shiny
        }
      }
    }
  }
`;

export const ADD_COMMENT = gql`
  mutation addComment($pokemonId: ID!, $commentText: String!) {
    addComment(pokemonId: $pokemonId, commentText: $commentText) {
      _id
      thoughtText
      thoughtAuthor
      createdAt
      comments {
        _id
        commentText
        createdAt
      }
    }
  }
`;
