import { graphql } from "@generated/graphql/gql";

export const HeadingFragment = graphql(/* GraphQL */ `
  fragment HeadingFragment on HeadingElement {
    HeadingElementHeading: Heading
  }
`);
