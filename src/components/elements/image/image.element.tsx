import { ImageFragmentFragment } from "@generated/graphql";
import { GetDisplaySetting } from "@helpers/style";
import clsx from "clsx";
import { useMemo } from "react";
import { ElementProps } from "../element.types";
import { GetImageStyles } from "./image.style";

export interface ImageElementProps extends ElementProps<ImageFragmentFragment> {}

export const ImageElementComponent: React.FC<ImageElementProps> = ({ element, elementKey, displaySettings, displayTemplateKey }) => {
  if (!element) {
    return null;
  }

  const classes = useMemo(() => {
    return GetImageStyles(displaySettings);
  }, [displaySettings]);

  const { ImageUrl, ImageAltText } = element;
  const srcUrl = ImageUrl?.url?.default;

  return (
    <>
      {srcUrl && (
        <div data-epi-block-id={elementKey} className={classes}>
          <figure>
            <img src={srcUrl} alt={ImageAltText ?? ""} />
          </figure>
        </div>
      )}
    </>
  );
};
