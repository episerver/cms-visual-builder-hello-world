import { graphql } from "@graphql";

export const ListItemFragment = graphql(/* GraphQL */ `
  fragment ListItemFragment on ListItemElement {
    ListItemText: Text
    ListItemLink: Link {
      default
    }
  }
`);
