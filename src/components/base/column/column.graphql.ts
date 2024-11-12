import { graphql } from "@graphql";

export const ColumnFragment = graphql(/* GraphQL */ `
  fragment ColumnNode on CompositionStructureNode {
    key
    displayName
    displayTemplateKey
    displaySettings {
      key
      value
    }
    elements: nodes {
      key
      ...ElementNode
    }
  }
`);
