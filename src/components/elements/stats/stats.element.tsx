import { StatsFragmentFragment } from "@graphql/graphql";
import { ElementProps } from "../element.types";

export interface StatsElementProps extends ElementProps<StatsFragmentFragment> {}

const StatsImage = ({ url, alt }: { url: string; alt: string }) => {
  return (
    <div>
      <img src={url} alt={alt} />
    </div>
  );
};

export const StatsElementComponent: React.FC<StatsElementProps> = ({ element, elementKey, displaySettings, displayTemplateKey }) => {
  if (!element) {
    return null;
  }

  const { StatsTitle, StatsSubtitle, StatsLogo } = element;
  const logoUrl = StatsLogo?.url?.default;

  return (
    <div className="stats group" data-epi-block-id={elementKey}>
      <div className="stats-inner group-active:shadow-card-pressed group-hover:after:opacity-50 group-active:after:hidden">
        <div className="stats-inner__content">
          {logoUrl && (
            <>
              <StatsImage url={logoUrl} alt={`${StatsTitle} - ${StatsSubtitle}`} />
              <div className="stats-logo"></div>
            </>
          )}
          <div className="py-1">
            {StatsTitle && <h3 className="stats-title">{StatsTitle}</h3>}
            {StatsSubtitle && <p className="stats-subtitle">{StatsSubtitle}</p>}
          </div>
        </div>
      </div>
    </div>
  );
};
