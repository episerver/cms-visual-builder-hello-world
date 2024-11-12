import { CompositionDisplaySetting, ImpactHighlightFragmentFragment } from "@graphql/graphql";
import { memo } from "react";

export interface ImpactHighlightElementProps {
  element: ImpactHighlightFragmentFragment;
  displaySettings?: CompositionDisplaySetting[];
  displayTemplateKey?: string | null;
}

export const ImpactHighlightElementComponent: React.FC<ImpactHighlightElementProps> = memo(
  ({ element, displaySettings, displayTemplateKey }) => {
    if (!element) {
      return null;
    }

    const { ImpactHighlightImpact, ImpactHighlightLogo, ImpactHighlightNumericalImpact } = element;

    return (
      <>
        <div>{ImpactHighlightLogo?.url?.default}</div>
        <h1 className="text-3xl">{ImpactHighlightImpact}</h1>
        <p className="text-lg">{ImpactHighlightNumericalImpact}</p>
      </>
    );
  },
  (prevProps, nextProps) => {
    const prev = prevProps.element;
    const next = nextProps.element;
    return (
      prev.ImpactHighlightImpact === next.ImpactHighlightImpact &&
      prev.ImpactHighlightNumericalImpact === next.ImpactHighlightNumericalImpact &&
      prev.ImpactHighlightLogo?.url?.default === next.ImpactHighlightLogo?.url?.default
    );
  }
);
