import { graphql } from "@generated/graphql/gql";

export const ElementFragment = graphql(/* GraphQL */ `
  fragment ElementNode on CompositionElementNode {
    key
    type
    nodeType
    displayName
    displayTemplateKey
    displaySettings {
      key
      value
    }
    element {
      ...ButtonFragment
      ...HeadingFragment
      ...StatsFragment
      ...ParagraphFragment
      ...OverlineFragment
      ...QuoteFragment
      ...TileFragment
      ...ImageFragment
      ...VideoFragment
      ...ListItemFragment
    }
  }
`);
