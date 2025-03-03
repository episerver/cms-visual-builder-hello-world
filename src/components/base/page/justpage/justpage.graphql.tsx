import { graphql } from "@generated/graphql/gql";

export const JustPageQuery = graphql(/* GraphQL */ `
  query GetJustPage(
    $key: String
    $version: String
    $locale: String
    $url: String
    $status: String
  ) {
    content: JustPage(
      where: {
        _metadata: {
          url: { default: { eq: $url } }
          status: { eq: $status }
          key: { eq: $key }
          version: { eq: $version }
          locale: { eq: $locale }
        }
      }
    ) {
      items {
        Block {
          Text {
            json
          }
        }
      }
    }
  }
`);

export const JustPageFragment = graphql(/* GraphQL */ `
  fragment JustPageFragment on JustPage {
    Block {
      Text {
        json
      }
    }
  }
`);
