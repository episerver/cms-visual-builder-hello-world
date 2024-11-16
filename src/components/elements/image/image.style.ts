import { CompositionDisplaySetting } from "@generated/graphql";
import { GetDisplaySetting, MapDisplaySetting } from "@helpers/style";
import clsx from "clsx";

const CornerMapper: Record<string, string> = {
  rounded: "round",
  sharp: "",
};

export function GetImageStyles(displaySettings: CompositionDisplaySetting[] | null | undefined) {
  const classes: any = {
    image: true,
  };

  if (!displaySettings) {
    return clsx(classes);
  }

  const border = GetDisplaySetting(displaySettings, "border") === "true";
  if (border) {
    classes["bordered"] = true;
  }

  classes[MapDisplaySetting(displaySettings, "corners", CornerMapper, "sharp")] = true;

  return clsx(classes);
}
