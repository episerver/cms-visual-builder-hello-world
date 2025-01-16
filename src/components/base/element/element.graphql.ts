import { graphql } from "@generated/graphql/gql";

export const ElementFragment = graphql(/* GraphQL */ `
  fragment ElementNode on CompositionComponentNode {
    key
    type
    nodeType
    displayName
    displayTemplateKey
    displaySettings {
      key
      value
    }
    component {
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
