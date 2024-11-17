import { ImageFragmentFragment } from "@generated/graphql";
import Image from "next/image";
import { useMemo } from "react";
import { ElementProps } from "../element.types";
import { GetImageStyles } from "./image.style";
import { AutosizedImage } from "@components/partials/autosized-image";

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
            <div className="relative">
              <AutosizedImage src={srcUrl} alt={ImageAltText ?? ""} />
            </div>
          </figure>
        </div>
      )}
    </>
  );
};
