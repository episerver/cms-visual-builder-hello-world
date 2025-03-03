import { graphql } from "@generated/graphql/gql";

export const ExperienceQuery = graphql(/* GraphQL */ `
  query GetExperience(
    $key: String
    $version: String
    $locale: String
    $url: String
    $status: String
  ) {
    content: BlankExperience(
      where: {
        _metadata: {
          url: { default: { eq: $url } }
          status: { eq: $status }
          key: { eq: $key }
          version: { eq: $version }
          locale: { eq: $locale }
        }
      }
    ) {
      items {
        composition {
          key
          displayName
          displayTemplateKey
          displaySettings {
            key
            value
          }
          sections: nodes {
            key
            ...SectionNode
          }
        }
      }
    }
  }
`);

export const BlankExperienceFragment = graphql(/* GraphQL */ `
  fragment BlankExperienceFragment on BlankExperience {
    composition {
      key
      displayName
      displayTemplateKey
      displaySettings {
        key
        value
      }
      sections: nodes {
        key
        ...SectionNode
      }
    }
  }
`);
