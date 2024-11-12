import { useApolloClient } from "@apollo/client";
import { useSearchParams } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";
import { OptimizelyIntegrationClient } from "../client";
import { parseQueryParameters } from "@helpers/cms";

export type GlobalContextType = {
  isLoading?: boolean;
  setIsLoading: (val: boolean) => void;
};

const GlobalContext = createContext<GlobalContextType | null>(null);

export const useGlobalContext = (): GlobalContextType => {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error("useGlobalContext must be used within a GlobalProvider");
  }
  return context;
};

export const GlobalProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const searchParams = useSearchParams();
  const client = useApolloClient();

  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const cl = client as OptimizelyIntegrationClient;
    const parameters = parseQueryParameters(searchParams);
    if (parameters.token) {
      if (cl.refresh) {
        cl.refresh(parameters.token);
      }
    }
  }, [searchParams]);

  return <GlobalContext.Provider value={{ isLoading, setIsLoading }}>{children}</GlobalContext.Provider>;
};
