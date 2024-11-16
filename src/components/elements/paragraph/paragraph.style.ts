import { CompositionDisplaySetting } from "@generated/graphql";
import { GetVerticalPadding, MapDisplaySetting, TextAlignmentMapper } from "@helpers/style";
import clsx from "clsx";

export function GetParagraphStyles(displaySettings: CompositionDisplaySetting[] | null | undefined) {
  if (!displaySettings) {
    return "";
  }

  let classes: any = {
    "w-full": true,
  };

  classes[MapDisplaySetting(displaySettings, "alignment", TextAlignmentMapper, "left")] = true;

  classes = GetVerticalPadding(displaySettings, classes);

  return clsx(classes);
}
