import gql from "graphql-tag";

export const CREATE_STUDENT = gql`
  mutation CreateStudent($email: String!, $password: String!, $idNumber: String!, $score: Int) {
    createStudent(email: $email, password: $password, idNumber: $idNumber, score: $score) {
      id
      email
      password
      idNumber
      score
    }
  }
`;

export const CREATE_QUESTION = gql`
  mutation CreateQuestion($question: String!, $options: [String!]!, $correct: String!) {
    createQuestion(question: $question, options: $options, correct: $correct) {
      id
      question
      options
      correct
    }
  }
`;
