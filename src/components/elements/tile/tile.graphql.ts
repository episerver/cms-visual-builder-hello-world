import { graphql } from "@graphql";

export const TileFragment = graphql(/* GraphQL */ `
  fragment TileFragment on TileElement {
    TileLogo: Logo {
      url {
        default
      }
    }
    TileLink: Link {
      default
    }
    TileHighlight: Highlight
    TileDescription: Description
  }
`);
