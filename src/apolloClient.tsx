import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

let client: ApolloClient<any> | undefined = undefined;

if (typeof window !== "undefined" && window.location !== undefined) {
    const queryString = window?.location?.search;
    const urlParams = new URLSearchParams(queryString);
    const preview_token = urlParams.get('preview_token') ?? undefined;

    if (preview_token) {
        const httpLink = createHttpLink({
            uri: 'https://staging.cg.optimizely.com/content/v2',
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
        communicationScript.src = `https://app-sactlateste7x2e1p001.cmstest.optimizely.com/Util/javascript/communicationInjector.js`;
        communicationScript.setAttribute('data-nscript', 'afterInteractive')
        document.body.appendChild(communicationScript);

        const deliveryPropertyRenderer = document.createElement('script');
        deliveryPropertyRenderer.src = `https://app-sactlateste7x2e1p001.cmstest.optimizely.com/Util/javascript/deliveryPropertyRenderer.js`;
        deliveryPropertyRenderer.setAttribute('data-nscript', 'afterInteractive')
        document.body.appendChild(deliveryPropertyRenderer);
    }
}

if (client === undefined) {
    const httpLink = createHttpLink({
        uri: 'https://staging.cg.optimizely.com/content/v2?auth=KSAzBegmYvXIKE3bEbechiYrYiPKsVyACWEt4cLQJFkSr3SD',
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

