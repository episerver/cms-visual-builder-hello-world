import { CompositionDisplaySetting } from "@generated/graphql";
import { GetVerticalPadding, MapDisplaySetting, TextAlignmentMapper } from "@helpers/style";
import clsx from "clsx";

const HeadingLevelMapper: Record<string, string> = {
  h1: "heading-1",
  h2: "heading-2",
  h3: "heading-3",
  h4: "heading-4",
  h5: "heading-5",
  h6: "heading-6",
};

export function GetHeadingStyles(displaySettings: CompositionDisplaySetting[] | null | undefined) {
  if (!displaySettings) {
    return "";
  }

  let classes: any = {
    "w-full": true,
  };

  classes[MapDisplaySetting(displaySettings, "level", HeadingLevelMapper, "size1")] = true;
  classes[MapDisplaySetting(displaySettings, "alignment", TextAlignmentMapper, "left")] = true;

  classes = GetVerticalPadding(displaySettings, classes);

  return clsx(classes);
}
