import { graphql } from "@generated/graphql/gql";

export const ParagraphFragment = graphql(/* GraphQL */ `
  fragment ParagraphFragment on ParagraphElement {
    ParagraphElementText: Text {
      html
    }
  }
`);
