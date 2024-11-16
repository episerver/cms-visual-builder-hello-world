import { graphql } from "@generated/graphql/gql";

export const QuoteFragment = graphql(/* GraphQL */ `
  fragment QuoteFragment on QuoteElement {
    Quote
    QuoteBrandName: BrandName
    QuoteLogo: Logo {
      url {
        default
      }
    }
  }
`);
