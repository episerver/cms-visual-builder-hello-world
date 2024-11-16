import { graphql } from "@generated/graphql/gql";

export const ButtonFragment = graphql(/* GraphQL */ `
  fragment ButtonFragment on ButtonElement {
    ButtonElementText: Text
    ButtonElementLink: ButtonLink {
      default
    }
  }
`);
