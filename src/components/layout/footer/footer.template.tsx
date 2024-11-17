import { AutosizedImage } from "@components/partials/autosized-image";
import { LogoTemplate } from "@components/partials/logo/logo.template";
import Image from "next/image";

export interface FooterTemplateProps {}

export const FooterTemplate: React.FC<FooterTemplateProps> = () => {
  return (
    <footer className="outer-padding site-footer">
      <div className="container">
        <div className="flex py-4 relative w-12">
          <AutosizedImage src={`/assets/images/opti-logo-only.svg`} alt={"Optimizely Brand Logo"} />
        </div>
        <div className="flex py-4 gap-4 site-footer__copyright">
          <span>© {new Date().getFullYear()} Optimizely</span>
        </div>
      </div>
    </footer>
  );
};
