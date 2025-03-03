import { useQuery } from "@apollo/client";
import { useGlobalContext } from "@context";
import { Page1Query } from "./page1.graphql";
import { ElementTemplate } from "@components/base/element/element.template";
import { ElementNodeFragment, Page1DataFragment } from "@generated/graphql";
import { extractText } from "../justpage/justpage.template";
import { getContentByPath } from "@components/base/templates/metadata.graphql";

export interface Page1TemplateProps {
  contentGuid?: string | null; // Content GUID
  version?: string | null; // Optional version
  locale?: string | null; // Optional locale
  // Or queried by just URL
  url?: string | null; // Matched against the URL.Default
}

export const Page1Template: React.FC<Page1TemplateProps> = ({
  url,
  contentGuid,
}) => {
  const { setIsLoading } = useGlobalContext();

  // const { data, refetch, error, loading } = useQuery(Page1Query, {
  //   variables: { url, key: contentGuid },
  //   notifyOnNetworkStatusChange: true,
  //   onError: (error) => {
  //     console.error("[QUERY] Error fetching Experience", error);
  //     // refetch(queryVariables);
  //   },
  //   onCompleted: (data) => {
  //     console.log("[QUERY] Query finished with variables", {}, data);
  //     setIsLoading(false);
  //   },
  // });

  const { data, refetch, error, loading } = useQuery(getContentByPath, {
    variables: { url: url! },
    notifyOnNetworkStatusChange: true,
    onError: (error) => {
      console.error("[QUERY] Error fetching Experience", error);
      // refetch(queryVariables);
      setIsLoading(false);
    },
    onCompleted: (data) => {
      console.log("[QUERY] Query finished with variables", {}, data);
      setIsLoading(false);
    },
  });

  const contentItem = data?.content?.items?.[0] as Page1DataFragment;

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
