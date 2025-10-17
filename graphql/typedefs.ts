export const typeDefs = `#graphql
  type Student {
    id: ID!
    password: String!
    email: String!
  }

  type Query {
    students: [Student!]!
  }

  type Mutation {
    createStudent(password: String!, email: String!): Student!
  }
`;
