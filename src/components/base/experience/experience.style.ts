import { CompositionDisplaySetting } from "@generated/graphql";
import { GetDisplaySetting } from "@helpers/style";
import clsx from "clsx";

const ThemeMapper: Record<string, string> = {
  blue: "theme--blue",
  purple: "theme--purple",
  green: "theme--green",
  orange: "theme--orange",
};

export function GetExperienceStyles(displaySettings?: CompositionDisplaySetting[]) {
  const classes: any = {
    relative: true,
    experience: true,
  };

  const theme = GetDisplaySetting(displaySettings, "theme", "blue");
  if (theme) {
    classes[ThemeMapper[theme]] = true;
  }

  return clsx(classes);
}
