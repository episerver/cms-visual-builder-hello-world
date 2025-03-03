import { graphql } from "@generated/graphql/gql";

export const Page4Query = graphql(/* GraphQL */ `
  query GetPage4Page(
    $key: String
    $version: String
    $locale: String
    $url: String
    $status: String
  ) {
    content: Page4(
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
