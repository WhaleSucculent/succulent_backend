import { gql } from "@apollo/client";

const ORDER_DETAILS = gql`
  query getProducts {
    products {
      id
      name
      description
      priceList {
        price
      }
    }
  }
`;

export { ORDER_DETAILS };
