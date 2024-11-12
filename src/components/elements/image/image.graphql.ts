import { graphql } from "@graphql";

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
