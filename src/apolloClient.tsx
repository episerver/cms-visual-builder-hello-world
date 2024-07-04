import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { getPreviewToken } from "@/helpers/onContentSaved";

let client: ApolloClient<any> | undefined = undefined;
const graphUrl = process.env.GRAPH_URL;
const cmsUrl = process.env.CMS_URL;
const preview_token = getPreviewToken();

// In Preview Mode
if (preview_token) {
    const httpLink = createHttpLink({
        uri: `https://${graphUrl}/content/v2`,
    });

    const authLink = setContext((_, { headers }) => {
        return {
            headers: {
                ...headers,
                authorization: `Bearer ${preview_token}`
            }
        };
    });

    client = new ApolloClient({
        link: authLink.concat(httpLink),
        cache: new InMemoryCache()
    });

    const communicationScript = document.createElement('script');
    communicationScript.src = `https://${cmsUrl}/Util/javascript/communicationInjector.js`;
    communicationScript.setAttribute('data-nscript', 'afterInteractive')
    document.body.appendChild(communicationScript);
}

// In Public Mode
if (client === undefined) {
    const singleGraphKey = process.env.GRAPH_SINGLE_KEY;
    const httpLink = createHttpLink({
        uri: `https://${graphUrl}/content/v2?auth=${singleGraphKey}`,
    });

    const authLink = setContext((_, { headers }) => {
        return {
            headers: {
                ...headers
            }
        };
    });

    client = new ApolloClient({
        link: authLink.concat(httpLink),
        cache: new InMemoryCache()
    });
}

export default client;

