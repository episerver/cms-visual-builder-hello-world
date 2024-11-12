import { CompositionDisplaySetting, ParagraphFragmentFragment } from "@graphql/graphql";
import { memo } from "react";

export interface ParagraphElementProps {
  element: ParagraphFragmentFragment;
  displaySettings?: CompositionDisplaySetting[];
  displayTemplateKey?: string | null;
}

export const ParagraphElementComponent: React.FC<ParagraphElementProps> = memo(
  ({ element }) => {
    if (!element) {
      return null;
    }

    const { ParagraphElementText } = element;

    return (
      <>
        <div dangerouslySetInnerHTML={{ __html: ParagraphElementText?.html ?? "" }} className="mb-5" />
      </>
    );
  },
  (prevProps, nextProps) => {
    const prev = prevProps.element;
    const next = nextProps.element;

    return prev.ParagraphElementText?.html === next.ParagraphElementText?.html;
  }
);
