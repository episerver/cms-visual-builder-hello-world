import { CompositionDisplaySetting, VideoFragmentFragment } from "@graphql/graphql";
import { memo } from "react";

interface VideoElementProps {
  element?: VideoFragmentFragment;
  displaySettings?: CompositionDisplaySetting[];
  displayTemplateKey?: string | null;
}

export const VideoElementComponent: React.FC<VideoElementProps> = memo(
  ({ element }) => {
    if (!element) {
      return null;
    }

    const { VideoUrl, VideoAltText } = element;
    const srcUrl = VideoUrl?.url?.default;

    return (
      <>
        {srcUrl && (
          <video>
            <source src={srcUrl} type="video/mp4" />
            <meta itemProp="contentUrl" content={srcUrl} />
            <meta itemProp="description" content={VideoAltText ?? ""} />
          </video>
        )}
      </>
    );
  },
  (prevProps, nextProps) => {
    const prev = prevProps.element;
    const next = nextProps.element;

    return prev?.VideoAltText === next?.VideoAltText && prev?.VideoUrl?.url?.default === next?.VideoUrl?.url?.default;
  }
);
