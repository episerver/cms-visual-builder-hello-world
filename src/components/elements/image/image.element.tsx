import { CompositionDisplaySetting, ImageFragmentFragment } from "@graphql/graphql";
import { memo } from "react";

export interface ImageElementProps {
  element?: ImageFragmentFragment;
  displaySettings?: CompositionDisplaySetting[];
  displayTemplateKey?: string | null;
}

export const ImageElementComponent: React.FC<ImageElementProps> = memo(
  ({ element }) => {
    if (!element) {
      return null;
    }

    const { ImageUrl, ImageAltText } = element;
    const srcUrl = ImageUrl?.url?.default;

    return <>{srcUrl && <img src={srcUrl} alt={ImageAltText ?? ""} />}</>;
  },
  (prevProps, nextProps) => {
    const prev = prevProps.element;
    const next = nextProps.element;

    return prev?.ImageUrl?.url?.default === next?.ImageUrl?.url?.default && prev?.ImageAltText === next?.ImageAltText;
  }
);
