import { graphql } from "@graphql";

export const NavigationItemsQuery = graphql(/* GraphQL */ `
  query GetNavigationLinks($status: String! = "Published", $host: String) {
    content: _Page(where: { _metadata: { status: { eq: $status }, url: { base: { eq: $host } } } }, limit: 5) {
      items {
        item: _metadata {
          displayName
          url {
            default
          }
        }
      }
    }
  }
`);
