import { graphql } from "@generated/graphql/gql";

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
