import { CompositionDisplaySetting } from "@generated/graphql";
import { GetVerticalPadding, MapDisplaySetting, TextAlignmentMapper } from "@helpers/style";
import clsx from "clsx";

const OverlineAlignmentMapper: Record<string, string> = {
  left: "justify-start",
  center: "justify-center",
  right: "justify-end",
};

export function GetOverlineStyles(displaySettings: CompositionDisplaySetting[] | null | undefined) {
  if (!displaySettings) {
    return "";
  }

  let classes: any = {
    "text-overline": true,
  };

  classes[MapDisplaySetting(displaySettings, "alignment", OverlineAlignmentMapper, "left")] = true;
  classes = GetVerticalPadding(displaySettings, classes);

  return clsx(classes);
}
