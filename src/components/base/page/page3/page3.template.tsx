import { useQuery } from "@apollo/client";
import { useGlobalContext } from "@context";
import { Page3Query } from "./page3.graphql";
import { ElementTemplate } from "@components/base/element/element.template";
import { ElementNodeFragment, Page3DataFragment } from "@generated/graphql";
import { extractText } from "../justpage/justpage.template";

export interface Page3TemplateProps {
  contentGuid?: string | null; // Content GUID
  version?: string | null; // Optional version
  locale?: string | null; // Optional locale
  // Or queried by just URL
  url?: string | null; // Matched against the URL.Default
}

export const Page3Template: React.FC<Page3TemplateProps> = ({
  url,
  contentGuid,
}) => {
  const { setIsLoading } = useGlobalContext();

  const { data, refetch, error, loading } = useQuery(Page3Query, {
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

  const contentItem = data?.content?.items?.[0] as Page3DataFragment;

  const paragraph = extractText(contentItem?.Block?.Text?.json) || "";

  return (
    <article className="relative experience theme--blue">
      <section className="opti-container outer-padding padding-top--medium padding-bottom--medium">
        <div className="opti-container__content container-narrow">
          <p>{paragraph}</p>
        </div>
      </section>
    </article>
  );
};
