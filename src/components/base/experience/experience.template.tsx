import { useQuery } from "@apollo/client";
import { SectionNodeFragment } from "@graphql/graphql";
import { useContentSaved } from "@hooks";
import { useMemo } from "react";
import { Loader } from "../../utility/loader/loader";
import { SectionTemplate } from "../section/section.template";
import { ExperienceQuery } from "./experience.graphql";

interface ExperienceTemplateProps {
  contentGuid?: string | null; // Content GUID
  version?: string | null; // Optional version
  locale?: string | null; // Optional locale
  // Or queried by just URL
  url?: string | null; // Matched against the URL.Default
}

const ThemeMapper: Record<string, string> = {
  blue: "theme--blue",
  purple: "theme--purple",
  green: "theme--green",
  orange: "theme--orange",
};

export const ExperienceTemplate: React.FC<ExperienceTemplateProps> = ({ contentGuid, version, locale, url }) => {
  const queryVariables = { key: contentGuid, version, locale, url, status: url ? "Published" : undefined };

  const { data, refetch, error, loading } = useQuery(ExperienceQuery, {
    variables: queryVariables,
    notifyOnNetworkStatusChange: true,
    onCompleted: (dt) => {
      console.log("Query finished with variables", queryVariables, dt);
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

  const sections = useMemo(() => experience?.composition?.sections ?? [], [experience]);

  const theme = useMemo(() => {
    const theme = experience?.composition?.displaySettings?.[0];
    const themeKey = theme?.value?.toLowerCase();
    if (themeKey) {
      return ThemeMapper[themeKey] ?? "";
    }

    return "";
  }, [experience]);

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!experience && !loading) {
    return null;
  }

  return (
    <article className={`experience relative ${theme}`}>
      {loading && <Loader translucent />}
      {sections.map((section) => section && <SectionTemplate section={section as SectionNodeFragment} key={section.key} />)}
    </article>
  );
};
