import Image from "next/image";
import React, { useState } from "react";

export type AutosizedImageProps = {
  src: string;
  alt?: string;
};

export const AutosizedImage: React.FC<AutosizedImageProps> = ({ src, alt = "" }) => {
  const [imageSize, setSmageSize] = useState({
    width: 1000,
    height: 1000,
  });

  return (
    <Image
      src={src}
      alt={alt}
      priority={true}
      onLoad={(evt) => {
        const target = evt.target as HTMLImageElement;
        setSmageSize({
          width: target.naturalWidth,
          height: target.naturalHeight,
        });
      }}
      width={imageSize.width}
      height={imageSize.height}
      className={"object-contain w-full h-full"}
      quality={100}
    />
  );
};
