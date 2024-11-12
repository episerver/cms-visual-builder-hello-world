import { graphql } from "@graphql";

export const SectionFragment = graphql(/* GraphQL */ `
  fragment SectionNode on CompositionStructureNode {
    key
    displayName
    displayTemplateKey
    displaySettings {
      key
      value
    }
    rows: nodes {
      key
      ...RowNode
    }
  }
`);
