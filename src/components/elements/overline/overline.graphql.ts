import { graphql } from "@graphql";

export const OverlineFragment = graphql(/* GraphQL */ `
  fragment OverlineFragment on OverlineElement {
    OverlineText: Text
  }
`);
