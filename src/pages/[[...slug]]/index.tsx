import { CMSUrlProps } from "@helpers/cms/parsers";
import { useParams } from "next/navigation";
import { useMemo } from "react";
import TemplateFactory from "@components/base/templates/template.factory";

const getUrlFromParams = (slug: string | string[] | undefined) => {
  if (!slug) return "/";
  if (Array.isArray(slug)) {
    return `/${slug.join("/")}/`;
  }
  return slug.startsWith("/") ? slug : `/${slug}/`;
};

export default function Home() {
  const { slug } = useParams() ?? {};
  const url = useMemo(() => getUrlFromParams(slug), [slug]);

  if (!url) {
    return <>Expected some URL data.</>;
  }

  return (
    <main className={`flex flex-col`}>
      <TemplateFactory url={url} />
    </main>
  );
}
