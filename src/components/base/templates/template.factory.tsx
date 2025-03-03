import { useQuery } from "@apollo/client";
import { getContentByPath, MetadataQuery } from "./metadata.graphql";
import { ExperienceTemplate } from "../experience/blankexperience/experience.template";
import { NewAboutTemplate } from "../page/newabout/newabout.template";
import { JustPageTemplate } from "../page/justpage/justpage.template";
import { Page1Template } from "../page/page1/page1.template";
import { Page2Template } from "../page/page2/page2.template";
import { Page3Template } from "../page/page3/page3.template";
import { Page4Template } from "../page/page4/page4.template";
import { Page5Template } from "../page/page5/page5.template";

const TemplateFactory = ({ url }: { url: string }) => {
  const { data: metadata } = useQuery(MetadataQuery, {
    skip: !url,
    variables: { url },
    notifyOnNetworkStatusChange: true,
    onError: (error) => console.error("GraphQL Error:", error),
  });

  // const { data: myData } = useQuery(getContentByPath, {
  //   skip: !url,
  //   variables: { url },
  //   notifyOnNetworkStatusChange: true,
  //   onError: (error) => console.error("GraphQL Error:", error),
  // });

  // console.log("myData", myData);

  const type =
    metadata?.content?.items?.[0]?._metadata?.types?.[0] ?? "default";

  const contentGuid = metadata?.content?.items?.[0]?._metadata?.key;

  switch (type) {
    case "BlankExperience":
      return <ExperienceTemplate {...{ contentGuid, url }} />;
    case "JustPage":
      return <JustPageTemplate {...{ contentGuid, url }} />;
    case "BlankPage":
      return <NewAboutTemplate {...{ contentGuid, url }} />;
    case "Page1":
      return <Page1Template {...{ contentGuid, url }} />;
    case "Page2":
      return <Page2Template {...{ contentGuid, url }} />;
    case "Page3":
      return <Page3Template {...{ contentGuid, url }} />;
    case "Page4":
      return <Page4Template {...{ contentGuid, url }} />;
    case "Page5":
      return <Page5Template {...{ contentGuid, url }} />;
  }
};

export default TemplateFactory;
