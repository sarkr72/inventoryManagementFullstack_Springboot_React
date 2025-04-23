import { gql } from '@apollo/client';

export const GET_ITEM = gql`
  query GetItem($id: ID!) {
    getItem(id: $id) {
      id
      name
      price
    }
  }
`;
