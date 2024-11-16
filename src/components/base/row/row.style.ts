import { CompositionDisplaySetting } from "@generated/graphql";
import { GetDisplaySetting, GetVerticalPadding, MapDisplaySetting } from "@helpers/style";
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
  end: "item-end",
  start: "items-start",
  center: "items-center",
  stretch: "items-stretch",
};

export function GetRowStyles(displaySettings: CompositionDisplaySetting[] | null | undefined) {
  let classes: any = {
    // "opti-row": true,
    "opti-row lg:grid-cols-auto-2 xl:grid-cols-auto-4":
      true,
  };

  classes[MapDisplaySetting(displaySettings, "gap", GapMapper, "default")] = true;
  classes[MapDisplaySetting(displaySettings, "alignment", AlignmentMapper, "start")] = true;

  classes = GetVerticalPadding(displaySettings, classes);

  const showSeparators = GetDisplaySetting(displaySettings, "separators", "false");
  if (showSeparators === "true") {
    classes["with-separators"] = true;
  }

  return clsx(classes);
}
