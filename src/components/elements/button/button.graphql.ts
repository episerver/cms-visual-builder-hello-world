import { graphql } from "@graphql";

export const ButtonFragment = graphql(/* GraphQL */ `
  fragment ButtonFragment on ButtonElement {
    ButtonElementText: Text
    ButtonElementLink: ButtonLink {
      default
    }
  }
`);
