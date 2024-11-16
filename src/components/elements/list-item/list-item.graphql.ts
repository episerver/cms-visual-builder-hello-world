import { graphql } from "@generated/graphql/gql";

export const ListItemFragment = graphql(/* GraphQL */ `
  fragment ListItemFragment on ListItemElement {
    ListItemText: Text
    ListItemLink: Link {
      default
    }
  }
`);
