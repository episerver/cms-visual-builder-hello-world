import { VideoFragmentFragment } from "@graphql/graphql";
import { ElementProps } from "../element.types";

interface VideoElementProps extends ElementProps<VideoFragmentFragment> {}

export const VideoElementComponent: React.FC<VideoElementProps> = ({ element, elementKey, displaySettings, displayTemplateKey }) => {
  if (!element) {
    return null;
  }

  const { VideoUrl, VideoAltText } = element;
  const srcUrl = VideoUrl?.url?.default;

  return (
    <>
      {srcUrl && (
        <video data-epi-block-id={elementKey}>
          <source src={srcUrl} type="video/mp4" />
          <meta itemProp="contentUrl" content={srcUrl} />
          <meta itemProp="description" content={VideoAltText ?? ""} />
        </video>
      )}
    </>
  );
};
