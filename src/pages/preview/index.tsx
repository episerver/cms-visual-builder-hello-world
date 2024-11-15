import { ExperienceTemplate } from "@components/base/experience/experience.template";
import { CMSUrlProps, parseQueryParameters } from "@helpers/cms/parsers";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Preview() {
  const query = useSearchParams();

  const [urlProps, setUrlProps] = useState<CMSUrlProps>();

  useEffect(() => {
    let params: CMSUrlProps = {};
    console.log("router change", query);

    if (query) {
      params = parseQueryParameters(query);
    }

    setUrlProps(params);
  }, [query]);

  if (!urlProps?.contentGuid) {
    return <>Expected a Content GUID.</>;
  }

  return <main className={`flex flex-col`}> {urlProps && <ExperienceTemplate {...urlProps} />}</main>;
}
