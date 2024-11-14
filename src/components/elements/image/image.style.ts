import { CompositionDisplaySetting } from "@graphql/graphql";
import { GetDisplaySetting, MapDisplaySetting } from "@helpers/style";
import clsx from "clsx";

const CornerMapper: Record<string, string> = {
  rounded: "rounded-md",
  sharp: "",
};

export function GetImageStyles(displaySettings: CompositionDisplaySetting[] | null | undefined) {
  if (!displaySettings) {
    return "image";
  }

  const classes: any = {
    image: true,
  };

  const border = GetDisplaySetting(displaySettings, "border") === "true";
  if (border) {
    classes["bordered"] = true;
  }

  classes[MapDisplaySetting(displaySettings, "corner", CornerMapper, "rounded")] = true;


  return clsx(classes);
}
