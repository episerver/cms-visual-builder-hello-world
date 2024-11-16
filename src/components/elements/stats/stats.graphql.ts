import { graphql } from "@generated/graphql/gql";

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
