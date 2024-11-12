import { graphql } from "@graphql";

export const ImpactHighlightFragment = graphql(/* GraphQL */ `
  fragment ImpactHighlightFragment on ImpactHighlightElement {
    ImpactHighlightLogo: Logo {
      url {
        default
      }
    }
    ImpactHighlightImpact: Impact
    ImpactHighlightNumericalImpact: NumericalImpact
  }
`);
