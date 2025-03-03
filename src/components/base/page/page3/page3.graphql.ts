import { graphql } from "@generated/graphql/gql";

export const Page3Query = graphql(/* GraphQL */ `
  query GetPage3Page(
    $key: String
    $version: String
    $locale: String
    $url: String
    $status: String
  ) {
    content: Page3(
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
