import { StatsFragmentFragment } from "@generated/graphql";
import { ElementProps } from "../element.types";

export interface StatsElementProps extends ElementProps<StatsFragmentFragment> {}

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
            <div className="stats-logo">
              <img src={logoUrl ?? ""} alt={`${StatsTitle} - ${StatsSubtitle}`} />
            </div>
          )}
          <div className="stats-inner__body">
            {StatsTitle && <h3 className="stats-title">{StatsTitle}</h3>}
            {StatsSubtitle && <p className="stats-subtitle">{StatsSubtitle}</p>}
          </div>
        </div>
      </div>
    </div>
  );
};
