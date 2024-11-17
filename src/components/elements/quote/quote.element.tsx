import { IconTemplate } from "@components/base/icon";
import { QuoteFragmentFragment } from "@generated/graphql";
import { useMemo } from "react";
import { GetQuoteStyles } from "./quote.style";
import { ElementProps } from "../element.types";
import Image from "next/image";
import { AutosizedImage } from "@components/partials/autosized-image";

export interface QuoteElementProps extends ElementProps<QuoteFragmentFragment> {}

export const QuoteElementComponent: React.FC<QuoteElementProps> = ({ element, elementKey, displaySettings, displayTemplateKey }) => {
  if (!element) {
    return null;
  }
  const classes = useMemo(() => {
    return GetQuoteStyles(displaySettings);
  }, [displaySettings]);

  const { Quote, QuoteBrandName, QuoteLogo } = element;

  return (
    <>
      <article className={classes.quote} data-epi-block-id={elementKey}>
        <div className={classes.quoteInner}>
          <div className={classes.quoteInnerContent}>
            <div className={classes.quoteIcon}>
              <IconTemplate icon="quote" />
            </div>
            <p className="my-6">{Quote}</p>
            <div className="flex flex-row">
              <div className="flex flex-col">
                <p className="text-sm font-medium">{QuoteBrandName}</p>
                {QuoteLogo?.url?.default && (
                  <div className="max-w-[125px] h-[30px] mt-3 relative self-start">
                    <AutosizedImage src={QuoteLogo?.url?.default} alt={"Logo"} />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </article>
    </>
  );
};
