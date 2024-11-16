import { graphql } from "@generated/graphql/gql";

export const ImageFragment = graphql(/* GraphQL */ `
  fragment ImageFragment on ImageElement {
    ImageUrl: Image {
      url {
        default
      }
    }
    ImageAltText
  }
`);
