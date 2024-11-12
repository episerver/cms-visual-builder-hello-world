import { CMSUrlProps } from "@helpers/cms/parsers";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { ExperienceTemplate } from "../../components/base/experience/experience.template";

export default function Home() {
  const params = useParams();
  const [urlProps, setUrlProps] = useState<CMSUrlProps>();

  useEffect(() => {
    let url = "/";
    const slug = params?.slug;
    if (slug) {
      if (Array.isArray(slug)) {
        url = `/${slug.join("/")}/`;
      } else {
        url = slug.startsWith("/") ? slug : `/${slug}/`;
      }
    }

    setUrlProps({ url });
  }, [params]);

  if (!urlProps?.url) {
    return <>Expected some URL data.</>;
  }

  return <main className={`flex flex-col`}>{urlProps && <ExperienceTemplate {...urlProps} />}</main>;
}
