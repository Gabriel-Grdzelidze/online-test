import gql from 'graphql-tag';

export const GET_STUDENTS = gql`
  query GetStudents {
    students {
    id
    email
    password
    }
  }
`;

export const GET_QUESTIONS=gql`
  query GetStudents{
    question{
      id
      question
      options
      correct
    }
  }
`