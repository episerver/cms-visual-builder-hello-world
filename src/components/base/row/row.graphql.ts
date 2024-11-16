import { graphql } from "@generated/graphql/gql";

export const RowFragment = graphql(/* GraphQL */ `
  fragment RowNode on CompositionStructureNode {
    key
    displayName
    displayTemplateKey
    displaySettings {
      key
      value
    }
    columns: nodes {
      key
      ...ColumnNode
    }
  }
`);
