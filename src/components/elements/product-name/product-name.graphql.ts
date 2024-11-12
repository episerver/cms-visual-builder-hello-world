import { graphql } from "@graphql";

export const ProductNameFragment = graphql(/* GraphQL */ `
  fragment ProductNameFragment on ProductNameElement {
    ProductName
    ProductNameIcon: Icon {
      url {
        default
      }
    }
  }
`);
