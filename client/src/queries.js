import { gql } from "apollo-boost";

// Mutaciones para usuarios

export const SIGNIN_USER = gql`
  mutation($username: String!, $password: String!) {
    signinUser(username: $username, password: $password) {
      token
    }
  }
`;

export const GET_FOOD_LIST = gql`
  query {
    getFoodList {
      _id
      name
      price
      shift
      imageURL
    }
  }
`;

export const GET_DRINK_LIST = gql`
  query {
    getDrinkList {
      _id
      name
      price
      imageURL
    }
  }
`;

export const GET_EXTRA_LIST = gql`
  query {
    getExtraList {
      _id
      name
      price
      imageURL
    }
  }
`;
