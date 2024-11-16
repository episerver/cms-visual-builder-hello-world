import { CompositionDisplaySetting } from "@generated/graphql";
import { MapDisplaySetting } from "@helpers/style";
import clsx from "clsx";

const GapMapper: Record<string, string> = {
  default: "gap-6",
  small: "gap-2",
  medium: "gap-16",
  large: "gap-32",
  none: "gap-0",
};

const AlignmentMapper: Record<string, string> = {
  none: "",
  start: "justify-start",
  center: "justify-center",
  right: "justify-end",
  stretch: "justify-stretch-children",
};

export function GetColumnStyles(displaySettings: CompositionDisplaySetting[] | null | undefined) {
  const classes: any = {
    flex: true,
    "flex-wrap": true,
    "w-full": true
  };

  classes[MapDisplaySetting(displaySettings, "gap", GapMapper, "none")] = true;
  classes[MapDisplaySetting(displaySettings, "alignment", AlignmentMapper, "none")] = true;

  return clsx(classes);
}
