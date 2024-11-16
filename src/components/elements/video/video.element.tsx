import { VideoFragmentFragment } from "@generated/graphql";
import { useMemo } from "react";
import { ElementProps } from "../element.types";
import { GetVideoStyle } from "./video.style";

interface VideoElementProps extends ElementProps<VideoFragmentFragment> {}

export const VideoElementComponent: React.FC<VideoElementProps> = ({ element, elementKey, displaySettings, displayTemplateKey }) => {
  if (!element) {
    return null;
  }

  const classes = useMemo(() => {
    return GetVideoStyle(displaySettings);
  }, [displaySettings]);

  const { VideoUrl, VideoAltText } = element;
  const srcUrl = VideoUrl?.url?.default;

  return (
    <>
      {srcUrl && (
        <div className={classes} data-epi-block-id={elementKey}>
          <figure>
            <video controlsList="play">
              <source src={srcUrl} type="video/mp4" />
              <meta itemProp="contentUrl" content={srcUrl} />
              <meta itemProp="description" content={VideoAltText ?? ""} />
            </video>
          </figure>
        </div>
      )}
    </>
  );
};
