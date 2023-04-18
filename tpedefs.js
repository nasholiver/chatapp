import { gql } from 'apollo-server-express';
// Type definitions
const typeDefs = gql`
  type User {
    id: ID!
    firstName: String!
    lastName: String!
    email: String!
    password: String!

  }

  type Query {
    users: [User!]!
    messageByUser(receivedId:Int): [Message!]!
  }

  input CreateUserInput {
    firstName: String!
    lastName: String!
    email: String!
    password: String!
  }
  input UserSigninInput {
    email: String!
    password: String!
    }

  type Token {
    token: String!
    }
  scalar Date
  type Message {
        id: ID!
        text: String!
        receivedId: Int!
        senderId: Int!
        createdAt: Date!

    }
  type Mutation {
    SignupUser(Usernew: CreateUserInput!): User!
    SigninUser(Usersignin: UserSigninInput!): Token!
    CreateMessage(text: String!, receivedId: Int!): Message!
  }
`;

export default typeDefs;