import { CompositionDisplaySetting } from "@graphql/graphql";
import { GetVerticalPadding } from "@helpers/style";
import clsx from "clsx";

export function GetOverlineStyles(displaySettings: CompositionDisplaySetting[] | null | undefined) {
  if (!displaySettings) {
    return "";
  }

  let classes: any = {
    "text-overline": true,
  };

  //   classes[MapDisplaySetting(displaySettings, "alignment", TextAlignmentMapper, "left")] = true;

  classes = GetVerticalPadding(displaySettings, classes);

  return clsx(classes);
}
