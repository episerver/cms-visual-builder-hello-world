import { graphql } from "@graphql";

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
      ...ImageFragment
      ...ImpactHighlightFragment
      ...ParagraphFragment
      ...ProductNameFragment
      ...QuoteFragment
      ...TileFragment
      ...VideoFragment
    }
  }
`);
