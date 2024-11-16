import { CompositionDisplaySetting } from "@generated/graphql";
import { GetDisplaySetting, MapDisplaySetting } from "./display-settings";

export const PaddingMapper: Record<string, string> = {
  bottom_none: "mb-0",
  bottom_small: "mb-4",
  bottom_medium: "mb-8",
  bottom_large: "mb-16",
  top_none: "mt-0",
  top_small: "mt-4",
  top_medium: "mt-8",
  top_large: "mt-16",
};

export const TextAlignmentMapper: Record<string, string> = {
  left: "text-left",
  center: "text-center",
  right: "text-right",
};

export function GetVerticalPadding(displaySettings: CompositionDisplaySetting[] | null | undefined, target: Record<string, any>) {
  const paddingTop = GetDisplaySetting(displaySettings, "paddingTop", "none");
  const paddingBottom = GetDisplaySetting(displaySettings, "paddingBottom", "none");

  let padding: Record<string, any> = {};

  if (paddingTop) {
    padding[PaddingMapper[`top_${paddingTop}`]] = true;
  }

  if (paddingBottom) {
    padding[PaddingMapper[`bottom_${paddingBottom}`]] = true;
  }

  return { ...target, ...padding };
}