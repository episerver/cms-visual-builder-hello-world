import { useQuery } from "@apollo/client";
import { useGlobalContext } from "@context";
import { NewAboutQuery } from "./newabout.graphql";
import { ElementTemplate } from "@components/base/element/element.template";
import { ElementNodeFragment, NewAboutDataFragment } from "@generated/graphql";

export interface NewAboutTemplateProps {
  contentGuid?: string | null; // Content GUID
  version?: string | null; // Optional version
  locale?: string | null; // Optional locale
  // Or queried by just URL
  url?: string | null; // Matched against the URL.Default
}

export const NewAboutTemplate: React.FC<NewAboutTemplateProps> = ({
  url,
  contentGuid,
}) => {
  const { setIsLoading } = useGlobalContext();

  const { data, refetch, error, loading } = useQuery(NewAboutQuery, {
    variables: { url, key: contentGuid },
    notifyOnNetworkStatusChange: true,
    onError: (error) => {
      console.error("[QUERY] Error fetching Experience", error);
      // refetch(queryVariables);
    },
    onCompleted: (data) => {
      console.log("[QUERY] Query finished with variables", {}, data);
      setIsLoading(false);
    },
  });

  const contentItem = data?.content?.items?.[0] as NewAboutDataFragment;

  const title = contentItem?.Title || "No Title";
  const heading = contentItem?.Block?.Heading || "No Heading";

  return (
    <article className="relative experience theme--blue">
      <section className="opti-container outer-padding padding-top--medium padding-bottom--medium">
        <div className="opti-container__content container-narrow">
          <h1 className="text-red">{title}</h1>
          <h2>{heading}</h2>
        </div>
      </section>
    </article>
  );
};
