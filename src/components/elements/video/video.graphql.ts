import { graphql } from "@graphql";

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
