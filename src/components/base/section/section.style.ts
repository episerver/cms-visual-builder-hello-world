import { CompositionDisplaySetting } from "@generated/graphql";
import { GetDisplaySetting, MapDisplaySetting } from "@helpers/style";
import clsx from "clsx";

const ContainerMapper: Record<string, string> = {
  default: "container",
  spacious: "container-spacious",
  compact: "container-compact",
  narrow: "container-narrow",
  slim: "container-slim",
  full: "container-full",
};

const ThemeMapper: Record<string, string> = {
  inherit: "",
  blue: "theme--blue",
  purple: "theme--purple",
  green: "theme--green",
  orange: "theme--orange",
};

const BorderMapper: Record<string, string> = {
  none: "",
  top: "border-top",
  bottom: "border-bottom",
};

const GradientMapper: Record<string, string> = {
  none: "",
  top: "gradient-top",
  bottom: "gradient-bottom",
  left: "gradient-left",
  right: "gradient-right",
  topHorizontal: "gradient-top-horizontal",
  bottomHorizontal: "gradient-bottom-horizontal",
  topHighlight: "gradient-top-highlight",
  bottomHighlight: "gradient-bottom-highlight",
};

const CurveMapper: Record<string, string> = {
  none: "",
  top: "curve-top",
  bottom: "curve-bottom",
};

const OverlapMapper: Record<string, string> = {
  none: "",
  topSmall: "overlap-top--small",
  topMedium: "overlap-top--medium",
  topLarge: "overlap-top--large",
  bottomSmall: "overlap-bottom--small",
  bottomMedium: "overlap-bottom--medium",
  bottomLarge: "overlap-bottom--large",
};

const PaddingMapper: Record<string, string> = {
  top_none: "padding-top--none",
  top_small: "padding-top--small",
  top_medium: "padding-top--medium",
  top_large: "padding-top--large",
  bottom_none: "padding-bottom--none",
  bottom_small: "padding-bottom--small",
  bottom_medium: "padding-bottom--medium",
  bottom_large: "padding-bottom--large",
};

export function GetSectionStyles(displaySettings: CompositionDisplaySetting[] | null | undefined) {
  const contentClasses: any = {
    "opti-container__content": true,
  };

  const wrapperClasses: any = {
    "opti-container": true,
    "outer-padding": true,
  };

  if (!displaySettings) {
    return {
      contentClasses: "",
      wrapperClasses: "",
    };
  }

  contentClasses[MapDisplaySetting(displaySettings, "width", ContainerMapper, "default")] = true;

  wrapperClasses[MapDisplaySetting(displaySettings, "theme", ThemeMapper, "inherit")] = true;
  wrapperClasses[MapDisplaySetting(displaySettings, "border", BorderMapper, "none")] = true;
  wrapperClasses[MapDisplaySetting(displaySettings, "gradient", GradientMapper, "none")] = true;
  wrapperClasses[MapDisplaySetting(displaySettings, "curve", CurveMapper, "none")] = true;
  wrapperClasses[MapDisplaySetting(displaySettings, "overlap", OverlapMapper, "none")] = true;

  const paddingTop = GetDisplaySetting(displaySettings, "paddingTop", "medium");
  const paddingBottom = GetDisplaySetting(displaySettings, "paddingBottom", "medium");

  if (paddingTop) {
    wrapperClasses[PaddingMapper[`top_${paddingTop}`]] = true;
  }

  if (paddingBottom) {
    wrapperClasses[PaddingMapper[`bottom_${paddingBottom}`]] = true;
  }

  return {
    contentClasses: clsx(contentClasses),
    wrapperClasses: clsx(wrapperClasses),
  };
}
