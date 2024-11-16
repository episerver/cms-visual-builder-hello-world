import { useQuery } from "@apollo/client";
import { CompositionDisplaySetting, SectionNodeFragment } from "@generated/graphql";
import { useContentSaved } from "@hooks";
import { useEffect, useMemo } from "react";
import { SectionTemplate } from "../section/section.template";
import { ExperienceQuery } from "./experience.graphql";
import { GetExperienceStyles } from "./experience.style";
import { useGlobalContext } from "@context";

interface ExperienceTemplateProps {
  contentGuid?: string | null; // Content GUID
  version?: string | null; // Optional version
  locale?: string | null; // Optional locale
  // Or queried by just URL
  url?: string | null; // Matched against the URL.Default
}

export const ExperienceTemplate: React.FC<ExperienceTemplateProps> = ({ contentGuid, version, locale, url }) => {
  const { setIsLoading } = useGlobalContext();
  const queryVariables = { key: contentGuid, version, locale, url, status: url ? "Published" : undefined };

  const { data, refetch, error, loading } = useQuery(ExperienceQuery, {
    variables: queryVariables,
    notifyOnNetworkStatusChange: true,
    onError: (error) => {
      console.error("[QUERY] Error fetching Experience", error);
      // refetch(queryVariables);
    },
    onCompleted: (data) => {
      console.log("[QUERY] Query finished with variables", queryVariables, data);
      setIsLoading(false);
    },
  });

  const experience = useMemo(() => {
    const items = data?.content?.items;
    if (!data || !items || items.length === 0) {
      return null;
    }

    return items[0];
  }, [data]);

  useContentSaved((data) => {
    const [contentId, contentVersion] = data.contentLink.split("_");
    if (contentVersion) {
      queryVariables.version = contentVersion;
    }

    refetch(queryVariables);
  });

  useEffect(() => {
    if (loading) {
      setIsLoading(true);
    }
  }, [loading]);

  const sections = useMemo(() => experience?.composition?.sections ?? [], [experience]);

  const classes = useMemo(() => {
    return GetExperienceStyles(experience?.composition?.displaySettings as CompositionDisplaySetting[]);
  }, [experience]);

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!experience && !loading) {
    return null;
  }

  return (
    <article className={classes}>
      {sections.map((section) => section && <SectionTemplate section={section as SectionNodeFragment} key={section.key} />)}
    </article>
  );
};
