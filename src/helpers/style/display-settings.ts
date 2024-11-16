import { CompositionDisplaySetting } from "@generated/graphql";

export function GetDisplaySetting(displaySettings: CompositionDisplaySetting[] | null | undefined, key: string, fallback?: string) {
  const setting = displaySettings?.find((setting) => setting.key === key)?.value ?? fallback;
  return setting;
}

export function MapDisplaySetting(displaySettings: CompositionDisplaySetting[] | null | undefined, key: string, mapper: Record<string, string>, fallback?: string) {
  const setting = GetDisplaySetting(displaySettings, key, fallback);
  return setting ? mapper[setting] : "";
}
