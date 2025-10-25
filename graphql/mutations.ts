import gql from "graphql-tag";

export const CREATE_STUDENT = gql`
  mutation CreateStudent($password: String!, $email: String!) {
    createStudent(password: $password, email: $email) {
        id
        email
        password
    }
    }
`;

export const CREATE_QUESTION = gql`
  mutation CreateStudent($question: String!, $options: [String!]!,$correct: String!) {
    createStudent(question: $question, options: $options, correct: $correct ) {
        id
        options
        question
        correct
    }
    }
`;