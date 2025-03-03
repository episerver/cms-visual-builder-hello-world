import { useQuery } from "@apollo/client";
import { useGlobalContext } from "@context";
import { JustPageQuery } from "./justpage.graphql";

export interface JustPageTemplateProps {
  contentGuid?: string | null; // Content GUID
  version?: string | null; // Optional version
  locale?: string | null; // Optional locale
  // Or queried by just URL
  url?: string | null; // Matched against the URL.Default
}

interface Node {
  text?: string;
  children?: Node[];
}

export function extractText(node: Node): string {
  if (!node) return "";

  if (typeof node.text === "string" && node.text !== "&nbsp;") return node.text;

  if (Array.isArray(node.children)) {
    return node.children.reduce((acc, child) => acc + extractText(child), "");
  }

  return "";
}

export const JustPageTemplate: React.FC<JustPageTemplateProps> = ({
  url,
  contentGuid,
}) => {
  const { setIsLoading } = useGlobalContext();
  const { data, refetch, error, loading } = useQuery(JustPageQuery, {
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

  const paragraph =
    extractText(data?.content?.items?.[0]?.Block?.Text?.json) || "";

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
