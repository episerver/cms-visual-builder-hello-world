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

      try {
        const newPreviewUrl = message.previewUrl;
        const urlParams = new URLSearchParams(newPreviewUrl);
        const newPreviewToken = urlParams.get("preview_token");

        if (newPreviewToken) {
          // const newUrl = new URL(message.previewUrl);
          const cl = client as OptimizelyIntegrationClient;
          if (cl.refresh) {
            cl.refresh(newPreviewToken);
          }
        }
      } catch {
        // noop
        console.error("Error refreshing preview token.");
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
