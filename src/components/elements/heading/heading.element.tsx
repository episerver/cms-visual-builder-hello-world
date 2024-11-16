import { HeadingFragmentFragment } from "@generated/graphql";
import { memo, useMemo } from "react";
import { ElementProps } from "../element.types";
import { GetHeadingStyles } from "./heading.style";

export interface HeadingElementProps extends ElementProps<HeadingFragmentFragment> {}

const HighlightText = memo(
  ({ text }: { text?: string | null }) => {
    if (!text) {
      return null;
    }

    const regex = /(#.*?#)/g;
    const parts = text.split(regex).filter(Boolean);

    return parts.map((part, index) => {
      if (part.match(regex)) {
        return (
          <span className="text-theme-color-gradient" key={index}>
            {part.replace(/#/g, "")}
          </span>
        );
      }

      return part;
    });
  },
  (prevProps, nextProps) => prevProps.text === nextProps.text
);

export const HeadingElementComponent: React.FC<HeadingElementProps> = ({ element, elementKey, displaySettings, displayTemplateKey }) => {
  if (!element) {
    return null;
  }

  const { HeadingElementHeading } = element;

  const classes = useMemo(() => {
    return GetHeadingStyles(displaySettings);
  }, [displaySettings]);

  const HeadingTag = useMemo(() => {
    const tag = displaySettings?.find((setting) => setting.key === "level")?.value ?? "h1";
    return tag as keyof JSX.IntrinsicElements;
  }, [displaySettings]);

  return (
    <>
      <HeadingTag className={classes} data-epi-block-id={elementKey}>
        <HighlightText text={HeadingElementHeading} />
      </HeadingTag>
    </>
  );
};
