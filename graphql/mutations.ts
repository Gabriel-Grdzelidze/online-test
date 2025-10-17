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