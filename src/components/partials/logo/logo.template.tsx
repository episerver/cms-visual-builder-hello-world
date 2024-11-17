import Image from "next/image";
import { useState } from "react";
import { AutosizedImage } from "../autosized-image";

export const LogoTemplate: React.FC = () => {
  const [imageSize, setSmageSize] = useState({
    width: 1,
    height: 1,
  });

  return (
    <a className="block relative w-28 lg:w-auto h-auto" aria-label="Back to Optimizely Home Page" href="/">
      <AutosizedImage src={"/assets/images/opti-logo-full-white.svg"} alt={"Optimizely Brand Logo"} />
    </a>
  );
};
