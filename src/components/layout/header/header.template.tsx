import { useQuery } from "@apollo/client";
import { useEffect, useMemo, useState } from "react";
import { DesktopNavigation } from "./desktop-nav.template";
import { NavigationItemsQuery } from "./header.graphql";
import { MobileNavigation } from "./mobile-nav.template";
import { useGlobalContext } from "@context";

export interface HeaderTemplateProps {}

export const HeaderTemplate: React.FC<HeaderTemplateProps> = () => {
  const { setIsLoading } = useGlobalContext();
  const [queryVariables, setQueryVariables] = useState({ host: "" });

  const { data, refetch, error, loading } = useQuery(NavigationItemsQuery, {
    skip: !queryVariables.host,
    variables: queryVariables,
    notifyOnNetworkStatusChange: true,
    onCompleted: () => {
      console.log("Got nav items", queryVariables);
      setIsLoading(false);
    },
  });

  const navigationItems = useMemo(() => {
    const items = data?.content?.items;
    if (!data || !items || items.length === 0) {
      return [];
    }
    return items.filter(Boolean).map((i) => ({
      name: i!.item?.displayName,
      url: i!.item?.url?.default,
    }));
  }, [data]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setQueryVariables({
        host: window.location.origin,
      });
    }
  }, []);

  return (
    <>
      <header>
        <DesktopNavigation items={navigationItems} />
        <MobileNavigation items={navigationItems} />
      </header>
    </>
  );
};
