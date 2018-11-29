import { gql } from "apollo-boost";

export const GET_FOOD_LIST = gql`
  query {
    getFoodList {
      _id
      name
      price
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

export const ADD_ORDER = gql`
  mutation($products: [String]!, $total: Int!, $client: String!) {
    addOrder(products: $products, total: $total, client: $client) {
      _id
      products
      total
      client
    }
  }
`;
