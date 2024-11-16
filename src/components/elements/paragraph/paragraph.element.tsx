import { CompositionDisplaySetting, ParagraphFragmentFragment } from "@generated/graphql";
import clsx from "clsx";
import { memo, useMemo } from "react";
import { GetParagraphStyles } from "./paragraph.style";
import { ElementProps } from "../element.types";

export interface ParagraphElementProps extends ElementProps<ParagraphFragmentFragment> {}

export const ParagraphElementComponent: React.FC<ParagraphElementProps> = ({
  element,
  elementKey,
  displaySettings,
  displayTemplateKey,
}) => {
  if (!element) {
    return null;
  }

  const { ParagraphElementText } = element;

  const classes = useMemo(() => {
    return GetParagraphStyles(displaySettings);
  }, [displaySettings, displayTemplateKey]);

  return (
    <>
      <article
        dangerouslySetInnerHTML={{ __html: ParagraphElementText?.html ?? "" }}
        className={classes}
        data-epi-block-id={elementKey}
      ></article>
    </>
  );
};
