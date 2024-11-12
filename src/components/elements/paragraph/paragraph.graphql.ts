import { graphql } from "@graphql";

export const ParagraphFragment = graphql(/* GraphQL */ `
  fragment ParagraphFragment on ParagraphElement {
    ParagraphElementText: Text {
      html
    }
  }
`);
