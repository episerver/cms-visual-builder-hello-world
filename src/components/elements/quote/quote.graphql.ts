import { graphql } from "@graphql";

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
