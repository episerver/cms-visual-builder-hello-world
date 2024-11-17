import { ApolloClient, ApolloLink, createHttpLink, InMemoryCache, NormalizedCacheObject } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
// import { getPreviewToken } from "@helpers/cms";

interface OptimizelyIntegrationClientConfig {
  cmsUrl: string;
  // Optimizely GraphQL API
  graphUrl: string;
  singleGraphKey: string;
}

export class OptimizelyIntegrationClient extends ApolloClient<NormalizedCacheObject> {
  private config: OptimizelyIntegrationClientConfig;

  public get communicationInjector() {
    // return `https://${this.config.cmsUrl}/Util/javascript/communicationInjector.js`;
    return "/scripts/communicationInjector.js";
  }

  constructor(config: OptimizelyIntegrationClientConfig) {
    const httpLink = createHttpLink({
      uri: `https://${config.graphUrl}/content/v2?auth=${config.singleGraphKey}`,
    });

    super({
      link: httpLink,
      cache: new InMemoryCache(),
    });

    this.config = config;
  }

  public refresh(token: string) {
    const httpLink = createHttpLink({
      uri: `https://${this.config.graphUrl}/content/v2?auth=${this.config.singleGraphKey}`,
    });

    this.setLink(
      setContext((_, { headers }) => ({
        headers: {
          ...headers,
          authorization: token ? `Bearer ${token}` : "",
        },
      })).concat(httpLink)
    );
  }
}

export const client = new OptimizelyIntegrationClient({
  cmsUrl: process.env.CMS_URL ?? "",
  graphUrl: process.env.GRAPH_URL ?? "",
  singleGraphKey: process.env.GRAPH_SINGLE_KEY ?? "",
});

