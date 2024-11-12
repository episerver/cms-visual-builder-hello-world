import { useApolloClient } from "@apollo/client";
import { useRouter } from "next/navigation";
import { useCallback, useEffect } from "react";
import { OptimizelyIntegrationClient } from "../client";
import { ContentSavedEventArgs } from "@models";

export const useContentSaved = (callback: (message: ContentSavedEventArgs) => any) => {
  const router = useRouter();
  const client = useApolloClient();

  const listener = useCallback(
    (event: any) => {
      const message = event.detail as ContentSavedEventArgs;

      if (message?.previewToken) {
        // const newUrl = new URL(message.previewUrl);
        const cl = client as OptimizelyIntegrationClient;
        if (cl.refresh) {
          cl.refresh(message.previewToken);
        }
      }

      callback(message);
    },
    [callback]
  );

  useEffect(() => {
    window.addEventListener("optimizely:cms:contentSaved", listener);

    return () => {
      window.removeEventListener("optimizely:cms:contentSaved", listener);
    };
  }, [router]);
};
