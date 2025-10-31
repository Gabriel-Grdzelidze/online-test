export const typeDefs = `#graphql
  type Student {
    id: ID!
    password: String!
    email: String!
  }

  type Question {
    id: ID!
    question: String!
    options: [String!]!
    correct: String!
  }

  type Query {
    students: [Student!]!
    question: [Question!]!
  }

  type Mutation {
    createStudent(password: String!, email: String!): Student!
    createQuestion(question: String!, options: [String!]!, correct: String!): Question!
  }
`;
