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