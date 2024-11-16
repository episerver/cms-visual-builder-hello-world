import { graphql } from "@generated/graphql/gql";

export const ExperienceQuery = graphql(/* GraphQL */ `
  query GetExperience($key: String, $version: String, $locale: String, $url: String, $status: String) {
    content: _Experience(
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
        metadata: _metadata {
          key
          version
          locale
          displayName
          url {
            default
          }
          published
          status
          created
          lastModified
        }
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
