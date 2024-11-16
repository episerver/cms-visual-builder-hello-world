import { graphql } from "@generated/graphql/gql";

export const TileFragment = graphql(/* GraphQL */ `
  fragment TileFragment on TileElement {
    TileLink: Link {
      default
    }
    TileHeading: Heading
    TileDescription: Description
  }
`);
