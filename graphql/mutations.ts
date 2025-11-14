import gql from "graphql-tag";

export const CREATE_STUDENT = gql`
  mutation CreateStudent(
    $email: String!
    $password: String!
    $idNumber: String!
    $score: Int
  ) {
    createStudent(
      email: $email
      password: $password
      idNumber: $idNumber
      score: $score
    ) {
      id
      email
      password
      idNumber
      score
    }
  }
`;

export const CREATE_QUESTION = gql`
  mutation CreateQuestion(
    $question: String!
    $options: [String!]!
    $correct: String!
  ) {
    createQuestion(question: $question, options: $options, correct: $correct) {
      id
      question
      options
      correct
    }
  }
`;

export const SET_SCORE = gql`
  mutation SetScore($email: String!, $score: Int!) {
    setScore(email: $email, score: $score) {
      id
      email
      score
    }
  }
`;

export const CHANGE_QUESTION = gql`
  mutation ChangeQuestion(
    $id: ID!
    $question: String!
    $options: [String!]!
    $correct: String!
  ) {
    changeQuestion(id: $id, question: $question, options: $options, correct: $correct) {
      id
      question
      options
      correct
    }
  }
`;

export const DELETE_QUESTION = gql`
  mutation DeleteQuestion($id: ID!) {
    deleteQuestion(id: $id) {
      id
      question
      options
      correct
    }
  }
`;
