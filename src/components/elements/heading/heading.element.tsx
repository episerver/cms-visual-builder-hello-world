import { CompositionDisplaySetting, HeadingFragmentFragment } from "@graphql/graphql";
import { memo } from "react";

export interface HeadingElementProps {
  element: HeadingFragmentFragment;
  displaySettings?: CompositionDisplaySetting[];
  displayTemplateKey?: string | null;
}

export const HeadingElementComponent: React.FC<HeadingElementProps> = memo(
  ({ element, displaySettings, displayTemplateKey }) => {
    if (!element) {
      return null;
    }

    const { HeadingElementHeading } = element;

    return (
      <>
        <h1 className="heading-1">{HeadingElementHeading}</h1>
      </>
    );
  },
  (prevProps, nextProps) => prevProps.element.HeadingElementHeading === nextProps.element.HeadingElementHeading
);
