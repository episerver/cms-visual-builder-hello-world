import { QuoteFragmentFragment, CompositionDisplaySetting } from "@graphql/graphql";
import { memo } from "react";

export interface QuoteElementProps {
  element: QuoteFragmentFragment;
  displaySettings?: CompositionDisplaySetting[];
  displayTemplateKey?: string | null;
}

export const QuoteElementComponent: React.FC<QuoteElementProps> = memo(
  ({ element }) => {
    if (!element) {
      return null;
    }

    const { Quote, QuoteBrandName, QuoteLogo } = element;

    return (
      <>
        <div>{QuoteLogo?.url?.default}</div>
        <h1 className="text-2xl">{Quote}</h1>
        <p className="text-lg">{QuoteBrandName}</p>
      </>
    );
  },
  (prevProps, nextProps) => {
    const prev = prevProps.element;
    const next = nextProps.element;
    return (
      prev.Quote === next.Quote &&
      prev.QuoteBrandName === next.QuoteBrandName &&
      prev.QuoteLogo?.url?.default === next.QuoteLogo?.url?.default
    );
  }
);
