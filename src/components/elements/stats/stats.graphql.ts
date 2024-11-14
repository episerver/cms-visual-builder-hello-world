import { graphql } from "@graphql";

export const StatsFragment = graphql(/* GraphQL */ `
  fragment StatsFragment on StatsElement {
    StatsLogo: Logo {
      url {
        default
      }
    }
    StatsTitle: Title
    StatsSubtitle: Subtitle
  }
`);
