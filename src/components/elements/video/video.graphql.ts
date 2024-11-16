import { graphql } from "@generated/graphql/gql";

export const VideoFragment = graphql(/* GraphQL */ `
  fragment VideoFragment on VideoElement {
    VideoUrl: Video {
      url {
        default
      }
    }
    VideoAltText
  }
`);
