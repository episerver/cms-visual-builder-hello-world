import { CompositionDisplaySetting } from "@generated/graphql";
import { GetDisplaySetting, GetVerticalPadding } from "@helpers/style";
import clsx from "clsx";

const ColourMapper: Record<string, string> = {
  darkBlue: "optimizely-blue",
  lightBlue: "light-blue",
  green: "green",
  purple: "purple",
  orange: "orange",
};

export function GetQuoteStyles(displaySettings?: CompositionDisplaySetting[]) {
  let classes: any = {
    quote: {
      quote: true,
    },
    quoteInner: {
      "quote-inner": true,
    },
    quoteInnerContent: {
      "quote-inner__content": true,
    },
    quoteIcon: {},
  };

  if (!displaySettings) {
    return {
      quote: clsx(classes.quote),
      quoteInner: clsx(classes.quoteInner),
      quoteInnerContent: clsx(classes.quoteInnerContent),
      quoteIcon: clsx(classes.quoteIcon),
    };
  }

  const colour = GetDisplaySetting(displaySettings, "colour", "darkBlue");
  const colourResult = colour ? ColourMapper[colour] : null;
  if (colourResult) {
    classes.quote[`bg-gradient-border-${colourResult}`] = true;
    classes.quoteInner[`bg-gradient-${colourResult}`] = true;
    classes.quoteIcon[`text-${colourResult}`] = true;
  }

  classes.quote = GetVerticalPadding(displaySettings, classes.quote);

  return {
    quote: clsx(classes.quote),
    quoteInner: clsx(classes.quoteInner),
    quoteInnerContent: clsx(classes.quoteInnerContent),
    quoteIcon: clsx(classes.quoteIcon),
  };
}
