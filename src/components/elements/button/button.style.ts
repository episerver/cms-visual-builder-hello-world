import { CompositionDisplaySetting } from "@generated/graphql";
import { MapDisplaySetting } from "@helpers/style";
import clsx from "clsx";

const ButtonType: Record<string, string> = {
  primary: "button--primary",
  secondary: "button--secondary",
  emphasized: "button--emphasized",
  text: "button--text",
};

const ButtonSize: Record<string, string> = {
  default: "",
  small: "button--small",
  large: "button--large",
};

export function GetButtonStyles(displaySettings: CompositionDisplaySetting[] | null | undefined) {
  if (!displaySettings) {
    return "";
  }

  const classes: any = {
    button: true,
  };

  classes[MapDisplaySetting(displaySettings, "type", ButtonType, "primary")] = true;
  classes[MapDisplaySetting(displaySettings, "size", ButtonSize, "default")] = true;

  return clsx(classes);
}