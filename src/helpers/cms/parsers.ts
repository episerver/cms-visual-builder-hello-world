import { ReadonlyURLSearchParams } from "next/navigation";

// TODO: Most of this file should be data from the SDK.
export enum PreviewType {
  Undefined = 0, // This should mean we are in the delivery site directly
  Standard = 1, // This should mean the new preview, /preview?key=ContenGuid&ver=12&loc=en
}

export type CMSQueryParameters = {
  contentGuid?: string | null;
  version?: string | null;
  locale?: string | null;
  token?: string | null;
  context?: string | null;
};

export interface CMSUrlProps extends CMSQueryParameters {
  url?: string;
}

function getParamValue(query: URLSearchParams, name: string) {
  const value = query.get(name);
  return !value ? value : Array.isArray(value) ? value.map((el) => decodeURIComponent(el)) : decodeURIComponent(value);
}

export function parseQueryParameters(query: URLSearchParams): CMSQueryParameters {
  const parameters: CMSQueryParameters = {};

  const expectedQueryParams = Object.entries({
    contentGuid: "key",
    version: "ver",
    locale: "loc",
    token: "preview_token",
    context: "ctx",
  });

  for (const queryParam of expectedQueryParams) {
    const queryParamKey = queryParam[0] as keyof CMSQueryParameters;
    const queryParamValue = queryParam[1];

    try {
      if (query.has(queryParamValue) && queryParamKey) {
        const value = getParamValue(query, queryParamValue);
        parameters[queryParamKey] = Array.isArray(value) ? value[0] : value;
      }
    } catch {
      // No-op, if it fails we ignore it.
    }
  }

  return parameters;
}

export function parseUrl(url: URL): CMSUrlProps {
  const queryParams: URLSearchParams = new URLSearchParams();
  url.searchParams.forEach((value, key) => {
    queryParams.set(key, value);
  });

  const parameters: CMSUrlProps = {
    url: url.pathname,
    ...parseQueryParameters(queryParams),
  };

  return parameters;
}
