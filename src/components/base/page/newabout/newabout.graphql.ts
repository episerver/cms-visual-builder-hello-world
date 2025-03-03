import { graphql } from "@generated/graphql/gql";

export const NewAboutQuery = graphql(/* GraphQL */ `
  query GetNewAboutPage(
    $key: String
    $version: String
    $locale: String
    $url: String
    $status: String
  ) {
    content: BlankPage(
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
        Title
        Block {
          Heading
        }
      }
    }
  }
`);

export const NewAboutDataFragment = graphql(/* GraphQL */ `
  fragment NewAboutData on BlankPage {
    Title
    Block {
      Heading
    }
  }
`);
